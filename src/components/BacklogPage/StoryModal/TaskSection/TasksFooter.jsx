import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../../../common/RoundButton/index';

const propTypes = {
  createTask: PropTypes.func.isRequired,
};

class TasksFooter extends Component {
  state = {
    input: false,
  };

  handleChangeInput = () => {
    this.setState(prevState => ({
      input: !prevState.input,
    }));
  };

  createListItem = (e) => {
    const value = this.input.value;
    const key = e.which || e.keyCode;
    const spaceRegExp = /^\s+?$/;

    if (key === 13 && value && !spaceRegExp.test(value)) {
      this.props.createTask(this.input.value);
      this.input.value = '';
    }
  };

  render() {
    return (
      <footer className="b-tasks__footer">
        {this.state.input
            ? <input
              className="b-add-item__input"
              type="text"
              placeholder="Добавить задачу"
              onBlur={this.handleChangeInput}
              onKeyDown={this.createListItem}
              ref={(item) => {
                this.input = item;
              }}
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

TasksFooter.defaultProps = {};

TasksFooter.propTypes = propTypes;

export default TasksFooter;
