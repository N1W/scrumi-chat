/**
 * Created by Zerk on 24-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import forEach from 'lodash/forEach';
import * as SprintActions from '@/actions/SprintActions';
import * as StoryActions from '@/actions/StoryActions';
import moment from 'moment';
import { addEvent, editEvent, deleteEvent } from '@/actions/Calendar/eventActions';
import { request } from '@/components/Calendar/CalendarRequest';
import SprintHeader from '../SprintHeader';
import SprintEvents from '../SprintEvents';
import SprintStories from '../SprintStories';
import SprintControls from '../SprintControls';
import './styles.scss';


const filterStoriesById = (allStories, storyIds = []) =>
  storyIds.map(id =>
    allStories[allStories.findIndex(story =>
      story.id === id)]).filter(story => story);

const mapStateToProps = state => ({
  state,
  stories: filterStoriesById(
    state.backlog.stories,
    state.sprints.inPlanning.stories,
  ),
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onCancelPlaning() {
    forEach(stateProps.stories, story =>
      dispatchProps.dispatch(StoryActions.setSelectedState(story.id, false)),
    );
    dispatchProps.dispatch(SprintActions.cancelSprintPlanning());
  },
  onFinishPlanning() {
    const newSprint = {
      start: moment(stateProps.state.sprints.inPlanning.events.start, 'x'),
      end: moment(stateProps.state.sprints.inPlanning.events.finish, 'x'),
      type: 4,
      assign: 2,
      title: 'Спринт',
      description: 'Спринт',
      location: '',
    };
    const reqObj = {
      ...newSprint,
      start: moment(newSprint.start).valueOf(),
      end: moment(newSprint.end).valueOf(),
    };

    request(reqObj, 'create')
      .then(() => {
        dispatchProps.dispatch(addEvent({ ...newSprint, id: reqObj.id }));
      });

    dispatchProps.dispatch(SprintActions.finishSprintPlanning(
      stateProps.state.sprints.inPlanning.stories,
      stateProps.state.sprints.inPlanning.events,
    ));
    if (!stateProps.state.sprints.current.isActive) {
      dispatchProps.dispatch(SprintActions.setCurrentSprint(moment().valueOf()));
    }
  },
  onRemoveFromSprint(id) {
    dispatchProps.dispatch(SprintActions.removeFromSprint(id));
    dispatchProps.dispatch(StoryActions.setSelectedState(id, false));
  },
});

@connect(mapStateToProps, mapDispatchToProps, mergeProps)
export default class PlanSprint extends Component {
  static propTypes = {
    onCancelPlaning: PropTypes.func.isRequired,
    onFinishPlanning: PropTypes.func.isRequired,
    onRemoveFromSprint: PropTypes.func.isRequired,
    stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const {
      stories,
      onRemoveFromSprint,
      onCancelPlaning,
      onFinishPlanning,
    } = this.props;

    return (
      <section className="b-sprint-start">
        <SprintHeader count={stories.length} />
        <div className="b-sprint-start__body">
          <SprintEvents />
          <SprintStories
            stories={stories}
            onRemoveFromSprint={onRemoveFromSprint}
          />
          <SprintControls
            onFinish={onFinishPlanning}
            onCancel={onCancelPlaning}
          />
        </div>
      </section>
    );
  }
}
