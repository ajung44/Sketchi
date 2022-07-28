import React, { Component, useState, useEffect } from 'react';

function Browser(props) {
  const [state, changeState] = useState({
    focus: null,
    loaded: false,
    list: {},
  });

  useEffect(() => {
    if (!state.loaded) {
      props.postCall()
        .then((result) => {
          console.log('result', result);
          changeState({
            ...state,
            list: result,
            loaded: true,
          });
        });
    }
  });

  const list = [];
  
  console.log('list, ', state.list);
  
  if (Object.keys(state.list).length !== 0) {
    state.list.postings.forEach((elem, index) => {
      let username;
      state.list.usernames.forEach((elem2) => {
        console.log(elem.user);
        console.log(elem2._id);
        if (elem.user == elem2._id) {
          username = elem2.username;
        }
      });
      list.push(<div className="Post">
        <img src={elem.image} />
        <div className="PostText">Posted By: {username}</div>
      </div>);
    });
  }

  return (
    <div className="BrowserWindow">
      <div className="browseBox">
        <div className="browseContent">
          {list}
        </div>
      </div>
    </div>
  );
}

export default Browser;
