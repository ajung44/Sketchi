import React, { Component, useRef, useEffect } from 'react';
import MainContainer from './MainContainer.jsx'

class App extends Component {

  render() {
    return(
      <div className='App'>
        <div className='bar1' />
        <div className='contentBox'>
          <div className='Logo'>
            Sketchi
          </div>
          <MainContainer />
        </div>
        <div className='bar2' />
        <div className='circle1' />
        <div className='circle2' />
        <div className='circle3' />
        <div className='mascot' />
      </div>
    )
  }
}
export default App;