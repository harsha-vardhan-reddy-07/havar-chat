import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

export const Login = () => {

  const navigate = useNavigate();

  const [err, setErr] = useState(false);

  const handleSignin = async (e) =>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try{

      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');

    }catch(error){
      setErr(true);
    }
  }
  



  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Havar chat</span>
        <span className="title">Login</span>

        <form onSubmit={handleSignin}>
          <input type="email" placeholder='Email' />
          <input type="password" placeholder='Password' autoComplete="on" />
          <button >Sign In</button>
          {err && <span style={{color: '#e76767', textAlign:'center'}} >Error occured!! Try again..</span>}
        </form>
        <p>Don't have an account? <Link to='/register'> Register </Link></p>
      </div>
    </div>
  )
}
