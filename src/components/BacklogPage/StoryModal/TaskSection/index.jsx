import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';
import TasksHeader from './TasksHeader';
import TasksList from './TasksList';
import TasksFooter from './TasksFooter';

import './styles.scss';

const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  createTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const TasksSection = ({ tasks, createTask, deleteTask }) => {
  const tasksAll = tasks.length;
  const tasksCompleted = map(tasks, task => (task.completed)).length;

  return (
    <div className="b-tasks">
      <TasksHeader total={tasksAll} completed={0} />
      <TasksList tasks={tasks} deleteTask={deleteTask} />
      <TasksFooter createTask={createTask} />
    </div>
  );
};


TasksSection.defaultProps = {
  tasks: [],
};

TasksSection.propTypes = propTypes;

export default TasksSection;


// total={tasks.total} done={tasks.done}
//
// <button
//   style={{ backgroundColor: '#0075F2' }}
//   onClick={() => onCreateTask('new task')}
//   ref={(x) => { taskBtn = x; }}
// >add task</button>
// <button
// style={{ backgroundColor: '#FF6B35' }}
// onClick={() => { onDelete(story.id, story.tasks); }}
// >x</button>

