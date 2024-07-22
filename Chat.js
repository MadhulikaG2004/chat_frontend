// ChatPage.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';

const Chat = () => {
  const location = useLocation();
 // const userDetails = location.state?.userDetails;
 const userDetails={userid:1,username:"madhu"};
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const contact=[{contactid:1,contactname:"priya"},{contactid:1,contactname:"priya"}];
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/contacts/${userDetails.userid}`);
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, [userDetails]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="flex h-screen">
      <ContactList contacts={contact} onSelectContact={handleSelectContact} />
      {selectedContact && (
        <ChatWindow
          connid={selectedContact.contactid}
          conname={selectedContact.contactname}
          userid={userDetails.userid}
          username={userDetails.username}
        />
      )}
    </div>
  );
};

export default Chat;
