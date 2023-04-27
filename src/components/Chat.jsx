import React, { useContext } from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';
import {BiArrowBack} from 'react-icons/bi';

const Chat = () => {

  const {data} = useContext(ChatContext);

  const handleBackBtn =() =>{
    let width = window.screen.width;
    if (width <= 500){

    }
    
  }

  return (
    <div className='chat'>
      <div className="chatInfo">
        {data.user.photoURL &&  <img src={data.user?.photoURL} alt="" />}
        <span>{data.user?.displayName}</span>
      </div>


      <Messages />

      <Input />


    </div>
  )
}

export default Chat