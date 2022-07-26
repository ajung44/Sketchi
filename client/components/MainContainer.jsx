import React, { Component, useEffect, useRef, useState } from 'react';
import Tools from './Tools.jsx'
import Board from './Board.jsx'
import File from './File.jsx'
import Login from './Login.jsx'

function MainContainer () {
  const [state, setState] = useState({
    penSize: 2,
    loggedIn: false
  });

  let elem = [];

  if (state.loggedIn) {
    elem.push(<div key="Left"className='Left'><Tools key="ToolsBar"/></div>)
    elem.push(<div key="Middle" className='Middle'><Board key="CanvasStage" penSize={state.penSize} /></div>)
    elem.push(<div key="Right" className='Right'><File key="FileBar" /></div>)
  } else {
    elem.push(<Login />)
  }
    return (
      <div className='MainContainer'>
        {elem}
      </div>
    )
  
}

export default MainContainer;