/**
 * Created by Zerk on 24-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Event from './Event';
import './styles.scss';
import { setDatePickerVisibility, setDatePickerDate } from '@/actions/SprintActions';

const propTypes = {};

const SprintEvents = props => {
  console.log('props.events', props.events);
  const events = [
    { name: 'Sprint start', date: moment(props.events.start, 'x'), visible: props.events.startVisible },
    { name: 'Sprint finish', date: moment(props.events.finish, 'x'), visible: props.events.finishVisible },
    { name: 'Demo start', date: moment(props.events.demoStart, 'x'), visible: props.events.demoStartVisible },
    { name: 'Demo finish', date: moment(props.events.demoFinish, 'x'), visible: props.events.demoFinishVisible },
  ];
  return (
    <ul className="b-sprint-events">
      {events.map((event, index) => (
        <Event
          key={event.name}
          name={event.name}
          date={event.date}
          visible={event.visible}
          setVisible={(visible) => {
            props.setVisibility(index, visible);
          }}
          changeDate={(newDate) => {
            props.setDate(index, newDate);
          }}
        />
      ))}
    </ul>
  );
};

SprintEvents.propTypes = propTypes;

const mapStateToProps = state => ({
  events: state.sprints.inPlanning.events,
});

const mapDispatchToProps = dispatch => ({
  setVisibility: (datePickerId, visible) => {
    dispatch(setDatePickerVisibility(datePickerId, visible));
  },
  setDate: (datePickerId, newDate) => {
    dispatch(setDatePickerDate(datePickerId, newDate));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SprintEvents);
