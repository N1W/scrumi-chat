import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';
import 'moment/locale/ru';

import DateTimeSpan from 'components/common/DateTimeSpan/DateTimeSpan';
import ModalWindow from 'components/common/ModalWindow/ModalWindow';
import TypeEvent from 'components/Calendar/TypeEvent/TypeEvent';
import ErrorQuestion from 'components/common/ErrorQuestion/ErrorQuestion';
import { request } from '../CalendarRequest';
import { addEvent, editEvent, deleteEvent } from '@/actions/Calendar/eventActions';
import Button from 'components/Calendar/Button/Button';
import './EventWindow.scss';

import EventValidator from '../EventValidator/EventValidator';

class EventWindow extends React.Component {
  constructor(props) {
    super(props);

    moment.locale('ru');
    this.eventDurations = [60, 15, 60, 60, 24 * 7 * 60];
    this.state = {
      isModified: false,
      event: this.props.event ? this.props.event : {},
      type: this.props.event ? this.props.event.type : this.props.newType,
      assign: this.props.event ? this.props.event.assign : this.props.assign,
      start: this.props.event ?
        this.props.event.start :
        this.props.newEventDate,
      end: this.props.event ?
        this.props.event.end :
        moment(this.props.newEventDate).add(this.eventDurations[this.props.newType], 'm'),
      duration: this.eventDurations[this.props.event ? this.props.event.type : 0],
      eventTypeVisible: false,
      questionVisible: false,
      startDateVisible: false,
      endDateVisible: false,
      text: '',
      className: '',
      func: '',
      check: [],
    };
    // console.log('duration in constructor', this.state.duration);

    this.findAssign = {
      '001': 0,
      '000': 2,
      '010': 1,
      '011': 0,
      '100': 2,
      '101': 1,
      '111': 0,
      '110': 0,
      '200': 2,
      '201': 1,
      '211': 0,
      '210': 2,
    };

    this.types = ['Событие', 'Стендап', 'Демо', 'Ретро', 'Спринт'];
    // this.defaultLength = [60, 15, 60, 60, 60, 7*24*60];

    this.handleSave = this.handleSave.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleChangeAllDay = this.handleChangeAllDay.bind(this);
    this.handleClickEventType = this.handleClickEventType.bind(this);
    this.handleChangeEventType = this.handleChangeEventType.bind(this);
    this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    this.showError = this.showError.bind(this);
    this.hide = this.hide.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
  }

  componentDidMount() {
    if (this.props.validateOnShow) {
      const newEvent = {
        ...this.state.event,
        id: this.state.event.id,
        title: this.eventTitle.value,
        start: this.state.start,
        end: this.state.end,
        description: this.eventDescription.value,
        location: this.eventLocation.value,
        assign: this.state.assign,
        type: this.state.type,
      };

      const validation = EventValidator(
        newEvent,
        this.props.events);
      if (!validation.pass) {
        this.showError(validation.error, validation.class);
      }
    }
  }

  handleSave() {
    const newEvent = {
      ...this.state.event,
      id: this.state.event.id,
      title: this.eventTitle.value,
      start: this.state.start,
      end: this.state.end,
      description: this.eventDescription.value,
      location: this.eventLocation.value,
      assign: this.state.assign,
      type: this.state.type,
    };

    const validation = EventValidator(newEvent, this.props.events);
    if (!validation.pass) {
      this.showError(validation.error, validation.class);
      return;
    }
    // console.log('EVENT', this.state.event);

    // transform newEvent before send to server
    const reqObj = {
      ...newEvent,
      start: moment(newEvent.start).valueOf(),
      end: moment(newEvent.end).valueOf(),
    };

    if (this.state.event.id) {
      request(reqObj, 'update')
        .then(() => {
          this.props.editEvent(newEvent);
        });
    } else {
      request(reqObj, 'create')
        .then(() => {
          this.props.addEvent({ ...newEvent, id: reqObj.id });
        });
    }
    this.props.handleHide();
  }

  handleChangeStartDate(newDate, showTime) {
    const newAssign = `${this.state.assign.toString()}0${showTime ? '1' : '0'}`;
    // console.log('newAssign in startDate', newAssign);
    this.setState({
      ...this.state,
      start: newDate,
      end: moment(newDate).add(this.state.duration, 'm'),
      assign: this.findAssign[newAssign],
      startDateVisible: true,
    });
  }

