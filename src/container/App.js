import React, { Component } from 'react';


export default class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <main className="app">
        <h1>Hey Now!</h1>
        { this.props.children ? React.cloneElement(this.props.children, this.props) : `` }
      </main>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element
}
