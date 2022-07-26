import React, { Component, useRef, useEffect, useState } from 'react';

function Board(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);
  let drawStroke = []

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    context.scale(1,1);
    context.lineCap = 'round'
    context.strokeStyle = props.penColor;
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

    drawStroke.push({
      offsetX: offsetX,
      offsetY: offsetY,
      lineWidth: contextRef.current.lineWidth,
      strokeStyle: contextRef.current.strokeStyle,
    })
  }
  
  function beginDraw({ nativeEvent }) {
    const{ offsetX, offsetY } = nativeEvent; 
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY)

    drawStroke.push({
      offsetX: offsetX,
      offsetY: offsetY,
      lineWidth: contextRef.current.lineWidth,
      strokeStyle: contextRef.current.strokeStyle,
    })
    setIsDrawing(true);
  }

  function endDraw() {
    if (isDrawing) {
      contextRef.current.closePath()
      setIsDrawing(false);
      if (drawStroke.length > 0) {
        props.cachePush(drawStroke)
      }
      drawStroke = [];
    }
  }
  
  function redraw() {

  }

  function clear() {
    contextRef.clearRect(0,0,500,500);
  }

  function keyPress(e) {
    if(e.key === 'z' && e.metaKey) {
      props.cachePop();
    }
  }

  return(
      <div className="Board">
        <canvas 
          id='canvas' 
          ref={ canvasRef }
          onMouseDown={ beginDraw }
          onMouseUp={ endDraw }
          onMouseMove={ draw }
          onMouseOut={ endDraw }
        >
      </canvas>
      </div>
    )
}

export default Board;