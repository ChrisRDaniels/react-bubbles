import React, { useState } from "react";
import axios from 'axios'
import { Link } from 'react-router-dom'


const Login = (props) => {
  const [user, setUser] = useState({})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChanges = e => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    axios
    .post('http://localhost:5000/api/login', user)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log('error logging in', err))
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Username
        <input type='text' name='username' htmlFor='username' onChange={handleChanges}/></label>
        <label>Password
        <input type='password' name='password' htmlFor='password' onChange={handleChanges}/></label>
        <button type='submit'>Login</button>
      </form>
      <Link to='bubbles'>Bubbles</Link>
    </>
  );
};

export default Login;
