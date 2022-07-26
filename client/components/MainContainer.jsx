import React, { Component, useEffect, useRef, useState } from 'react';
import fetch from 'node-fetch';
import Tools from './Tools.jsx'
import Board from './Board.jsx'
import File from './File.jsx'
import Login from './Login.jsx'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      penSize: 2,
      penColor: 'black',
      cache: [],
      redoCache: [],
      loggedIn: false,
      usernameValue: '',
      passwordValue: ''
    }
    this.userChange = this.userChange.bind(this)
    this.passChange = this.passChange.bind(this)
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.cachePush = this.cachePush.bind(this)
    this.cachePop = this.cachePop.bind(this)
  }

  async cachePush(point) {
    await this.setState(prev => ({
      cache: [...prev.cache, point]
    }))
    console.log(this.state.cache);
  }

  async cachePop() {
    const popped = await this.setState(prev => ({
      cache: prev.cache.slice(0, this.state.cache.length - 1),
      redoCache: [...prev.redoCache, prev.cache.length - 1]
    }))
  }
  
  userChange(e) {
    this.setState({usernameValue: e.target.value})
  }
   
  passChange(e) {
    this.setState({passwordValue: e.target.value})
  }


  async login() {
    const response = await fetch('http://localhost:8080/user/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: this.state.usernameValue, password: this.state.passwordValue }),
    })
    this.setState({ usernameValue: '', passwordValue: '' })
    const result = await response.json()

    if(result.success) {
      this.setState({ loggedIn: true })
    }
  }

  async register() {
    try {
    const response = await fetch('http://localhost:8080/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: this.state.usernameValue, password: this.state.passwordValue })
    })

    this.setState({ usernameValue: '', passwordValue: '' })
    const result = await response.json();

    if(response.status === 400) {
      throw new Error;
    }

    this.setState({ loggedIn: true })
  } catch (error) {
    console.log('error')
    return;
  }
  }

  render() {
    let elem = [];

    if (this.state.loggedIn) {
      elem.push(<div key="Left"className='Left'><Tools key="ToolsBar"/></div>)
      elem.push(<div key="Middle" className='Middle'><Board key="CanvasStage" cachePop={this.cachePop} cachePush={this.cachePush} penColor={this.state.penColor} isDrawing={this.state.isDrawing} penSize={this.state.penSize} /></div>)
      elem.push(<div key="Right" className='Right'><File key="FileBar" /></div>)
    } else {
      elem.push(<Login key="Logging" register={this.register} login={this.login} userChange={this.userChange} passChange={this.passChange} usernameValue={this.state.usernameValue} passwordValue={this.state.passwordValue} />)
    }
      return (
        <div className='MainContainer'>
          {elem}
        </div>
      )
  }
}

export default MainContainer;