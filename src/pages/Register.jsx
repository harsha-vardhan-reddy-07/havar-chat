import React, { useState } from 'react';
import { FcAddImage } from 'react-icons/fc';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage, db} from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import {Link, useNavigate} from 'react-router-dom';

export const Register = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false);
  const [passError, setPassError] = useState(false);
  const [picUploading, setPicUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    if (password.length < 6){
      setPassError(true);
    }
    else{

    try{
      const res = await createUserWithEmailAndPassword(auth, email, password).catch((error) =>{
        console.log(error);
      });
      

      const storageRef = ref(storage, res.user.uid);
      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setPicUploading(true);
          setProgress(progress);
        }, 
        (error) => {
          setErr(true);
        }, 
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: userName, 
              photoURL: downloadURL
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid:res.user.uid,
              email,
              displayName: userName, 
              photoURL: downloadURL
            });

            // let's create user chats collection (empty by default)
            await setDoc(doc(db, 'userChats', res.user.uid), {});

            navigate('/');
          });
        }

      
      );

      

    } catch(err){
      setErr(true);
    }

  }
    
  }


  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Havar chat</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Username'  />
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' autoComplete="on" />
          <input style={{display: 'none'}} type="file" id='file' />
          <label htmlFor="file">
            <FcAddImage />
            {picUploading ? <span> Uploading: {progress} %</span> : <span> Add your avatar</span>}

          </label>
          <button>Sign Up</button>
          {err && <span style={{color: '#e76767', textAlign:'center'}}>Something went wrong!!</span>}
          {passError && <span style={{color: '#e76767', textAlign:'center'}}>Password: minimum 6 characters</span>}
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}
