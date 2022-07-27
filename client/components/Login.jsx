import React, { Component, useEffect, useState } from 'react';
// const fetch = require('node-fetch')

function Login(props) {
  return (
    <div className='login'>
      <div className='loginlabel'>Login</div>
      <label className='username'>Username: <input type='text' value={props.usernameValue} onChange={(e) => props.userChange(e)}></input></label>
      <label className='password'>Password: <input type='text' value={props.passwordValue} onChange={(e) => props.passChange(e)}></input></label>
      <div className='buttons'>
        <button className='loginButton' onClick={props.login}>Login</button>
        <button className='registerButton' onClick={props.register}>Register</button>
      </div>
    </div>
  );
}

export default Login;
