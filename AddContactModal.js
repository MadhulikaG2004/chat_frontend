import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddContactModal = ({ open, handleClose, userDetails }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/userlist/${userDetails.userid}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userDetails.userid]);

  const addContact = async (contactId) => {
    const contactName = prompt("Enter contact name:");

    try {
      await axios.post(`http://localhost:8080/users/${userDetails.userid}/${contactId}/addContact`, {
        contactName
      });
      alert(`Contact ${contactName} added successfully!`);
      
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const goToContact = () => {
    navigate('/contact', { state: { userDetails } });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      
    >
      <Fade in={open}>
        <div style={{ backgroundColor: 'white', padding: 20, margin: 'auto', maxWidth: 600 }}>
          <h1>User List</h1>
          <ul>
            {users.map((user) => (
              user.userid !== userDetails.userid && (
                <li key={user.userid}>
                  {user.username} ({user.phoneno})
                  <Button variant="contained" color="primary" onClick={() => addContact(user.userid)}>
                    Add to Contacts
                  </Button>
                </li>
              )
            ))}
          </ul>
          <Button variant="contained" color="secondary" onClick={goToContact}>
            Contact List
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddContactModal;
