import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

// uncomment so that webpack can bundle styles
import styles from './styles.css';

render(
  <App />,
  document.getElementById('root')
);
