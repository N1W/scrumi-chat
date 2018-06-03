/**
 * Created by Zerk on 25-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  idx: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onRemoveFromSprint: PropTypes.func.isRequired,
};

const Story = ({ idx, text, onRemoveFromSprint }) => (
  <li className="b-sprint-list__item">
    <span className="b-sprint-list__number">{idx}</span>
    <p className="b-sprint-list__text">{text}</p>
    <button className="b-sprint-list__btn" onClick={onRemoveFromSprint} />
  </li>
);

Story.propTypes = propTypes;

export default Story;
