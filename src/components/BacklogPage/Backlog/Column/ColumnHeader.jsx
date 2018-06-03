/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import * as EpicActions from '@/actions/EpicActions';
import * as StoryActions from '@/actions/StoryActions';
import * as TaskActions from '@/actions/TaskActions';
import * as SprintActions from '@/actions/SprintActions';
import EpicCard from '../EpicCard';


const propTypes = {
  epic: PropTypes.shape().isRequired,
  onDeleteEpic: PropTypes.func.isRequired,
  onEditEpic: PropTypes.func.isRequired,
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  epicIdx: PropTypes.number.isRequired,
};

const ColumnHeader = ({ epic, epicIdx, onDeleteEpic, onEditEpic, stories }) => (
  <header className="b-backlog__column-head" >
    <EpicCard
      epic={epic}
      onDeleteEpic={onDeleteEpic}
      onEditEpic={onEditEpic}
      stories={stories}
      epicIdx={epicIdx}
    />
  </header>
);

ColumnHeader.propTypes = propTypes;


const mapStateToProps = state => ({
  stories: state.backlog.stories,
  tasks: state.backlog.tasks,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  onEditEpic(id, isBeingEdited, value) {
    if (value) {
      dispatch(EpicActions.editEpic(id, isBeingEdited, value));
    } else {
      dispatch(EpicActions.editEpic(id, isBeingEdited, null));
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps,
  ...dispatchProps,
  // When deleting whole epic, first we need to delete every story that is attached to it
  // Then we have to clean up all tasks attached to those stories
  // Next step is to clean up sprint stories ID's array
  onDeleteEpic(id, storyIds) {
    const dispatch = dispatchProps.dispatch;

    forEach(storyIds, (storyId) => {
      const story = find(stateProps.stories, x => x.id === storyId);
      dispatch(TaskActions.cleanUpTasks(story.tasks));
    });

    dispatch(SprintActions.cleanUpSprint(storyIds));
    dispatch(StoryActions.cleanUpStories(storyIds));
    dispatch(EpicActions.deleteEpic(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ColumnHeader);
