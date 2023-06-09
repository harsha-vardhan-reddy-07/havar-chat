import React, { useContext } from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const Home = ({sidebarToggle, setSidebarToggle}) => {

  const navigate = useNavigate();

  const {currentUser} = useContext(AuthContext);

  if(!currentUser){
    navigate('/login');
  }


  return (
    <div className='home'>
      <Sidebar sidebarToggle= {sidebarToggle} setSidebarToggle = {setSidebarToggle} />
      <Chat sidebarToggle= {sidebarToggle} setSidebarToggle = {setSidebarToggle}/>
    </div>
  )
}
