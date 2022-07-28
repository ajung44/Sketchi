import React, { Component, useEffect, useState } from 'react';

function Tools(props) {
  return (
    <div className="Tools">
      <input type="range" step="0.5" min="0.5" max="15" value={props.penSize} onChange={(e) => props.changeBrush(e)} className="sizeSlider" />
      <input type="number" min="0.5" max="15" step="0.5" value={props.penSize} onChange={(e) => props.changeBrush(e)} />
      <div className="toolBox">
        <button className="penTool" onClick={() => props.changeColor('pen')}>Pen</button>
        <button className="eraserTool" onClick={() => props.changeColor('eraser')}>Eraser</button>
      </div>
      <div className="colorBox">
        <button className="redBox" onClick={() => props.changeColor('red')}>Red</button>
        <button className="blueBox" onClick={() => props.changeColor('blue')}>Blue</button>
        <button className="yellowBox" onClick={() => props.changeColor('purple')}>Purple</button>
        <button className="greenBox" onClick={() => props.changeColor('green')}>Green</button>
        <button className="yellowBox" onClick={() => props.changeColor('yellow')}>Yellow</button>
        <button className="blackBox" onClick={() => props.changeColor('black')}>Black</button>
      </div>
    </div>
  );
}

export default Tools;
