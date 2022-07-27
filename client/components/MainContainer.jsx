import React, {
  Component,
} from 'react';
import fetch from 'node-fetch';
import Tools from './Tools.jsx';
import Board from './Board.jsx';
import File from './File.jsx';
import Login from './Login.jsx';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      penSize: 0.5,
      penColor: 'black',
      primaryColor: 'black',
      cache: [],
      redoCache: [],
      loggedIn: false,
      usernameValue: '',
      passwordValue: '',
    };

    this.userChange = this.userChange.bind(this);
    this.passChange = this.passChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.cachePush = this.cachePush.bind(this);
    this.cachePop = this.cachePop.bind(this);
    this.clearRedo = this.clearRedo.bind(this);
    this.redoPop = this.redoPop.bind(this);
    this.changeBrush = this.changeBrush.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  async cachePush(point) {
    await this.setState((prev) => ({
      cache: [...prev.cache, point],
    }));
    return this.state.cache;
  }

  async cachePop() {
    if (this.state.cache.length > 0) {
      await this.setState((prev) => ({
        cache: prev.cache.slice(0, prev.cache.length - 1),
        redoCache: [...prev.redoCache, prev.cache[prev.cache.length - 1]],
      }));
      console.log('undo', this.state.cache);
      console.log(this.state.redoCache);
      return this.state.cache;
    }
    return null;
  }

  async clearAll() {
    if (this.state.cache.length > 0) {
      const popped = this.state.cache[this.state.cache.length - 1];
      if (Array.isArray(popped[0])) {
        console.log('empty');
        return null;
      }
      await this.setState((prev) => ({
        cache: [...prev.cache, prev.cache],
      }));

      console.log('clear', this.state.cache);
      console.log(this.state.redoCache);
      return this.state.cache;
    }
    return null;
  }

  async clearRedo() {
    await this.setState({ redoCache: [] });
  }

  async redoPop() {
    if (this.state.redoCache.length > 0) {
      const popped = this.state.redoCache[this.state.redoCache.length - 1];
      await this.setState((prev) => ({
        cache: [...prev.cache, prev.redoCache[prev.redoCache.length - 1]],
        redoCache: prev.redoCache.slice(0, prev.redoCache.length - 1),
      }));
      console.log('redo', this.state.cache);
      console.log(this.state.redoCache);
      return popped;
    }
    return null;
  }

  userChange(e) {
    this.setState({ usernameValue: e.target.value });
  }

  changeBrush(e) {
    this.setState({ penSize: e.target.value });
  }

  changeColor(tool) {
    if (tool === 'pen') {
      this.setState({ penColor: this.state.primaryColor });
    } else if (tool === 'eraser') {
      this.setState({ penColor: 'white' });
    } else if (tool === 'red') {
      this.setState({ penColor: 'red', primaryColor: 'red' });
    } else if (tool === 'blue') {
      this.setState({ penColor: 'blue', primaryColor: 'blue' });
    } else if (tool === 'yellow') {
      this.setState({ penColor: 'yellow', primaryColor: 'yellow' });
    } else if (tool === 'black') {
      this.setState({ penColor: 'black', primaryColor: 'black' });
    } else if (tool === 'white') {
      this.setState({ penColor: 'white', primaryColor: 'white' });
    }
  }

  passChange(e) {
    this.setState({ passwordValue: e.target.value });
  }

  async login() {
    const response = await fetch('http://localhost:8080/user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: this.state.usernameValue,
        password: this.state.passwordValue,
      }),
    });
    this.setState({ usernameValue: '', passwordValue: '' });
    const result = await response.json();

    if (result.success) {
      this.setState({ loggedIn: true });
    }
  }

  async register() {
    try {
      const response = await fetch('http://localhost:8080/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.state.usernameValue,
          password: this.state.passwordValue,
        }),
      });

      this.setState({ usernameValue: '', passwordValue: '' });

      if (response.status === 400) {
        throw new Error();
      }

      this.setState({ loggedIn: true });
    } catch (error) {
      console.log('error');
    }
  }

  render() {
    const elem = [];

    if (this.state.loggedIn) {
      elem.push(
        <div
          key="Left"
          className="Left"
        >
          <Tools
            key="ToolsBar"
            penSize={this.state.penSize}
            penColor={this.state.penColor}
            changeBrush={this.changeBrush}
            changeColor={this.changeColor}
          />
        </div>,
      );
      elem.push(
        <div
          key="Middle"
          className="Middle"
        >
          <Board
            key="CanvasStage"
            cache={this.state.cache}
            redoPop={this.redoPop}
            clearRedo={this.clearRedo}
            cachePop={this.cachePop}
            cachePush={this.cachePush}
            clearAll={this.clearAll}
            penColor={this.state.penColor}
            penSize={this.state.penSize}
          />
        </div>,
      );
      elem.push(<div key="Right" className="Right"><File key="FileBar" /></div>);
    } else {
      elem.push(<Login
        key="Logging"
        register={this.register}
        login={this.login}
        userChange={this.userChange}
        passChange={this.passChange}
        usernameValue={this.state.usernameValue}
        passwordValue={this.state.passwordValue}
      />);
    }
    return (
      <div className="MainContainer">
        {elem}
      </div>
    );
  }
}

export default MainContainer;
