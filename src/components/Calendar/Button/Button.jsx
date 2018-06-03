import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss';

const Button = props => (
  <button className={props.className} onClick={props.onClick}>
    {props.text}
  </button>
    );

Button.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
