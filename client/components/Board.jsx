import React, { Component, useRef, useEffect, useState } from 'react';

function Board(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    context.scale(1,1);
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = props.penSize;
    contextRef.current = context;
  }, [])

  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  function beginDraw({ nativeEvent }) {
    const{ offsetX, offsetY } = nativeEvent; 
    console.log('X',offsetX)
    console.log('Y',offsetY);
    console.log(contextRef);
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY)

    setIsDrawing(true);
  }

  function endDraw() {
    contextRef.current.closePath()
    setIsDrawing(false);
  }
  
  return(
      <div className="Board">
        <canvas 
          id='canvas' 
          ref={ canvasRef }
          onMouseDown={ beginDraw }
          onMouseUp={ endDraw }
          onMouseMove={ draw }
        >
      </canvas>
      </div>
    )
}

export default Board;