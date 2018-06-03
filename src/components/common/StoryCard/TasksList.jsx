import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { connect } from 'react-redux';
import choseColor from './chooseColor';
import * as TaskModalActions from '@/actions/TaskModalActions';


const propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onClickTask: PropTypes.func.isRequired,
};

const TasksList = ({ tasks, onClickTask }) => (
  <ul className="b-story-card__list">
    {map(tasks, task => (
      <li
        key={task.id}
        className={`b-story-card__list-item b-story-card__list-item--${choseColor(task.priority)}`}
        onDoubleClick={() => onClickTask(task)}
      >{task.name}</li>
      ))}
  </ul>
);

TasksList.propTypes = propTypes;

const mapStateToProps = state => ({
  stories: state.backlog.stories,
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  onClickTask(task) {
    dispatch(TaskModalActions.openTaskModal(task));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TasksList);
