import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  },[]);

  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'content-type': 'application/json'
      }
    });
    result = await result.json();
    console.warn(result);
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
    navigate('/');


  }

  return (
    <div className='register'>
      <h1>Resgister</h1>
      <input className="inputBox" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="inputBox" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="inputBox" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className='appButton' type="button" onClick={collectData}>Sign Up</button>
    </div>
  );
}

export default SignUp;
