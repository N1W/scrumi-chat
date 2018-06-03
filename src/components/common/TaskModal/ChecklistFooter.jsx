import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../../common/RoundButton';

export default class ChecklistFooter extends Component {

  static propTypes = {
    createTask: PropTypes.func.isRequired,
  };

  state = {
    isInputActive: false,
  };

  onChangeInput = () => {
    this.setState(state => ({
      isInputActive: !state.isInputActive,
    }));
  };

  onAddItem = (e) => {
    const newItem = this.input.value;
    const key = e.which || e.keyCode;
    if (key === 13 && newItem) {
      this.props.createTask(newItem);
      this.input.value = '';
    }
  };

  render() {
    return (
      <footer className="b-checklist__footer">
        {this.state.isInputActive
          ? <input
            className="b-add-item__input"
            type="text"
            placeholder="Добавить..."
            onBlur={this.onChangeInput}
            onKeyDown={this.onAddItem}
            ref={(x) => { this.input = x; }}
          />
          : <RoundButton
            onClick={this.handleChangeInput}
            classNameA="circle-button-s"
            classNameSpan="cross-s"
          />}
      </footer>
    );
  }
}
