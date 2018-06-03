/**
 * Created by Zerk on 19-Aug-17.
 */

import React from 'react';

import './styles.scss';

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newItems: 7,
    };
  }

  render() {
    return (
      <span
        className={this.state.newItems > 0 ? 'counter counter_active' : 'counter'}
      >
        {this.state.newItems}
      </span>
    );
  }
}

export default Counter;

