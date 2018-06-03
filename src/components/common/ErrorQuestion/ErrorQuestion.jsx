import React from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';

import './ErrorQuestion.scss';
class ErrorQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  handleClickOutside(evt) {
    this.props.handleClick();
  }
  render() {
    return (
      <div className={`question ${this.props.className}`} onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}

ErrorQuestion.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default onClickOutside(ErrorQuestion);
