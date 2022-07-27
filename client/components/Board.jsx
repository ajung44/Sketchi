import React, { useRef, useEffect, useState } from 'react';

function Board(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const drawStroke = [];

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
    context.scale(1, 1);
    context.lineCap = 'round';
    context.strokeStyle = props.penColor;
    context.lineWidth = props.penSize;
    contextRef.current = context;
  }, []);

  function draw({ nativeEvent }) {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();

    drawStroke.push({
      offsetX,
      offsetY,
      lineWidth: contextRef.current.lineWidth,
      strokeStyle: contextRef.current.strokeStyle,
    });
  }

  function beginDraw({ nativeEvent }) {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.strokeStyle = props.penColor;
    contextRef.current.lineWidth = props.penSize;
    drawStroke.push({
      offsetX,
      offsetY,
      lineWidth: contextRef.current.lineWidth,
      strokeStyle: contextRef.current.strokeStyle,
    });
    setIsDrawing(true);
    props.clearRedo();
  }

  function endDraw() {
    if (isDrawing) {
      contextRef.current.closePath();
      setIsDrawing(false);
      if (drawStroke.length > 0) {
        props.cachePush(drawStroke);
      }
    }
  }

  function redraw(method, point) {
    if (method === 'undo') {
      contextRef.current.clearRect(0, 0, 500, 500);
      for (let i = point.length - 1; i >= 0; i--) {
        contextRef.current.beginPath();
        contextRef.current.moveTo(point[i][0].offsetX, point[i][0].offsetY);
        contextRef.current.strokeStyle = point[i][0].strokeStyle;
        contextRef.current.lineWidth = point[i][0].lineWidth;
        for (const indiv of point[i]) {
          if (Array.isArray(indiv)) {
            contextRef.current.closePath();
            return;
          }
          contextRef.current.lineTo(indiv.offsetX, indiv.offsetY);
          contextRef.current.stroke();
        };
        contextRef.current.closePath();
      }

      contextRef.current.strokeStyle = props.penColor;
      contextRef.current.lineWidth = props.penSize;
    } else if (method === 'redo') {
      if (!Array.isArray(point[0])) {
        console.log('not');
        contextRef.current.beginPath();
        contextRef.current.strokeStyle = point[0].strokeStyle;
        contextRef.current.lineWidth = point[0].lineWidth;
        point.forEach((elem) => {
          contextRef.current.lineTo(elem.offsetX, elem.offsetY);
          contextRef.current.stroke();
        });
        contextRef.current.closePath();
        contextRef.current.strokeStyle = props.penColor;
        contextRef.current.lineWidth = props.penSize;
      } else {
        console.log('is');
        clear();
      }
    }
  }

  function clear() {
    contextRef.current.clearRect(0, 0, 500, 500);
  }

  async function keyPress(e) {
    if (e.key === 'z' && e.metaKey) {
      const undo = await props.cachePop();
      if (undo) {
        redraw('undo', undo);
      }
    } else if (e.key === 'Z') {
      const cleared = await props.clearAll();
      clear();
    } else if (e.key === 'b' && e.metaKey) {
      const redo = await props.redoPop();
      if (redo) {
        redraw('redo', redo);
      }
    }
  }

  return (
    <div className="Board">
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseDown={beginDraw}
        onMouseUp={endDraw}
        onMouseMove={draw}
        onMouseOut={endDraw}
      />
    </div>
  );
}

export default Board;
