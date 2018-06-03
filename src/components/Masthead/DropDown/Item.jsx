/**
 * Created by Zerk on 19-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  itemClassName: PropTypes.string,
  linkClassName: PropTypes.string,
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const Item = props => (
  <li className={props.itemClassName}>
    <Link
      className={props.linkClassName}
      to={props.link}
      onClick={props.handleClick}
    >
      {props.text}
      {props.children}
    </Link>
  </li>
);

Item.propTypes = propTypes;

Item.defaultProps = {
  text: 'Menue Item',
  itemClassName: 'dropdown__item',
  linkClassName: 'dropdown__link',
  link: '/',
};


export default Item;

