/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
const UserList = ({ name, phone }) => {
  const [users, setUsers] = useState([]);
  const navigate=useNavigate();
// const[userid1,setUserid1]=useState(userid1);
const location=useLocation();
const userDetails=location.state?.userDetails;
console.log(userDetails);
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const [bgColor, setBgColor] = useState('');

  
  useEffect(() => {
    //const fetchUsers = async () => {
      try {
        //const response = await axios.get(`http://localhost:8080/users/userlist/${userDetails.userid}`);
        //setUsers(response.data);
      } catch (error) {
      //  console.error('Error fetching users:', error);
      }
      
        setBgColor(getRandomColor());
      // Change color every second
  
     
    //]
    

    //fetchUsers();
  }, []);
  
  const addContact = async (contactId) => {
    const contactName = prompt("Enter contact name:");

    try {
      const response = await axios.post(`http://localhost:8080/users/${userDetails.userid}/${contactId}/addContact`, {
        contactName
      });
      alert(contactName);
      try {
        const response = await axios.get(`http://localhost:8080/users/userlist/${userDetails.userid}`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const gotocontact=()=>{
    navigate('/contact',{state:{userDetails}});
  };
  return (
    <div className='contactlist'>
    
    <div >
    
  <ul>

     
        <li className='userlist flex'>
            <div className='max-w-xs rounded overflow-hidden shadow-lg border border-black m-5 flex flex-col items-center justify-center p-4' >
            <div className="w-70 h-12  rounded text-lg text-white flex items-center justify-center m-2 p-4 opacity-40" style={{ backgroundColor: bgColor }}>
      MG
    </div>
          <div className='contact' >
          
            <div>
              <div className='flex'>
            <MdOutlinePermContactCalendar className='w-8 h-8 text-gray-500'/>
            <div className='contactname'>{name}</div>
           </div>
           <div className='flex'>
            <FaSquarePhone className='w-8 h-6 text-gray-500'/>
             <div className='contactno'>{phone}</div>
             </div>
             </div>
             </div>
          
          <div>
          <button className='hover:scale-110 transition-transform duration-300 h-8 bg-blue-500 border-none'>Add</button>
          </div>
          </div>
          
          
        </li>
      

  </ul>
  
  
 
</div>
</div>

  );
};

export default UserList;