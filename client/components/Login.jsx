import React, { Component, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
// const fetch = require('node-fetch')

function Login(props) {
  const [error, changeError] = useState(null);
  let cat;
  async function login() {
    const result = await props.login();
    console.log(result);
    if (!result.success) {
      changeError(`Login Failed! Reason: ${result.reason}`);
    }
  }

  async function register(e) {
    const result = await props.register()
  }

  if (error === null) {
    cat = <div className="cat" />
  } else {
    cat = <div className="shakingCat" />
  }

  return (
    <div className='login'>
      <div className='loginlabel'>Login</div>
      <div className="error">{error}</div>
      {cat}
      <label className='username'>Username: <input type='text' value={props.usernameValue} onChange={(e) => props.userChange(e)}></input></label>
      <label className='password'>Password: <input type='text' value={props.passwordValue} onChange={(e) => props.passChange(e)}></input></label>
      <div className='buttons'>
        <button className='loginButton' onClick={login}>Login</button>
        <button className='registerButton' onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Login;
