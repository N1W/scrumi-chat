/* eslint-disable jsx-a11y/no-autofocus */
/**
 * Created by Zerk on 24-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ownStyles = {
  margin: 0,
  padding: 0,
  minHeight: '100%',
  height: '4.375rem',
};

class Editable extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    isBeingEdited: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
  };

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };

  finishEdit = (e) => {
    const value = e.target.value;

    if (this.props.onEdit) {
      this.props.onEdit(value);
    }
  };

  render() {
    const { value, isBeingEdited, className } = this.props;
    if (isBeingEdited) {
      return (
        <textarea
          style={ownStyles}
          className={className}
          autoFocus
          maxLength="80"
          defaultValue={value}
          onBlur={this.finishEdit}
          onKeyPress={this.checkEnter}
        />
      );
    }
    return (
      <p>{value}</p>
    );
  }
}

export default Editable;
