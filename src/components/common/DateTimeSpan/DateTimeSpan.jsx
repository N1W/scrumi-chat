import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';

import DatePicker from 'components/common/DatePicker/DatePicker';
import './DateTimeSpan.scss';


class DateTimeSpan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTime: this.props.showTime,
      disableTime: this.props.disableTime,
      date: this.props.date,
      visible: this.props.visible,
    };

    this.dateFormat = ['DD MMMM YYYY HH:mm', 'DD MMMM YYYY'];
    moment.locale('ru');


    this.handleClick = this.handleClick.bind(this);
        // this.handleHide = this.handleHide.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showTime: nextProps.showTime,
      disableTime: nextProps.disableTime,
      date: nextProps.date,
      visible: false,
    });
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible,
    }, () => {
      if (!this.state.visible) {
        this.props.handleChange(this.state.date, this.state.showTime);
      }
    });
  }

  handleSelect(newDate) {
    this.setState({
      ...this.state,
      date: moment(newDate),
    });
    this.props.handleChange(newDate, this.state.showTime);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    const format = this.state.showTime ? this.dateFormat[0] : this.dateFormat[1];
    return (
      <span
        className={this.props.className}
        tabIndex="0"
//        onClick={this.handleClick}
        onClick={this.props.showDatePicker}
      >
        {this.state.date.format(format)}
        {this.props.visible &&
        <DatePicker
          selectedDate={moment(this.state.date)}
//          handleClickOutside={this.handleClick}
          handleClickOutside={this.props.hideDatePicker}
          handleSelect={this.handleSelect}
          handleTimeChange={this.props.handleChange}
          disableTime={this.state.disableTime}
          showTime={this.state.showTime}
          outsideClickIgnoreClass={'c-event-window__date-span'}
          stopPropagation={this.stopPropagation}
        />
                }
      </span>
    );
  }
}

DateTimeSpan.propTypes = {
  className: PropTypes.string.isRequired,
  date: PropTypes.shape().isRequired,
  handleChange: PropTypes.func.isRequired,
  showTime: PropTypes.bool.isRequired,
  disableTime: PropTypes.bool.isRequired,
  visible: PropTypes.bool,
  hideDatePicker: PropTypes.func.isRequired,
  showDatePicker: PropTypes.func.isRequired,
};

DateTimeSpan.defaultProps = {
  className: 'datetime-span',
  date: moment(),
  showTime: true,
  disableTime: false,
  visible: false,
};

export default DateTimeSpan;
