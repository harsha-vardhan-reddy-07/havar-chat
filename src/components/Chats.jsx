import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  const [chats, setChats] = useState([]);

  useEffect(() =>{
    const getChats = () =>{
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    
    currentUser.uid && getChats()

  }, [currentUser.uid]);


  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }



  return (
    <div className='chats'>
      
    {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => ( //turns the fetched object into array of 2 ==> [0] -> chatId, [1]->userInfo (other user)

      <div className="userInfo" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} >  {/* using chatId (combinedId as key(unique id)) */}
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>

    ))};

    </div>
  )
}

export default Chats