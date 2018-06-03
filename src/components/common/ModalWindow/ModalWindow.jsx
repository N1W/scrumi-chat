/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable-component';
import './ModalWindow.scss';

class ModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.stopPropagation = this.stopPropagation.bind(this);
    this.listenKeyboard = this.listenKeyboard.bind(this);
  }

  listenKeyboard(event) {
    event.keyCode === 27 ? this.props.onCloseModal() : null;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyboard);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyboard);
  }


  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div
        className="overlay"
        onClick={this.props.onCloseModal}
      >
        <div
          className={`modal ${this.props.className}`}
          onClick={this.stopPropagation}
        >
          <span className="modal__close" onClick={this.props.onCloseModal}>{String.fromCharCode(10006)}</span>
          {this.props.children}
        </div>
      </div>
    );
  }
}

ModalWindow.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
};

export default ModalWindow;
