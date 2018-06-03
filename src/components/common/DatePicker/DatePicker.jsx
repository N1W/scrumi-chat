import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import uuid from 'uuid';
import onClickOutside from 'react-onclickoutside';

import DatePickerCell from './DatePickerCell/DatePickerCell';
import TimePicker from './TimePicker/TimePicker';

import './DatePicker.scss';

/**
 * Creates calendar cells with the days of week
 * @param props
 * @returns {ReactElement} Line with the days of week (Su, Mo, Tu, We, Th, Fr, St)
 */
function DaysOfWeek(props) {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  return (
    <ul className="date-picker__grid date-picker_week-days">
      {_.map(days, (weekDay, i) => {
        const className = `${props.className}__week-day${i === 6 ? ` ${props.className}_sunday-day` : ''}`;
        return (<li
          key={uuid()}
          className={className}
        >{weekDay}
        </li>);
      })}
    </ul>
  );
}

DaysOfWeek.propTypes = {
  className: PropTypes.string.isRequired,
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
        /**
         *
         * @type {{visible: boolean, showTime: Boolean, selectedDate, shownMonth: string}}
         */
    this.state = {
      visible: true,
      showTime: this.props.showTime,
      selectedDate: props.selectedDate,
      selectedTime: props.selectedDate.format('kk:mm'),
      shownMonth: props.selectedDate.format('MM.YYYY'),
    };
    moment.locale('ru');
    this.changeMonth = this.changeMonth.bind(this);
    this.selectDate = this.selectDate.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleClickOutside(evt) {
    this.props.handleClickOutside();
  }

  createDateArray(month = moment().format('MM.YYYY')) {
    let dateArr = [],
      date = moment(month, 'MM.YYYY'),
      start = date.startOf('month').subtract(date.startOf('month').day() - 1, 'days'),
      cellDate = moment(start);

    _.times(42, () => {
      dateArr.push(moment(cellDate));
      cellDate.add(1, 'd');
    });
    return dateArr;
  }

  changeMonth(diff) {
    this.setState(() => {
      const newMonth = moment(this.state.shownMonth, 'MM.YYYY');
      newMonth.add(diff, 'month');
      return {
        shownMonth: newMonth.format('MM.YYYY'),
      };
    });
  }

  selectDate(newValue) {
    const newDate = moment(newValue);
    this.setState({
      selectedDate: moment(this.state.selectedDate)
                .year(newDate.year())
                .month(newDate.month())
                .date(newDate.date()),
    });
    if (typeof this.props.handleSelect === 'function') {
      this.props.handleSelect(moment(newDate));
    }
  }

  handleTimeChange(value) {
    if (value.length > 5) {
      return;
    }
    if (value.length === 0) {
      this.props.handleTimeChange(this.state.selectedDate, false);
    }
    this.setState({
      ...this.state,
      selectedTime: value,
    });
    if (moment(value, 'kk:mm').isValid()) {
      let newTime = moment(value, 'kk:mm');
      this.props.handleTimeChange(moment(this.state.selectedDate)
        .hour(newTime.hour()).minute(newTime.minute()), true);
    }
  }

  render() {
    const items = _.map(this.createDateArray(this.state.shownMonth), cellDate => (<DatePickerCell
      key={uuid()}
      className={this.props.className}
      cellDate={moment(cellDate)
                    .hour(this.state.selectedDate.hour())
                    .minute(this.state.selectedDate.minute())
                }
      shownMonth={this.state.shownMonth}
      selectedDate={this.state.selectedDate}
      handleClick={this.selectDate}
    />));
    return (
      <div
        className={this.props.className}
        onClick={this.props.stopPropagation}
      >
        <div className={`${this.props.className}__nav`}>
          <span
            className={`${this.props.className}__prev`}
            onClick={this.changeMonth.bind(null, -1)}
          >

                    </span>
          <span className={`${this.props.className}__date`}>{moment(this.state.shownMonth, 'MM.YYYY').format('MMMM YYYY')}</span>
          <span
            className={`${this.props.className}__next`}
            onClick={this.changeMonth.bind(null, 1)}
          >

                    </span>
        </div>
        <DaysOfWeek className={this.props.className} />
        <ul className={`${this.props.className}__grid`}>
          {items}
        </ul>
        {!this.props.disableTime && <TimePicker
          saveTimeChange={this.props.handleTimeChange}
          handleTimeChange={this.handleTimeChange}
          selectedTime={this.props.showTime ? this.state.selectedTime : false}
        />}
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: PropTypes.string.isRequired,
  selectedDate: PropTypes.shape().isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleClickOutside: PropTypes.func.isRequired,
  handleTimeChange: PropTypes.func.isRequired,
  disableTime: PropTypes.bool.isRequired,
  showTime: PropTypes.bool.isRequired,
};

DatePicker.defaultProps = {
  className: 'date-picker',
  selectedDate: moment(),
  disableTime: false,
  showTime: true,
};

export default onClickOutside(DatePicker);
