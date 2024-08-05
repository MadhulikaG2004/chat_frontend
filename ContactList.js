// ContactList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import ProfileModal from './ProfileModal'; // Ensure the path is correct

const ContactList = ({ contacts, groups, onSelectGroup, onSelectContact, userDetails, unreadMessages }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [tab, setTab] = useState("chat");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const imageBase64 = userDetails.image;
  const imageUrl = `data:image/png;base64,${imageBase64}`;

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleProfile = () => {
    navigate('/profile', { state: { userDetails } });
    setModalOpen(false);
  };

  const handleTabSwitch = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/contacts/${userDetails.userid}/${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderContact = (contact) => {
    const unreadCount = unreadMessages[contact.contactid]?.count || 0;
    const lastUnreadMessage = unreadMessages[contact.contactid]?.lastMessage || '';

    return (
      <li
        key={contact.contactid}
        className="flex items-center p-3 cursor-pointer hover:bg-[#E6F7FF] hover:text-[#4A90E2]"
        onClick={() => onSelectContact(contact)}
      >
        {contact.image ?
          (<div className="w-12 h-12 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-xl font-bold cursor-pointer mr-4">
            <img src={`data:image/png;base64,${contact.image}`} className='w-12 h-12 rounded-full' alt={`${contact.contactname}`}></img>
          </div>) : (<div className="w-10 h-10 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-lg font-bold mr-3">
            {contact.contactname.charAt(0).toUpperCase()}
          </div>)
        }
        <div className="flex-1 text-[#333333] text-lg">
          <div className="flex items-center justify-between">
            <span>{contact.contactname}</span>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          {unreadCount > 0 && (
            <div className="flex items-left text-sm text-gray-500 mt-1 truncate">
              {decodeURIComponent(lastUnreadMessage)}
            </div>
          )}
        </div>
      </li>
    );
  };

  const renderGroup = (group) => {
    const unreadCount = unreadMessages[group.groupid]?.count || 0;
    const lastUnreadMessage = unreadMessages[group.groupid]?.lastMessage || '';

    return (
      <li
        key={group.groupid}
        className="flex items-center p-3 cursor-pointer hover:bg-[#E6F7FF] hover:text-[#4A90E2]"
        onClick={() => onSelectGroup(group)}
      >
        <div className="w-12 h-12 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
          {group.groupname.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 text-[#333333] text-lg">
          <div className="flex items-center justify-between">
            <span>{group.groupname}</span>
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          {unreadCount > 0 && (
            <div className="flex items-left text-sm text-gray-500 mt-1 truncate">
              {decodeURIComponent(lastUnreadMessage)}
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div
          className="w-12 h-12 bg-[#4A90E2] text-white rounded-full flex items-center justify-center text-xl font-bold cursor-pointer mr-4"
          onClick={handleOpen}
        >
          {imageBase64 ? (<img src={imageUrl} alt="Profile" className='w-12 h-12 rounded-full' onError={(e) => e.target.src = 'default-avatar.png'}></img>) : (<div>{userDetails.username.charAt(0)}</div>)}
        </div>
        <div className="text-[#828282] text-lg">
          Welcome, {userDetails.username}!
        </div>
        <div>
          <button onClick={handleLogout} className='ml-12 px-3 py-2 bg-[#4A90E2] text-white rounded-lg'>Logout</button>
        </div>
      </div>
      <div className="flex items-center mb-4">
        <button
          className={`w-full px-6 py-2 font-semibold border-b-2 ${tab === "chat" ? "text-gray " : "text-gray border-transparent"} `}
          onClick={() => handleTabSwitch("chat")}
        >
          chat
        </button>
        <button
          className={`w-full ml-4 px-6 py-2 font-semibold border-b-2 ${tab === "group" ? "text-gray " : "text-gray border-transparent"} `}
          onClick={() => handleTabSwitch("group")}
        >
          Group
        </button>
      </div>
      <div className="relative mb-4">
        {tab === "chat" && <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />}
        {searchQuery && (
          <button onClick={handleClearSearch} className="absolute right-0 top-0 mt-2 mr-10">
            <CloseIcon />
          </button>
        )}
      </div>
      <ul>
        {searchResults.map(renderContact)}
      </ul>
      {tab === "chat" && <ul className="divide-y divide-[#E0E0E0]">
        {contacts.map(renderContact)}
      </ul>}
      {tab === "group" && (
        <ul className="divide-y divide-[#E0E0E0]">
          {groups.map(renderGroup)}
        </ul>)}
      <ProfileModal
        open={modalOpen}
        onClose={handleClose}
        onProfileClick={handleProfile}
        onLogoutClick={handleLogout}
      />
    </div>
  );
};

export default ContactList;
