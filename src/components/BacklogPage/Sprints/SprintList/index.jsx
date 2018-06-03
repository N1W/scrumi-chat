/**
 * Created by Zerk on 30-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import * as SprintActions from '@/actions/SprintActions';
import * as BoardActions from '@/actions/BoardActions';
import * as StoryActions from '@/actions/StoryActions';
import Sprint from './Sprint';
import './styles.scss';


const propTypes = {
  currentSprint: PropTypes.shape().isRequired,
  plannedSprints: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteSprint: PropTypes.func.isRequired,
};

const SprintList = ({ currentSprint, plannedSprints, onDeleteSprint }) => (
  <div className="sprints">
    {currentSprint.isActive &&
      <Sprint
        sprint={currentSprint}
        active
        onDelete={() => { onDeleteSprint(currentSprint.id, currentSprint.isActive); }}
      />}
    {map(plannedSprints, sprint => (
      <Sprint
        key={sprint.id}
        sprint={sprint}
        onDelete={() => { onDeleteSprint(sprint.id, sprint.isActive); }}
      />
      ))}
  </div>
);

SprintList.propTypes = propTypes;

const mapStateToProps = state => ({
  state,
  currentSprint: state.sprints.current,
  plannedSprints: state.sprints.planned,
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onDeleteSprint(id, isCurrent) {
    const dispatch = dispatchProps.dispatch;
    const state = stateProps.state;

    if (isCurrent) {
      forEach(stateProps.currentSprint.stories, (storyId) => {
        dispatch(StoryActions.setSelectedState(storyId, false));
      });
      dispatch(SprintActions.deleteSprint(id, isCurrent));
      dispatch(BoardActions.resetBoard());
    } else {
    //  найти в planned спринт с id, у него взять все истории и вызвать selectedstate, после чего
      // удалить спринт
      const sprintToDelete = find(state.sprints.planned, sprint => sprint.id === id);

      forEach(sprintToDelete.stories, (storyId) => {
        dispatch(StoryActions.setSelectedState(storyId, false));
      });

      dispatch(SprintActions.deleteSprint(id, isCurrent));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SprintList);
