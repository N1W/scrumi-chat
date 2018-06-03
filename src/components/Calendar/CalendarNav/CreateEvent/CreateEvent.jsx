import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Button from 'components/Calendar/Button/Button';
import TypeEvent from 'components/Calendar/TypeEvent/TypeEvent';

import './CreateEvent.scss';


export default class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      eventWindowVisible: false,
      type: 0,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelectEventType = this.handleSelectEventType.bind(this);
    this.handleEventWindowHide = this.handleEventWindowHide.bind(this);
  }

  handleClick() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  handleSelectEventType(type) {
    this.props.handleCreateEvent(type);
    this.handleClick();
  }

  handleEventWindowHide() {
    this.setState({
      eventWindowVisible: false,
    });
  }

  render() {
    return (
      <div className="event">
        <Button
          className="button-green"
          text="Создать событие"
          onClick={() => {
            this.props.handleCreateEvent(0, moment());
          }}
          id={'Создать событие'}
        />
        <Button
          className="button-green button-green--caret"
          text={String.fromCharCode(9660)}
          onClick={this.handleClick}
          id={'Показать список'}
        />
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
          outsideClickIgnoreClass={'button-green--caret'}
        />
        }
      </div>
    );
  }
}


CreateEvent.propTypes = {
  handleCreateEvent: PropTypes.func.isRequired,
};
