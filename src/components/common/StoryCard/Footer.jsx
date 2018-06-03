/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  total: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired,
  showTasks: PropTypes.func.isRequired,
  tasksVisible: PropTypes.bool.isRequired,
};

const Footer = ({ total, completed, showTasks, tasksVisible }) => (
  <footer className="b-story-card__footer" onClick={showTasks}>
    <div className="b-story-card__info">
        Задачи
        <p className="b-story-card__count">
          {total}
          <span className="b-story-card__done"> ({completed})</span>
        </p>
    </div>
    <button className={`b-story-card__btn ${tasksVisible && 'b-story-card__btn--rotate'}`} />
  </footer>
);

Footer.propTypes = propTypes;

export default Footer;
