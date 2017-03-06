import React from 'react';
require('../img/thing.png')

/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <img src="/img/thing.png"/>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Count: {this.state.count}
        </button>
      </div>
    );
  }
}
export default Counter;
