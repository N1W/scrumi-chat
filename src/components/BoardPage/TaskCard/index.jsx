import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as TaskModalActions from '@/actions/TaskModalActions';

import './styles.scss';

const propTypes = {
  task: PropTypes.shape().isRequired,
  openTaskModal: PropTypes.func.isRequired,
};

const TaskCard = ({ task, openTaskModal }) => (
  <div className="b-task-card b-task-card--green" onDoubleClick={() => openTaskModal(task)}>
    <p className="b-task-card__text">{task.name}</p>
    <footer className="b-task-card__footer">
      <img src="https://placeimg.com/50/50/people" className="b-task-card__ava" alt="stuff" />
      <div className="b-task-card__info">
        <p className="b-task-card__points">{task.points}</p>
        <p className="b-task-card__deadline">{task.deadline}</p>
      </div>
    </footer>
  </div>
  );

TaskCard.propTypes = propTypes;

const mapDispatchToProps = (dispatch, ownProps) => ({
  openTaskModal(task) {
    dispatch(TaskModalActions.openTaskModal(task));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(TaskCard);
