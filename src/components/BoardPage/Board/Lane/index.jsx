/**
 * Created by Zerk on 27-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import map from 'lodash/map';
import * as BoardActions from '@/actions/BoardActions';
import * as TaskModalActions from '@/actions/TaskModalActions';
import RoundButton from '@/components/common/RoundButton';
import LaneHeader from './LaneHeader';
import DraggableCard from '../DraggableCard';
import ItemTypes from '../ItemTypes';
import './styles.scss';

const propTypes = {
  lane: PropTypes.shape().isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSprintActive: PropTypes.bool.isRequired,
  onMoveToLane: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  onOpenTaskModal: PropTypes.func.isRequired,
};

const storyTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.lane.tasks.length) {
      targetProps.onMoveToEmptyLane(targetProps.lane.id, sourceId);
    }
  },
};

const Lane = ({
  lane,
  tasks,
  onMoveToLane,
  connectDropTarget,
  isSprintActive,
  onOpenTaskModal,
}) => connectDropTarget(
  <section className="b-board__col">
    <LaneHeader name={lane.name} />
    <div className="b-board__col-body">
      {map(tasks, task => (
        <DraggableCard
          key={task.id}
          task={task}
          onMove={onMoveToLane}
        />
      ))}
    </div>
    {(lane.name === 'Todo' && isSprintActive)
      ? <RoundButton onClick={() => onOpenTaskModal({})} />
      : ''
    }
  </section>,
);

Lane.propTypes = propTypes;


const filterTasksById = (allTasks, taskIds = []) =>
  taskIds.map(id => allTasks[allTasks.findIndex(task => task.id === id)]).filter(task => task);

const mapStateToProps = (state, ownProps) => ({
  tasks: filterTasksById(state.backlog.tasks, ownProps.lane.tasks),
  isSprintActive: state.sprints.current.isActive && state.sprints.current.stories.length > 0,
});

const mapDispatchToProps = dispatch => ({
  onMoveToLane(sourceId, targetId) {
    dispatch(BoardActions.moveToLane(sourceId, targetId));
  },
  onMoveToEmptyLane(laneId, taskId) {
    dispatch(BoardActions.attachToLane(laneId, taskId));
  },
  onOpenTaskModal(task) {
    dispatch(TaskModalActions.openTaskModal(task));
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.CARD, storyTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(Lane);
