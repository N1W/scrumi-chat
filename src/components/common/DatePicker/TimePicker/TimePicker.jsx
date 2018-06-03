import React from 'react';
import PropTypes from 'prop-types';

import './TimePicker.scss';

const propTypes = {
  selectedTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    ]).isRequired,
  // saveTimeChange: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
};

const TimePicker = (props) => (
  <div className={'g-time-picker'}>
    <input
      className="g-time-picker__time"
      type="text"
      value={props.selectedTime ? props.selectedTime : ''}
      onChange={(e) => {
        props.handleTimeChange(e.target.value)
      }}
    />
  </div>
);

TimePicker.propTypes = propTypes;

export default TimePicker;
