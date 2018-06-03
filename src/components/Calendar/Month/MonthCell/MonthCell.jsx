/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import AmountEvent from 'components/Calendar/Month/AmountEvent/AmountEvent';
import TypeEvent from 'components/Calendar//TypeEvent/TypeEvent';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import uuid from 'uuid';
import { request } from '@/components/Calendar/CalendarRequest';
import Event from '@/components/Calendar/Event/Event';
import EventValidator from '../../EventValidator/EventValidator';
import './MonthCell.scss';

const ItemTypes = {
  EVENT: 'event',
};

const eventTarget = {
  drop(props, monitor) {
    const event = monitor.getItem().event;
    const cellDate = props.cellDate;

    // Don't replace items with themselves
    if (event.start.isSame(cellDate, 'days')) {
      return;
    }

    const newStart = moment(cellDate)
      .hour(event.start.hour())
      .minute(event.start.minute());
    const newEnd = moment(event.end)
      .add(newStart.diff(event.start, 'days'), 'days');
    const newEvent = {
      ...event,
      start: newStart,
      end: newEnd,
    };
    // console.log('props', props);
    // console.log('props.sprint.start', props.sprint.start);
    const validation = EventValidator(newEvent, props.events);
    // console.log('validation', validation);
    if (validation.pass) {
      const reqObj = {
        ...newEvent,
        start: moment(newEvent.start).valueOf(),
        end: moment(newEvent.end).valueOf(),
      };
      request(reqObj, 'update')
        .then(() => {
          props.editEvent(newEvent);
        });
    } else {
      // отображаем окно редактирования события с указанием ошибки
      props.openEditEventWindow(newEvent, true);
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

// @DropTarget(ItemTypes.EVENT, eventTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))

const propTypes = {
  cellDate: PropTypes.shape().isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  canHide: PropTypes.bool,
  handleHide: PropTypes.func,
  amount: PropTypes.string,
  editEvent: PropTypes.func.isRequired,
  openEditEventWindow: PropTypes.func.isRequired,
  sprint: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape(),
  ]).isRequired,
  events: PropTypes.array.isRequired,
  eventMatrix: PropTypes.shape().isRequired,
  handleEventClick: PropTypes.func.isRequired,
};

class MonthCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: 0,
    };
    this.serviceNamesEvent = ['standup', 'demo', 'retro', 'Стендап', 'Демо', 'Ретро'];

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.contextMenu = this.contextMenu.bind(this);
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleSelectEventType = this.handleSelectEventType.bind(this);
  }

  handleClickOutside(event) {
    if (this.props.canHide) {
      // console.log('click outside event list');
      this.props.handleHide(this.props.cellDate);
    }
  }

  handleContextMenu(event) {
    event.preventDefault();
    this.setState({ visible: true });
  }
  contextMenu(event) {
    event.preventDefault();
    this.setState({
      visible: !this.state.visible,
    });
  }
  handleClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  handleSelectEventType(type) {
    const newEventDate = moment().minute() < 30 ?
      moment(this.props.cellDate).hour(moment().hour()).minute(moment().minute()).startOf('hour').add(30, 'm') :
      moment(this.props.cellDate).hour(moment().hour()).minute(moment().minute()).add(30, 'm').startOf('hour');
    this.props.handleNewEvent(type, newEventDate);
    this.handleClick();
    // console.log('event', event);
    event.stopPropagation();
  }

  render() {
    // console.log('props in MonthCell.jsx', this.props);
    const { cellDate, editEvent, openEditEventWindow, sprint, connectDropTarget, isOver } = this.props;
    let className = `c-date__cell${this.props.className ? ` ${this.props.className}` : ''}`;
    className += this.props.cellDate.isSame(moment(), 'day') ? ' special special--today' : '';
    className += this.props.cellDate.isSame(moment(this.props.month), 'month') ? '' : ' other-month';
    className += (this.props.sprint && this.props.cellDate.isSame(this.props.sprint.start, 'day')) ?
      ' special special--deadline' : '';
    className += (this.props.sprint && this.props.cellDate.isSame(this.props.sprint.end, 'day')) ?
      ' special special--deadline' : '';

    // let sprintEvent = {};
    // if (this.props.cellDate.isSame(this.props.startSprint)) {
    //   sprintEvent = {
    //     id: 0,
    //     start: this.props.startSprint,
    //     end: this.props.endSprint,
    //     type: 4,
    //     assign: 2,
    //     title: 'старт',
    //     description: 'Начало спринта',
    //     location: '',
    //   }
    // }

    let dateClassName = 'date';
    dateClassName += (this.props.sprint && this.props.cellDate.isBetween(this.props.sprint.start.startOf('day'), this.props.sprint.end.endOf('day'), null, '[]')) ?
      ' sprint-duration' : '';
    const inputProps = {};
    if (typeof this.props.handleClick === 'function') {
      inputProps.onClick = this.props.handleClick.bind(null, this.props.cellDate, true);
    }
    return connectDropTarget(
      <div
        className={className}
        {...inputProps}
        onContextMenu={this.contextMenu}
      >
        <span className={dateClassName}>
          {this.props.cellDate.format('DD')}
        </span>
        {((this.props.sprint && this.props.cellDate.isSame(this.props.sprint.start, 'day')) ||
        (this.props.sprint && this.props.cellDate.isSame(this.props.sprint.end, 'day'))) &&
          <Event
            className={'sprint-deadline'}
            event={this.props.sprint}
            handleClick={() => {
              this.props.handleEventClick(this.props.sprint, false);
            }}
            hideTime
            startSprint={this.props.cellDate.isSame(this.props.sprint.start, 'day')}
          />
        }
        <div className="c-service">
          {this.props.eventMatrix.has(cellDate.format('DD.MM.YYYY')) &&
          _.map(this.props.eventMatrix.get(cellDate.format('DD.MM.YYYY')), event =>
            (event.type === 1 || event.type === 2 || event.type === 3 ?
              <span
                className={`c-service__item ${`c-service__item--${this.serviceNamesEvent[event.type - 1]}`}`}
                key={uuid()}
              >{this.serviceNamesEvent[event.type + 2]}</span> : null))}
        </div>
        <div className="c-event-list">
          {this.props.children}
        </div>
        {this.props.children[0].length > 2 ? <AmountEvent className={this.props.amount} /> : false}
        {this.state.visible &&
        <TypeEvent
          types={[
            { title: 'Событие', key: 'custom' },
            { title: 'Стендап', key: 'standup' },
            { title: 'Демо', key: 'demo' },
            { title: 'Ретро', key: 'retro' },
            { title: 'Спринт', key: 'sprint' },
          ]}
          handleClick={this.handleClick}
          onClick={this.handleSelectEventType}
        />}
      </div>,
    );
  }
}

MonthCell.propTypes = propTypes;

MonthCell.defaultProps = {
  canHide: false,
};

// const dndMonthCell = DragDropContext(HTML5Backend)(MonthCell);
// export default onClickOutside(dndMonthCell);
const clickOutsideMonthCell = onClickOutside(MonthCell);
const dndMonthCell = DropTarget(ItemTypes.EVENT, eventTarget, collect)(clickOutsideMonthCell);
export default DragDropContext(HTML5Backend)(dndMonthCell);
