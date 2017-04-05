import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './container/App';
import Main from './container/Main';
import Counter from './components/Counter';
require("./sass/main.scss");

const router = (
  <Router>
    <section className="app-section">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/main">Main</Link></li>
        <li><Link to="/counter">Counter</Link></li>
      </ul>

      <Route path="/" component={App}/>
      <Route path="/main" component={Main}/>
      <Route path="/counter" component={Counter}/>
    </section>
  </Router>
)

render( router, document.getElementById('mount') );
