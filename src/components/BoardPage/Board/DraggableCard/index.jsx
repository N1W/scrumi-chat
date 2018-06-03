/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import TaskCard from '../../TaskCard';

const propTypes = {
  task: PropTypes.shape().isRequired,
  onMove: PropTypes.func.isRequired,
};

const storySource = {
  beginDrag(props) {
    return { id: props.task.id };
  },
};

const storyTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.task.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove(sourceId, targetId);
    }
  },
};

const Task = ({
  task,
  onMove,
  connectDragSource,
  connectDropTarget,
  isDragging,
  isOver,
}) => compose(connectDragSource, connectDropTarget)(
  <div
    style={{ opacity: isDragging || isOver ? 0 : 1 }}
  >
    <TaskCard task={task} />
  </div>,
  );

Task.propTypes = propTypes;

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default compose(
  connect(null, mapDispatchToProps),
  DragSource(ItemTypes.CARD, storySource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.CARD, storyTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(Task);
