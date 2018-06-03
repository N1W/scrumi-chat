import React from 'react';
import PropTypes from 'prop-types';
import 'moment/locale/ru';

import './SwitchMonth.scss';

export default class SwitchMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: this.props.period,
      editEventWindow: this.props.editEventWindow,
    };

    this.switchMonthKeyboard = this.switchMonthKeyboard.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.switchMonthKeyboard);
  }

  componentDidUpdate() {
    this.props.editEventWindow === false ? window.addEventListener('keydown', this.switchMonthKeyboard)
      : window.removeEventListener('keydown', this.switchMonthKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.switchMonthKeyboard);
  }

  switchMonthKeyboard(e) {
    e.keyCode === 39 ? this.props.switchMonth(1) : null;
    e.keyCode === 37 ? this.props.switchMonth(-1) : null;
  }

  render() {
    return (
      <div className="current-month">
        <div
          className="current-month__arrow current-month__arrow--left"
          onClick={this.props.switchMonth.bind(null, -1)}
        > </div>
        <div className="current-month__date">
          <span className="year">{this.state.now.format('YYYY')}</span>
          <span className="month">{this.state.now.format('MMMM')}</span>
        </div>
        <div
          className="current-month__arrow current-month__arrow--right"
          onClick={this.props.switchMonth.bind(null, 1)}
        > </div>
      </div>
    );
  }
}

SwitchMonth.propTypes = {
  period: PropTypes.shape().isRequired,
  switchMonth: PropTypes.func.isRequired,
  editEventWindow: PropTypes.bool.isRequired,

};