  handleChangeEndDate(newDate, showTime) {
    const newAssign = `${this.state.assign.toString()}1${showTime ? '1' : '0'}`;
    // console.log('newAssign in endDate', newAssign);
    this.setState({
      ...this.state,
      end: newDate,
      assign: this.findAssign[newAssign],
      endDateVisible: true,
    });
  }

  hideDatePicker(date) {
    const dateType = ['startDateVisible', 'endDateVisible'];
    this.setState({
      ...this.state,
      [dateType[date]]: false,
    });
  }

  showDatePicker(date) {
    const dateType = ['startDateVisible', 'endDateVisible'];
    this.setState({
      ...this.state,
      [dateType[date]]: true,
    });
  }

  handleChangeAllDay(e) {
    // console.log('duration', this.state.duration);
    if (e.target.checked) {
      this.setState({
        ...this.state,
        assign: 2,
      });
    } else {
      this.setState({
        ...this.state,
        assign: 0,
        end: moment(this.state.start).add(this.eventDurations[this.state.type], 'm'),
      });
    }
    // const newState = this.state;
    // newState.assign = e.target.checked ? 2 : 0;
    // this.setState(newState);
  }

  handleClickEventType() {
    this.setState({
      eventTypeVisible: !this.state.eventTypeVisible,
    });
  }

  handleChangeEventType(type) {
    const newState = {
      type,
      eventTypeVisible: false,
    };
    // if (type) {
    newState.end = moment(this.state.start).add(this.eventDurations[type], 'm');
    // }

    if (type === 4) {
      newState.assign = 2;
      this.allDayCheckbox.disabled = true;
    } else {
      this.allDayCheckbox.disabled = false;
      newState.assign = 0;
    }
    this.setState(newState);
  }

  handleDeleteEvent() {
    // console.log('delete event with id', this.state.event.id);
    request({ id: this.state.event.id }, 'delete')
      .then(() => {
        this.props.deleteEvent(this.state.event.id);
      });
    this.props.handleHide();
  }
  showError(massage, mod, handler) {
    this.setState(prevState => ({
      questionVisible: true,
      text: massage,
      className: mod,
      func: handler,
      check: [...this.state.check, {
        ...this.state.event,
        id: this.state.event.id,
        title: this.eventTitle.value,
        start: this.state.start,
        end: this.state.end,
        description: this.eventDescription.value,
        location: this.eventLocation.value,
        assign: this.state.assign,
        type: this.state.type,
      }],
    }), function () {
      _.isEqual(this.state.check[this.state.check.length - 1], this.state.check[this.state.check.length - 2]) ? handler() : null;
    });
  }

  hide() {
    this.setState({
      questionVisible: false,
    });
  }

