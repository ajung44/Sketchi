import React from 'react';
import { render } from 'react-dom';
import Browsing from './components/Browsing.jsx';

// uncomment so that webpack can bundle styles
import styles from './styles.css';

render(
  <Browsing />,
  document.getElementById('browse')
);
