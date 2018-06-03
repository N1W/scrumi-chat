/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CreateSprint = ({ onClick }) => (
  <div className="b-sprint-create">
    <button className="b-sprint__btn button-green" onClick={onClick}>Создать спринт</button>
    {/* <p className="b-sprint__info">sprint info</p> */}
    {/* <p className="b-sprint__label">sprint label</p> */}
  </div>
);

CreateSprint.propTypes = propTypes;

export default CreateSprint;
