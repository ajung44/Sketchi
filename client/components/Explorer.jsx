import React, { Component, useEffect, useState } from 'react';

function Explorer(props) {
  const [loaded, changeLoaded] = useState({
    focus: null,
    loaded: false,
    list: [],
  });

  useEffect(() => {
    if (!loaded.loaded) {
      props.fileCall()
        .then((result) => {
          changeLoaded({
            ...loaded,
            list: result,
            loaded: true,
          });
        });
    }
  });

  async function savingFile() {
    await props.saveFile();
    changeLoaded({ ...loaded, loaded: false });
  }

  async function loadingFile() {
    if (loaded.focus === null) return;
    await props.loadFile(loaded.focus);
    await changeLoaded({
      ...loaded,
      focus: null,
    });
  }

  const list = [];
  loaded.list.forEach((elem, index) => {
    list.push(<button key={`list${index}`} id={elem._id} onClick={(e) => changeLoaded({ ...loaded, focus: e.target.id})}>{elem.fileName}</button>);
  });

  if (list.length === 0) {
    return (
      <div className="fileExplorer">
        <div className="fileButtons">
          <button onClick={savingFile} >Save</button>
          <button>Load</button>
        </div>
        <div className="exploreTable">
          Empty List
        </div>
      </div>
    );
  }

  return (
    <div className="fileExplorer">
      <div className="fileButtons">
        <button onClick={savingFile} >Save</button>
        <button onClick={loadingFile}>Load</button>
      </div>
      <div className="exploreTable">
        {list}
      </div>
    </div>
  );
}

export default Explorer;