  render() {
    // console.log('this.state', this.state);
    const title = (
      <input
        type="text"
        className={`${this.props.className}__event-title`}
        placeholder="Название события"
        defaultValue={this.props.event ? this.props.event.title : ''}
        ref={(input) => { this.eventTitle = input; }}
        maxLength="50"
      />
    );
    const type = (
      <div className={`${this.props.className}__types`}>
        <button
          className={`${this.props.className}__event-type`}
          onClick={this.handleClickEventType}
        >
          {this.state.eventTypeVisible ? 'Тип события' : this.types[this.state.type]}
        </button>
        {this.state.eventTypeVisible &&
          <TypeEvent
            types={[
              { title: 'Событие', key: 'custom' },
              { title: 'Стендап', key: 'standup' },
              { title: 'Демо', key: 'demo' },
              { title: 'Ретро', key: 'retro' },
              { title: 'Спринт', key: 'sprint' },
            ]}
            handleClick={this.handleClickEventType}
            onClick={this.handleChangeEventType}
            outsideClickIgnoreClass={'c-event-window__event-type'}
          />}
      </div>
    );

    const dateBlock = (<div className="date-block">
      <span className="date-block__title">Дата начала:</span>
      <DateTimeSpan
        date={this.state.start}
        className="date-block__date"
        handleChange={this.handleChangeStartDate}
        showTime={![2].includes(this.state.assign)}
        disableTime={[4].includes(this.state.type)}
        hideDatePicker={() => {
          this.hideDatePicker(0);
        }}
        showDatePicker={() => {
          this.showDatePicker(0);
        }}
        visible={this.state.startDateVisible}
      />
      <span className="date-block__title">Дата завершения:</span>
      <DateTimeSpan
        date={this.state.end}
        className="date-block__date"
        handleChange={this.handleChangeEndDate}
        showTime={this.state.assign === 0}
        disableTime={[4].includes(this.state.type)}
        hideDatePicker={() => {
          this.hideDatePicker(1);
        }}
        showDatePicker={() => {
          this.showDatePicker(1);
        }}
        visible={this.state.endDateVisible}
      />
      <input
        type="checkbox"
        name={`${this.props.className}__checkbox`}
        id={`${this.props.className}__checkbox`}
        className="date-block__checkbox"
        onChange={this.handleChangeAllDay}
        checked={this.state.assign === 2}
        ref={(input) => { this.allDayCheckbox = input; }}
      />
      <label htmlFor={`${this.props.className}__checkbox`}>Весь день</label>
    </div>
    );

    const infoBlock = (<div className="info">
      <span className="info__title">Описание</span>
      <textarea
        className="info__description"
        defaultValue={this.props.event ? this.props.event.description : ''}
        ref={(input) => { this.eventDescription = input; }}
      />
      <input
        type="text"
        className="info__location"
        placeholder="Место проведения"
        defaultValue={this.props.event ? this.props.event.location : ''}
        ref={(input) => { this.eventLocation = input; }}
      />
    </div>
      );

    const buttonBlock = (<div className="control">
      {this.state.event.id &&
      <button
        className="control__button control__button--delete"
        onClick={() => this.showError('Вы хотите удалить событие?', 'c-delete', this.handleDeleteEvent)}
      />
      }
      <button
        className=" button-red control__button control__button--cancel"
        onClick={() => this.showError('Вы хотите сохранить событие?', 'c-cancel', this.props.handleHide)}
      >
        Отмена
      </button>
      <button
        className=" button-green control__button control__button--save"
        onClick={this.handleSave}
      >
        Сохранить
        </button>
      {this.state.type === 3 &&
      <NavLink to="/retro" className="control__start">
          Начать ретро
        </NavLink>
        }
    </div>);

    return (
            // content
      <ModalWindow
        onCloseModal={() => this.showError('Вы хотите закрыть окно без сохранения?', 'c-close', this.props.handleHide)}
        className="c-event-window"
      >
        {title}
        {type}
        {dateBlock}
        {infoBlock}
        {buttonBlock}
        {this.state.questionVisible &&
        <ErrorQuestion
          text={this.state.text}
          className={this.state.className}
          onClick={this.state.func}
          handleClick={this.hide}
        />}
      </ModalWindow>

    );
  }
}

EventWindow.propTypes = {
  className: PropTypes.string.isRequired,
  newType: PropTypes.oneOf([0, 1, 2, 3, 4]),
  newEventDate: PropTypes.shape(),
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([0, 1, 2, 3, 4]).isRequired,
    assign: PropTypes.oneOf([0, 1, 2]).isRequired,
    start: PropTypes.shape.isRequired,
    end: PropTypes.shape.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
  handleHide: PropTypes.func.isRequired,
  validateOnShow: PropTypes.bool,
  // handleSaveEvent: PropTypes.func.isRequired,
  // handleDeleteEvent: PropTypes.func.isRequired,
};

EventWindow.defaultProps = {
  className: 'c-event-window',
  newType: 0,
  newEventDate: moment(),
  validateOnShow: false,
};

const mapStateToProps = state => ({
  events: state.events.events,
  startSprint: state.sprint.sprint.start,
  endSprint: state.sprint.sprint.end,
});

const mapDispatchToProps = dispatch => ({
  addEvent: (event) => {
    dispatch(addEvent(event));
  },
  editEvent: (event) => {
    dispatch(editEvent(event));
  },
  deleteEvent: (eventId) => {
    dispatch(deleteEvent(eventId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventWindow);
