import React from 'react';
import PropTypes from 'prop-types';


import CreateEvent from 'components/Calendar/CalendarNav/CreateEvent/CreateEvent';
import SwitchMonth from 'components/Calendar/CalendarNav/SwitchMonth/SwitchMonth';
import './CalendarNav.scss';


export default class CalendarNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="c-nav">
        <SwitchMonth
          period={this.props.period}
          switchMonth={this.props.switchMonth}
          editEventWindow={this.props.editEventWindow}
        />
        <CreateEvent
          handleCreateEvent={this.props.handleCreateEvent}
        />
      </div>
    );
  }
}

CalendarNav.propTypes = {
  period: PropTypes.shape().isRequired,
  switchMonth: PropTypes.func.isRequired,
  handleCreateEvent: PropTypes.func.isRequired,
  editEventWindow: PropTypes.bool.isRequired,
};
