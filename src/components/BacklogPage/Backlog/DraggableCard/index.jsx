/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import filter from 'lodash/filter';
import * as StoryActions from '@/actions/StoryActions';
import * as SprintActions from '@/actions/SprintActions';
import * as StoryModalActions from '@/actions/StoryModalActions';
import StoryCard from '@/components/common/StoryCard';
import ItemTypes from '../ItemTypes';


const propTypes = {
  story: PropTypes.shape().isRequired,
  onMove: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const storySource = {
  beginDrag(props) {
    return { id: props.story.id };
  },
};

const storyTarget = {
  hover(targetProps, monitor) {
    const targetId = targetProps.story.id;
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (sourceId !== targetId) {
      targetProps.onMove(sourceId, targetId);
    }
  },
};

const Story = ({
                 story,
                 epicId,
                 onMove,
                 onSelect,
                 tasks,
                 canSelect,
                 connectDragSource,
                 connectDropTarget,
                 isDragging,
                 isOver,
                 onShowStoryModal,
}) => {
  const onHandleSelect = () => {
    if (canSelect) {
      onSelect(story.id);
    }
  };

  return compose(connectDragSource, connectDropTarget)(
    <div
      style={{
        opacity: isDragging || isOver ? 0 : 1,
        boxShadow: story.isSelected ? '0 0 3px 3px rgba(0, 0, 0, 0.3)' : '',
      }}
    >
      <StoryCard
        story={story}
        tasks={tasks}
        onShowStoryModal={onShowStoryModal}
        onSelect={onHandleSelect}
      />
    </div>,
  );
};

Story.propTypes = propTypes;

const isInSprint = (storyId, idList) => idList.includes(storyId);

const filterTasksById = (allTasks, taskIds = []) =>
  filter(allTasks, task => taskIds.includes(task.id));

const mapStateToProps = (state, ownProps) => ({
  state,
  storiesInPlanning: state.sprints.inPlanning.stories,
  tasks: filterTasksById(state.backlog.tasks, ownProps.story.tasks),
  canSelect: state.sprints.inPlanning.isBeingPlanned,
  sprintInPlanning: state.sprints.inPlanning.isBeingPlanned,
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSelect(id) {
    const dispatch = dispatchProps.dispatch;
    const storiesInPlanning = stateProps.storiesInPlanning;
    const currentStory = ownProps.story;
    const isInPlanningSprint = storiesInPlanning.includes(currentStory.id);

    // Проверяем находится ли история на которую кликнули в списке историй планируемого спринта
    // и ремуваем только если выбрана и в открытом спринте
    // в противном случае добавляем
    if (currentStory.isSelected && isInPlanningSprint) {
      dispatch(SprintActions.removeFromSprint(id));
      dispatch(StoryActions.setSelectedState(id, false));
    } else if (!currentStory.isSelected) {
      dispatch(SprintActions.addToSprint(id));
      dispatch(StoryActions.setSelectedState(id, true));
    }
  },
  onShowStoryModal(story, tasks) {
    const state = stateProps.state;
    // когда история не находится в запланированном и текущем спринте, то её
    // нельзя редактировать через модальное окно
    // и спринт не находится в состоянии редактирования
    const sprints = [
      state.sprints.current,
      ...state.sprints.planned,
    ];
    const idList = flow(
      map(sprint => sprint.stories),
      flatten,
    )(sprints);
    const canBeOpened = !isInSprint(story.id, idList);

    if (canBeOpened) {
      dispatchProps.dispatch(StoryModalActions.showStoryModal(ownProps.epicId, story, tasks));
    }
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  DragSource(ItemTypes.CARD, storySource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.CARD, storyTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })),
)(Story);
