import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import onClickOutside from 'react-onclickoutside';

import './TypeEvent.scss';

class TypeEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(evt) {
    this.props.handleClick();
  }

  render() {
    return (
      <ul className="c-type-list">
        {_.map(this.props.types, (type, i) => (<li
          className={`c-type-list__item c-type-list__item--${this.props.types[i].key}`}
          key={this.props.types[i].key}
          onClick={(event) => {
            event.stopPropagation();
            this.props.onClick(i);
          }}
        >
          {this.props.types[i].title}
        </li>))}
      </ul>
    );
  }
}

TypeEvent.propTypes = {
  onClick: PropTypes.func.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })),
  handleClick: PropTypes.func.isRequired,
};

export default onClickOutside(TypeEvent);
