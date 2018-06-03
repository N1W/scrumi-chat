import React from 'react';
import PropTypes from 'prop-types';
import './AmountEvent.scss';

const AmountEvent = (props) => (
  <div className={props.className} />
);

AmountEvent.propTypes = {
  className: PropTypes.string.isRequired,
};

AmountEvent.defaultProps = {
  className: 'triangle',
};

export default AmountEvent;
