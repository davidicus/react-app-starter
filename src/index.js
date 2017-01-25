import React from 'react';
import { render } from 'react-dom';
import Counter from './components/Counter';
require("./sass/main.scss");

render(
  <Counter/>,
  document.getElementById('mount')
);
