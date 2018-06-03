import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const RetroCard = ({ text, avatar, alt }) => (
  <div className="card">
    <div className="user_card" role="presentation">
      <p className="user_content" role="presentation">{text}</p>
      <div className="user_info" role="presentation">
        <img className="user_photo" src={avatar} alt={alt} />
        <i className="checkbox_flag" />
      </div>
    </div>
  </div>
);

RetroCard.propTypes = propTypes;

export default RetroCard;
