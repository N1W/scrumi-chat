import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ModalHeader extends Component {
  static propTypes = {
    descr: PropTypes.string,
    points: PropTypes.string,
    editDescr: PropTypes.func.isRequired,
    onCloseModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    descr: '',
    points: '0',
  };

  changeDescr = (e) => {
    const value = this.input.value;
    const spaceRegExp = /^\s+?$/;
    if (this.props.editDescr && !spaceRegExp.test(value)) {
      this.props.editDescr(value);
      e.preventDefault();
    }
  };

  render() {
    const { descr, points, onCloseModal } = this.props;
    return (<div className="b-story-modal__header">
      <input
        className="b-story-modal__input"
        type="text"
        placeholder="Название истории"
        defaultValue={descr}
        onBlur={this.changeDescr}
        ref={(x) => { this.input = x; }}
      />
      <div className="b-color-picker" />
      <div className="b-story-modal__story-points">Points: {points} </div>
      <span
        className="b-story-modal__btn-close"
        onClick={onCloseModal}
      >
        {String.fromCharCode(10006)}
      </span>
    </div>
    );
  }
}
