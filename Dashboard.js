import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ContactList from './ContactList';
import ChatWindow from './ChatWindow';
import AddContactModal from './AddContactModal';
import { Button } from '@mui/material';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userDetails = location.state?.userDetails;

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile', { state: { userDetails } });
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/2">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Contacts
        </Button>
        <ContactList contacts={contacts} onSelectContact={handleSelectContact} />
      </div>
      {selectedContact && (
        <ChatWindow
          connid={selectedContact.contactid}
          conname={selectedContact.contactname}
          userid={userDetails.userid}
          username={userDetails.username}
        />
      )}
      <AddContactModal open={open} handleClose={handleClose} userDetails={userDetails} />

      <div className="absolute top-4 right-4 flex items-center">
        <div
          className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white cursor-pointer"
          onClick={handleProfileClick}
        >
          {userDetails.username.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
