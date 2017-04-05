import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'

import store, { history } from './store';
import App from './container/App';
import Main from './container/Main';
import Counter from './components/Counter';
require("./sass/main.scss");

const router = (
  <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Main}/>
          <Route path="/counter" component={Counter}/>
        </Route>
    </Router>
  </Provider>
)

render( router, document.getElementById('mount') );
