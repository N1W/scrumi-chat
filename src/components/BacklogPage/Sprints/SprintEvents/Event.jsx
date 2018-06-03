/**
 * Created by Zerk on 25-Aug-17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSpan from '@/components/common/DateTimeSpan/DateTimeSpan';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.shape().isRequired,
};

const Event = ({ name, date, visible, setVisible, changeDate }) => {
  console.log('date', date);
  return (
    <li className="b-sprint-events__item">
      <div className="b-sprint-events__name">{name}:</div>
      <DateTimeSpan
        className="date-block__date"
        date={date}
        handleChange={(newDate) => {
          changeDate(newDate);
        }}
        showTime={false}
        disableTime={false}
        hideDatePicker={() => {
          setVisible(false);
        }}
        showDatePicker={() => {
          setVisible(true);
        }}
        visible={visible}
      />
      {/* <a className="b-sprint-events__calendar">{date}</a> */}
    </li>
  );
};

Event.propTypes = propTypes;

export default Event;
