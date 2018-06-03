import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  deleteTask: PropTypes.func.isRequired,
};

const TasksList = ({ tasks, deleteTask }) => (
  <div className="$">
    <ul className="b-tasks__list">
      {map(tasks, (task, idx) => (
        <li key={task.id} className="b-tasks__item" >
          <span className="b-tasks__idx" >{idx + 1}</span>
          <p className="b-tasks__text">{task.name}</p>
          <i
            className="b-tasks__btn-del"
            onClick={() => { deleteTask(task.id); }}
          />
        </li>
        ))}
    </ul>
  </div>
  );

TasksList.defaultProps = {
  tasks: [],
};

TasksList.propTypes = propTypes;

export default TasksList;
