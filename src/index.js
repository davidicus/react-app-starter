import React from 'react';
import { render } from 'react-dom';
import Counter from './components/Counter';
require("main");
require("reset");

render(
  <Counter/>,
  document.getElementById('mount')
);
