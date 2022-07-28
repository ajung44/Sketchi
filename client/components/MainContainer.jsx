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
      penColor: 'gray',
      primaryColor: 'gray',
      cache: [],
      redoCache: [],
      loggedIn: false,
      loaded: false,
      id: '',
      loadedPoint: null,
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
    this.fileCall = this.fileCall.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.postFile = this.postFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.postCall = this.postCall.bind(this);
  }

  async cachePush(point) {
    console.log('cache Push,', point);
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
      console.log(this.state.cache);
      console.log(this.popped);
      if (Array.isArray(popped[0])) {
        return null;
      }
      await this.setState((prev) => ({
        cache: [...prev.cache, prev.cache],
      }));

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
      this.setState({ penColor: '#FDC9C9', primaryColor: '#FDC9C9' });
    } else if (tool === 'blue') {
      this.setState({ penColor: '#C9F4FB', primaryColor: '#C9F4FB' });
    } else if (tool === 'yellow') {
      this.setState({ penColor: '#FFFAC9', primaryColor: '#FFFAC9' });
    } else if (tool === 'black') {
      this.setState({ penColor: 'gray', primaryColor: 'gray' });
    } else if (tool === 'green') {
      this.setState({ penColor: '#C9EFCB', primaryColor: '#C9EFCB' });
    } else if (tool === 'purple') {
      this.setState({ penColor: '#DBC9E9', primaryColor: '#DBC9E9' });
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
    const result = await response.json();
    console.log(result);

    if (result.success) {
      this.setState({ loggedIn: true, usernameValue: '', passwordValue: '', id: result.id });
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

      const result = await response.json()
      console.log(result)

      if (response.status === 400) {
        throw new Error();
      }

      this.setState({ loggedIn: true , usernameValue: '', passwordValue: '', id: result._id });
    } catch (error) {
      console.log('error');
    }
  }

  async fileCall() {
    try {
      const response = await fetch('http://localhost:8080/user/drawings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: this.state.id,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error');
    }
  }

  async loadFile(focus) {
    try {
      console.log('focus', focus);
      const response = await fetch('http://localhost:8080/user/loadDrawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: focus,
        }),
      });
      const result = await response.json();
      await this.setState({ loadedPoint: result, redoCache: [], cache: [] });
      console.log('Point ',this.state.loadedPoint);
    } catch (error) {
      console.log('error');
    }
  }

  async saveFile() {
    const newCache = [];
    if (this.state.loadedPoint !== null) {
      this.state.loadedPoint.forEach(elem => {
        newCache.push(elem);
      })
    }

    this.state.cache.forEach(elem => {
      newCache.push(elem);
    })
    try {
      const response = await fetch('http://localhost:8080/user/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          point: newCache,
          id: this.state.id,
        }),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.log('error');
    }
  }

  async postFile(dataURL) {
    try {
      console.log(dataURL)
      const response = await fetch('http://localhost:8080/user/postDrawing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: dataURL,
          user: this.state.id,
        }),
      });
      const result = await response.json()
      console.log(result);
    } catch (error) {
      console.log('error');
    }
  }

  async deleteFile(focus) {
    try {
      console.log(focus);
      const response = await fetch('http://localhost:8080/user/deleteFile', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: focus,
          user: this.state.id,
        }),
      });
    } catch (error) {
      console.log('error');
    }
  }

  async postCall() {
    try {
      const response = await fetch('http://localhost:8080/user/postings');
      const result = await response.json();
      console.log('post call ', result);
      return result;
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
            loadedPoint={this.state.loadedPoint}
            loaded={this.state.loaded}
            postFile={this.postFile}
            postCall={this.postCall}
          />
        </div>,
      );
      elem.push(<div key="Right" className="Right"><File key="FileBar" fileCall={this.fileCall} deleteFile={this.deleteFile} loadFile={this.loadFile} saveFile={this.saveFile} /></div>);
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
