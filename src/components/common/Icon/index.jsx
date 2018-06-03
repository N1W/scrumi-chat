/**
 * Created by Zerk on 19-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const defaultProps = {
  className: 'icon',
  imageLink: '#',
  alt: 'icon',
};

const Icon = ({ className, imageLink, alt }) => (
  <img
    className={className}
    src={imageLink}
    alt={alt}
  />
);

Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;
