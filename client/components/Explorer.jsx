import React, { Component, useEffect, useState } from 'react';

function Explorer(props) {
  const [loaded, changeLoaded] = useState({
    focus: null,
    loaded: false,
    list: [],
  });

  useEffect(() => {
    console.log('test')
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

  async function deleteFile() {
    if (loaded.focus === null) return;
    await props.deleteFile(loaded.focus);
    await changeLoaded({
      ...loaded,
      focus: null,
    });
    props.fileCall()
      .then((result) => {
        changeLoaded({
          ...loaded,
          list: result,
        });
      });
  }

  const list = [];
  console.log('list, ', loaded.list);
  loaded.list.forEach((elem, index) => {
    list.push(<button key={`list${index}`} id={elem._id} onClick={(e) => changeLoaded({ ...loaded, focus: e.target.id })}>{elem.fileName}</button>);
  });

  if (list.length === 0) {
    return (
      <div className="fileExplorer">
        <div className="fileButtons">
          <button onClick={savingFile}>Save</button>
          <button>Load</button>
          <button>Delete</button>
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
        <button onClick={savingFile}>Save</button>
        <button onClick={loadingFile}>Load</button>
        <button onClick={deleteFile}>Delete</button>
      </div>
      <div className="exploreTable">
        {list}
      </div>
    </div>
  );
}

export default Explorer;
