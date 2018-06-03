import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/ru';
import uuid from 'uuid';
import PropTypes from 'prop-types';


import './Month.scss';
import MonthCell from './MonthCell/MonthCell';
import Event from './../Event/Event';

const WeekDays = () => {
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  return (
    <div className="week">
      {_.map(days, day => (<span
        className="week__item"
        key={day}
      >
        {day}
      </span>))}
    </div>
  );
};

const propTypes = {
  period: PropTypes.shape().isRequired,
  eventMatrix: PropTypes.shape().isRequired,
  events: PropTypes.array.isRequired,
  handleEventClick: PropTypes.func.isRequired,
  handleNewEvent: PropTypes.func.isRequired,
  editEvent: PropTypes.func.isRequired,
  sprint: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape(),
  ]).isRequired,
};

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: this.props.period,
      showEventList: this.createEventListMatrix(this.props.period),
    };
    this.eventListVisible = false;
    this.skipClick = false;
    this.switchMonth = this.switchMonth.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
    this.createEventListMatrix = this.createEventListMatrix.bind(this);
    this.handleEventListHide = this.handleEventListHide.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
  }

  createEventListMatrix(date) {
    const eventListMatrix = new Map();
    let startDate = moment(date),
      endDate = moment(date);
    startDate = startDate.startOf('month').subtract(startDate.startOf('month').day() - 1, 'days');
    endDate = endDate.endOf('month').add(7 - endDate.endOf('month').days(), 'days');
    const diff = Math.round(moment.duration(endDate - startDate).asDays());
    const cellDate = startDate;
    _.times(diff, () => {
      eventListMatrix.set(moment(cellDate).format('DD.MM.YYYY'), false);
      cellDate.add(1, 'd');
    });

    return eventListMatrix;
  }

  switchMonth(period) {
    const newDate = this.state.now.add(period, 'month');

    this.setState({
      now: newDate,
      showEventList: createEventListMatrix(newDate),
    });
  }

  dateAdd(month) {
    let collection = [],
      start = moment(month).startOf('month').day() !== 0
                ? moment(month).startOf('month').subtract(moment(month).startOf('month').day() - 1, 'days')
                : moment(month).startOf('month').subtract(moment(month).startOf('month').day() + 6, 'days'),
      end = moment(month).endOf('month').day() !== 0
                ? moment(month).endOf('month').add(7 - moment(month).endOf('month').day(), 'days')
                : moment(month).endOf('month'),
      cellDate = start,
      diff = Math.round(moment.duration(end - start).asDays());

    _.times(diff, () => {
      collection.push(moment(cellDate));
      cellDate.add(1, 'd');
    });
    return collection;
  }

  handleCellClick(cellDate, visible) {
    if (this.skipClick) {
      this.skipClick = false;
      return;
    }

    if (!this.eventListVisible) {
      const eventListMatrix = this.createEventListMatrix(cellDate);
      eventListMatrix.set(cellDate.format('DD.MM.YYYY'), visible);
      this.setState({
        showEventList: eventListMatrix,
      });
      this.eventListVisible = visible;
    }
  }

  handleEventListHide(cellDate) {
    const eventListMatrix = this.createEventListMatrix(cellDate);
    eventListMatrix.set(cellDate.format('DD.MM.YYYY'), false);
    this.setState({
      showEventList: eventListMatrix,
    });
    this.eventListVisible = false;
    this.skipClick = true;
  }

  handleAddEvent(cellDate) {
    this.props.handleNewEvent(0, cellDate.hour(moment().hour()).minute(moment().minute()));
    this.handleEventListHide(cellDate);
    this.skipClick = true;
  }

  render() {
    // console.log('props in Month.jsx', this.props);
    const grid = _.map(this.dateAdd(this.state.now), (cell, i) => (<MonthCell
      month={this.state.now}
      key={cell.format('DD.MM.YYYY')}
      cellDate={cell}
      handleClick={this.handleCellClick}
      handleNewEvent={this.props.handleNewEvent}
      editEvent={this.props.editEvent}
      sprint={this.props.sprint}
      openEditEventWindow={this.props.handleEventClick}
      events={this.props.events}
      eventMatrix={this.props.eventMatrix}
      handleEventClick={this.props.handleEventClick}
    >
      {this.props.eventMatrix.has(cell.format('DD.MM.YYYY')) &&
                    _.map(this.props.eventMatrix.get(cell.format('DD.MM.YYYY')), event => (event.type !== 4 && <Event
                      key={uuid()}
                      className="c-event"
                      event={event}
                      handleClick={() => {
                        this.props.handleEventClick(event, false);
                      }}
                      hideTime={event.start.format('DD.MM.YYYY') !== cell.format('DD.MM.YYYY')}
                    />))
                      }
      {this.state.showEventList.get(cell.format('DD.MM.YYYY')) &&
      <MonthCell
        month={this.state.now}
        key={`eventList_${cell.format('DD.MM.YYYY')}`}
        cellDate={cell}
        className="c-date--event-list"
        canHide
        handleHide={this.handleEventListHide}
        amount="triangle--hide"
        editEvent={this.props.editEvent}
        sprint={this.props.sprint}
        openEditEventWindow={this.props.handleEventClick}
        events={this.props.events}
        eventMatrix={this.props.eventMatrix}
        handleEventClick={this.props.handleEventClick}
      >

        {this.props.eventMatrix.has(cell.format('DD.MM.YYYY')) &&
                        _.map(this.props.eventMatrix.get(cell.format('DD.MM.YYYY')), event => (event.type !== 4 && <Event
                          key={uuid()}
                          className="c-event"
                          event={event}
                          handleClick={() => {
                            this.props.handleEventClick(event, false);
                            this.handleEventListHide(cell);
                          }}
                          hideTime={event.start.format('DD.MM.YYYY') !== cell.format('DD.MM.YYYY')}
                        />))}
        <div
          className="circle-button-s"
          onClick={this.handleAddEvent.bind(null, cell)}
        >
          <button>
            <div className="cross-s"></div>
          </button>
        </div>
      </MonthCell>}
    </MonthCell>));

    return (
      <div>
        <WeekDays />
        <div className="c-work-space">
          {grid}
        </div>
      </div>

    );
  }
}

Month.propTypes = propTypes;

