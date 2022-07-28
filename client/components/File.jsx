import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Explorer from './Explorer.jsx'

function File(props) {
  return (
    <div className="File">
      <Popup trigger={<button>File</button>} position="right top">
        <Explorer key="explorerComp" deleteFile={props.deleteFile} loadFile={props.loadFile} saveFile={props.saveFile} fileCall={props.fileCall} />
      </Popup>
    </div>
  );
}

export default File;
