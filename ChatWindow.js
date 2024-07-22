// Chat.js
import React, { useState, useEffect } from 'react';


import axios from 'axios';

const ChatWindow = ({ connid, conname, userid, username }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/messages/conversation/${userid}/${connid}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMessages(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch(error => console.error('Error fetching messages:', error));

    const wsUrl = `ws://localhost:8080/hello?userid=${encodeURIComponent(userid)}`;
    const newWs = new WebSocket(wsUrl);

    newWs.onmessage = function (e) {
      const messageData = JSON.parse(e.data);
      console.log(messageData);

      if (messageData.delete) {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== messageData.id)
        );
      } else if (messageData.edit) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageData.id ? { ...msg, ...messageData } : msg
          )
        );
      } else if (
        (messageData.receiver === userid && messageData.sender === connid) ||
        (messageData.receiver === connid && messageData.sender === userid)
      ) {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      }
    };

    setWs(newWs);

    return () => {
      if (newWs) {
        newWs.close();
      }
    };
  }, [connid, userid]);

  const sendMessage = () => {
    if (!ws) return;

    const messageText = document.getElementById('message').value;
    document.getElementById('message').value = '';

    const messageObject = {
      receiver: connid,
      receivername: conname,
      sender: userid,
      message: messageText,
      sendername: username,
      edit: false
    };

    setMessages((prevMessages) => [...prevMessages, messageObject]);
    ws.send(JSON.stringify(messageObject));
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setEditedText(message.message);
  };

  const saveEdit = async () => {
    if (!ws || !editingMessage) return;

    const updatedMessage = {
      ...editingMessage,
      message: editedText,
      edit: true,
      caption: 'Edited'
    };

    try {
      const response = await axios.get(`http://localhost:8080/users/name/${editingMessage.sender}`);
      const senderData = response.data;

      if (senderData && senderData.username) {
        updatedMessage.sendername = senderData.username;
      }
    } catch (error) {
      console.error('Error fetching sender details:', error);
    }

    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === editingMessage.id ? updatedMessage : msg
      )
    );

    ws.send(JSON.stringify(updatedMessage));
    setEditingMessage(null);
    setEditedText("");
  };

  const deleteMessage = (msg) => {
    if (!ws) return;

    const deleteMessage = {
      id:msg.id,
      sender:msg.sender,
      receiver:msg.receiver,
      delete: true
    };

    setMessages((prevMessages) =>
      prevMessages.filter((msg1) => msg1.id !== msg.id)
    );
console.log(deleteMessage);
    ws.send(JSON.stringify(deleteMessage));
  };

  return (
    <div className="w-3/4 p-4">
      <div id="messages" className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === userid ? 'outgoing-message' : 'incoming-message'}>
            <div className="message-content">
              {msg.sender === userid ? username : msg.sendername} : {msg.message}
            </div>
            {msg.edit && <div className="caption">Edited </div>}
            {msg.sender === userid && (
              <>
                <button onClick={() => handleEdit(msg)}>Edit</button>
                <button onClick={() => deleteMessage(msg)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
      {editingMessage ? (
        <div>
          <input
            type="text"
            defaultValue={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={saveEdit}>Save</button>
        </div>
      ) : (
        <div>
          <input type="text" id="message" placeholder="Type your message here" />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
