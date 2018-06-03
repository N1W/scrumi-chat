/**
 * Created by Zerk on 17-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const NavBtn = ({ onClick, type }) => (
  <button
    className={`b-backlog__nav b-backlog__nav--${type}`}
    onClick={() => { onClick(type); }}
  />
);

NavBtn.propTypes = propTypes;

export default NavBtn;
