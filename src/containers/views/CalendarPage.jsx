import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';


import CalendarNav from 'components/Calendar/CalendarNav/CalendarNav';
import Month from 'components/Calendar/Month/Month';
import EventWindow from 'components/Calendar/EventWindow/EventWindow';
import { editEvent, updateStore } from '@/actions/Calendar/eventActions';


function createEventMap(eventArray) {
  const eventMap = new Map();
  _.forEach(eventArray, (item) => {
    _.times(item.end.diff(item.start, 'days') + 1, (index) => {
      const dayIndex = moment(item.start).add(index, 'days').format('DD.MM.YYYY');
      const dayEventArray = eventMap.has(dayIndex) ? eventMap.get(dayIndex) : [];
      dayEventArray.splice(_.sortedIndexBy(dayEventArray, item, 'start'), 0, item);
      eventMap.set(dayIndex, dayEventArray);
    });
  });
  return eventMap;
}

function getSprint(eventArray) {
  const sprint = _.filter(eventArray, ['type', 4]);
  return (sprint.length > 0) ? sprint[0] : false;
}

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fromDate: moment(),
      // isOpenModal: true,
      editEventWindow: false,
      newEvent: true,
      newType: 0,
      newEventStartDate: moment(),
      validateOnShow: false,
      assign: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.switchMonth = this.switchMonth.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
    this.createOrEditEventWindow = this.createOrEditEventWindow.bind(this);
    this.handleNewEvent = this.handleNewEvent.bind(this);
  }

  componentWillMount() {
    fetch('/ajax/calendar', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => response.json())
      .then((result) => {
        this.props.updateStore(result);
      })
      .catch((error) => {
        console.log('Fatal error', error);
      });
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleSelect(newDate) {
    this.setState({
      fromDate: moment(newDate),
    });
  }

  switchMonth(period) {
    this.setState({
      fromDate: this.state.fromDate.add(period, 'month'),
    });
  }

  handleEventClick(event, validateOnShow = false) {
    this.setState({
      ...this.state,
      selectedEvent: event,
      newEvent: false,
      editEventWindow: true,
      validateOnShow,
    });
  }

  handleHide() {
    this.setState({
      editEventWindow: false,
      selectedEvent: null,
    });
  }

  handleNewEvent(type, eventDate) {
    this.setState({
      newEvent: true,
      newType: type,
      editEventWindow: true,
      newEventStartDate: eventDate || moment(),
      assign: type === 4 ? 2 : 0,
    });
  }

  createOrEditEventWindow(newEvent) {
    return newEvent ?
      <EventWindow
        className="c-event-window"
        newEventDate={this.state.newEventStartDate.minute() < 30 ?
          this.state.newEventStartDate.startOf('hour').add(30, 'm') :
          this.state.newEventStartDate.add(30, 'm').startOf('hour')}
        newType={this.state.newType}
        handleHide={this.handleHide}
        validateOnShow={false}
        assign={this.state.assign}
      /> :
      <EventWindow
        className="c-event-window"
        event={this.state.selectedEvent}
        handleHide={this.handleHide}
        validateOnShow={this.state.validateOnShow}
      />;
  }

  render() {
    const sprint = {
      events: this.props.events,
      sprintStart: this.props.sprintStart,
      sprintEnd: this.props.sprintEnd,
    };
    return (
      <div className="calendar">
        <CalendarNav
          period={this.state.fromDate}
          switchMonth={this.switchMonth}
          onCloseModal={this.toggleModal}
          //          handleSaveEvent={this.props.addEvent}
          handleCreateEvent={this.handleNewEvent}
          editEventWindow={this.state.editEventWindow}
        />

        <Month
          period={this.state.fromDate}
          eventMatrix={createEventMap(this.props.events.events)}
          events={this.props.events.events}
          handleEventClick={this.handleEventClick}
          handleNewEvent={this.handleNewEvent}
          startSprint={this.props.sprintStart}
          endSprint={this.props.sprintEnd}
          editEvent={this.props.editEvent}
          sprint={this.props.sprint}
        />
        {this.state.editEventWindow &&
        this.createOrEditEventWindow(this.state.newEvent)
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.events,
  sprint: getSprint(state.events.events),
  sprintStart: getSprint(state.events.events) ? getSprint(state.events.events).start : null,
  sprintEnd: getSprint(state.events.events) ? getSprint(state.events.events).end : null,
});

const mapDispatchToProps = dispatch => ({
  editEvent: (event) => {
    dispatch(editEvent(event));
  },
  updateStore: (response) => {
    dispatch(updateStore(response));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

