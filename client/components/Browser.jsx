import React, { Component, useState, useEffect } from 'react';

function Browser(props) {
  const [state, changeState] = useState({
    focus: null,
    loaded: false,
    list: [],
  });

  useEffect(() => {
    if (!state.loaded) {
      props.postCall()
        .then((result) => {
          console.log('result', result)
          changeState({
            ...state,
            list: result,
            loaded: true,
          })
        })
    }
  })

  const list = [];
  console.log('list, ', state.list);
  state.list.forEach((elem, index) => {
    list.push(<div className="Post"><img src={elem.image}/>Posted By: {elem.user}</div>);
  });

  return(
    <div className="BrowserWindow">
      <div className="browseBox">
        <div className="browseContent">
          {list}
        </div>
      </div>
    </div>
  )
}

export default Browser;