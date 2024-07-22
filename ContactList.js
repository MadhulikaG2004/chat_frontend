// ContactList.js
import React from 'react';

const ContactList = ({ contacts, onSelectContact }) => {
  return (
    <div className="w-1/4 border-r border-gray-200">
      <h1>Contact List</h1>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.contactid} className="p-2 border-b border-gray-200">
            {contact.contactname}
            <button 
              onClick={() => onSelectContact(contact)} 
              className="ml-2 p-1 bg-blue-500 text-white rounded"
            >
              Chat
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
