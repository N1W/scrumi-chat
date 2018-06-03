/* eslint-disable no-shadow */
/**
 * Created by Zerk on 17-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DropTarget } from 'react-dnd';
import * as EpicActions from '@/actions/EpicActions';
import * as StoryActions from '@/actions/StoryActions';
import * as TaskActions from '@/actions/TaskActions';
import * as SprintActions from '@/actions/SprintActions';
import * as StoryModalActions from '@/actions/StoryModalActions';
import ItemTypes from '../ItemTypes';
import ColumnHeader from './ColumnHeader';
import Stories from './Stories';
import RoundButton from '../../../common/RoundButton/index';
import './styles.scss';

const propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onMoveToEpic: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  epic: PropTypes.shape().isRequired,
  epicIdx: PropTypes.number.isRequired,
};

const storyTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if (!targetProps.epic.stories.length) {
      targetProps.onMoveToEmptyEpic(targetProps.epic.id, sourceId);
    }
  },
};

const Column = ({
  epic,
  epicIdx,
  stories,
  onMoveToEpic,
  connectDropTarget,
  onMoveToEmptyEpic,
  onShowStoryModal,
}) => connectDropTarget(
  <div className="b-backlog__column">
    <ColumnHeader epic={epic} epicIdx={epicIdx} />
    <Stories
      stories={stories}
      onMove={onMoveToEpic}
      epicId={epic.id}
    />
    <RoundButton onClick={() => { onShowStoryModal(); }} />
  </div>,
);

Column.propTypes = propTypes;

const filterStoriesById = (allStories, storyIds = []) =>
  storyIds.map(id =>
    allStories[allStories.findIndex(story =>
      story.id === id)]).filter(story => story);

const mapStateToProps = (state, ownProps) =>
  // тут поидее надо как-то проверять включена ли история в спринт
  // только в тот что эдитится
  // const stories = filterStoriesById(state.backlog.stories, ownProps.epic.stories);
   // if (state.sprint.isActive) {
  //   return {
  //     stories: filter(stories, story => !state.sprint.stories.includes(story.id)),
  //   };
  // }

   ({
     stories: filterStoriesById(state.backlog.stories, ownProps.epic.stories),
   });

const mapDispatchToProps = (dispatch, ownProps) => ({
  onDeleteStory(id, taskIds) {
    dispatch(EpicActions.detachFromEpic(ownProps.epic.id, id));
    dispatch(SprintActions.removeFromSprint(id));
    dispatch(TaskActions.cleanUpTasks(taskIds));
    dispatch(StoryActions.deleteStory(id));
  },
  onMoveToEpic(sourceId, targetId) {
    dispatch(EpicActions.moveToEpic(sourceId, targetId));
  },
  onMoveToEmptyEpic(epicId, storyId) {
    dispatch(EpicActions.attachToEpic(epicId, storyId));
  },
  onShowStoryModal(story, tasks) {
    dispatch(StoryModalActions.showStoryModal(ownProps.epic.id, story, tasks));
  },
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DropTarget(ItemTypes.CARD, storyTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
)(Column);
