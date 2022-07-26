import React, { Component, useEffect, useState } from 'react'

function Login() {
  return (
    <div className='login'>
      <div className = 'loginlabel'>Login</div>
      <label className='username'>Username: <input type='text'></input></label>
      <label className='password'>Password: <input type='text'></input></label>
      <div className='buttons'>
        <button className='loginButton'>Login</button>
        <button className='registerButton'>Register</button>
      </div>
    </div>
  )
}

export default Login;