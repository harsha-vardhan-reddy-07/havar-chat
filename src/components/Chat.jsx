import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import {BiArrowBack} from 'react-icons/bi';

const Chat = ({sidebarToggle, setSidebarToggle}) => {

  const {data} = useContext(ChatContext);

  const handleBackBtn =() =>{
    setSidebarToggle(!sidebarToggle);
  }

  return (
    <div className='chat'>
      <div className="chatInfo">
        {window.screen.width<=500 && data.user.displayName ? <div className='backBtn' > <span onClick={handleBackBtn} ><BiArrowBack /></span> </div> : ""}
        {data.user.photoURL &&  <img src={data.user?.photoURL} alt="" />}
        <span>{data.user?.displayName}</span>
      </div>


      <Messages />

      <Input />


    </div>
  )
}

export default Chat