import React, { Component, useRef, useEffect } from 'react';
import MainContainer from './MainContainer.jsx'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='App'>
        <div className='Logo'>
          Sketchi
        </div>
        <MainContainer />
      </div>
    )
  }
}
export default App;