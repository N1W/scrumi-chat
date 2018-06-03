import React from 'react';
import PropTypes from 'prop-types';

const RoundButton = props => (
  <div className={props.classNameA} onClick={props.onClick}>
    <button>
      <span className={props.classNameSpan} />
    </button>
  </div>
);

RoundButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classNameA: PropTypes.string,
  classNameSpan: PropTypes.string,
};

RoundButton.defaultProps = {
  classNameA: 'circle-button-l',
  classNameSpan: 'cross-l',
};

export default RoundButton;
