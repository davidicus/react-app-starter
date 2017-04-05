import React, { Component } from 'react';
import { Link } from 'react-router';


export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <main className="app">
        <h1>Hey Now!</h1>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/counter">Counter</Link></li>
        </ul>
        <section className="app-section">
          { this.props.children ? React.cloneElement(this.props.children, this.props) : `` }
        </section>
      </main>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
}
