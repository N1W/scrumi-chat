/**
 * Created by Zerk on 27-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  name: PropTypes.string.isRequired,
};

const LaneHeader = ({ name }) => (
  <header className="b-board__col-header">
    <h2>{name}</h2>
  </header>
  );

LaneHeader.propTypes = propTypes;

export default LaneHeader;
