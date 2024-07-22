import UserList from "./UserList"
import React, { useState, useEffect } from 'react';
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"; 
import { useLocation } from 'react-router-dom';
const UserMapper=()=>{
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
  const dummyUsers = [
    { id: 1, name: 'Alice Johnson', phone: '123-456-7890' },
    { id: 2, name: 'Bob Smith', phone: '234-567-8901' },
    { id: 3, name: 'Charlie Brown', phone: '345-678-9012' },
  ];
    
    useEffect(() => {
      const fetchUsers = async () => {
        try {
        //  const response = await axios.get(`http://localhost:8080/users/userlist/${userDetails.userid}`);
          setUsers(dummyUsers);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
        
          setBgColor(getRandomColor());
        // Change color every second
    
        
      };
  
      fetchUsers();
    }, []);
    return (
        
        <div className="flex flex-col">
            
       <div>
       <div className="nav">
       <Link to="/">
         <button>Home</button>
         </Link>
         <Link to="/chat">
         <button>Chat</button>
         </Link>
         <Link to="/profile">
         <button className="w-12 h-12 bg-blue-300 text-black rounded-full flex items-center justify-center">
         MG
       </button>
         </Link>
       </div>
       </div>
     <div className="flex">
        {users.map(user => (
        <UserList
          key={user.id}
          name={user.name}
          phone={user.phone}
        />
      ))}</div>
        </div>
    )
}
export default UserMapper;