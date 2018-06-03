/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const propTypes = {
  count: PropTypes.number.isRequired,
};

const SprintHeader = ({ count }) => (
  <header className="b-sprint-start__header">
    <p className="b-sprint-start__label">
      Add stories to sprint.
      <span className="b-sprint-start__checked">{count}</span>
      Stories are checked.
    </p>
  </header>
);

SprintHeader.propTypes = propTypes;

export default SprintHeader;
