import React, { useContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {

  const {currentUser} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () =>{
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }catch(error){
      setErr(true);
    }
    
  };

  const handleKey = (e) =>{
    e.code === 'Enter' && handleSearch();
  }

  const handleSelect = async () =>{
    // Check chats section!! if previous chats exists? open the. else create new chat

    // let's use combination of 2 userId's as chat collection ID (format - biggerUID+smallerUID)
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{

      const res = await getDoc(doc(db, 'chats', combinedId));
      if(!res.exists()){
        // let's create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId),{messages:[]});

        // let's create user chat
        //for current user
        await updateDoc(doc(db, 'userChats', currentUser.uid),{
          [combinedId+'.userInfo']:{ //  '.userInfo' ==> adds a subfield inside the combinedId field
            uid:user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+'.date']:serverTimestamp() // '.date' ==> adds a subfield inside the combinedId field along with userInfo subfield

        });
        // similarly for other user
        await updateDoc(doc(db, 'userChats', user.uid),{
          [combinedId+'.userInfo']:{ 
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+'.date']:serverTimestamp()

        });
      }

    }catch(error){}

    setUser(null);
    setUsername(''); 

  }

  return (
    <div className='search'>
      <div className="searchform">
        <input type="text" 
                placeholder='search for user' 
                onKeyDown={handleKey} 
                onChange={e => setUsername(e.target.value)} 
                value = {username}
        />
      </div>

    {err && <span>No User Found!!</span>}

    {user &&  <div className="userInfo" onClick={handleSelect} >
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{user.displayName}</span>
                </div>
              </div>
            }
      

    </div>
  )
}

export default Search