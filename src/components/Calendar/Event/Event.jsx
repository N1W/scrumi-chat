import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';

import './Event.scss';

const ItemTypes = {
  EVENT: 'event',
};

const eventSource = {
  beginDrag(props) {
    return {
      event: props.event,
    };
  },
};

@DragSource(ItemTypes.EVENT, eventSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editEvent: false,
    };

    this.classNames = ['standup', 'demo', 'retro'];

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
    this.props.handleClick(this.props.event);
  }

  render() {
    const { event, isDragging, connectDragSource, connectDropTarget } = this.props;
    return connectDragSource(
      <div
        className={this.props.className + ([1, 2, 3].includes(this.props.event.type) ?
          ` ${this.props.className}--${this.classNames[this.props.event.type - 1]}` : '')}
        onClick={this.handleClick}
      >
        {this.props.event.assign !== 2 && !this.props.hideTime &&
        <span className={`${this.props.className}__time`}>{this.props.event.start.format('HH:mm')}</span>}
        <span className={`${this.props.className}__cell`}>{this.props.event.type !== 4 ?
          this.props.event.title :
          this.props.startSprint ? 'старт' : 'финиш'}</span>
      </div>
    );
  }
}

Event.propTypes = {
  className: PropTypes.string.isRequired,
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start: PropTypes.shape.isRequired,
    end: PropTypes.shape.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  hideTime: PropTypes.bool,
  startSprint: PropTypes.bool,
};

Event.defaultProps = {
  className: 'c-event',
  hideTime: false,
};

export default Event;
// export default DragSource(ItemTypes.EVENT, eventSource, collect)(Event);
