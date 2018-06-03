import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  total: PropTypes.number,
  completed: PropTypes.number,
};

const TasksHeader = ({ total, completed }) => (
  <header className="b-tasks__header">
    <h2 className="b-tasks__title">Задачи:</h2>
    <p className="b-tasks__counter">
      {total}
      <span className="b-tasks__done">({completed})</span>
    </p>
  </header>
  );

TasksHeader.defaultProps = {
  total: 0,
  completed: 0,
};

TasksHeader.propTypes = propTypes;

export default TasksHeader;
