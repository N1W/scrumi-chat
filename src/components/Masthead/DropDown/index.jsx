/**
 * Created by Zerk on 19-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './styles.scss';

const dropDownData = [
  {
    text: 'My Profile',
    link: '/profile',
    isClickable: true,
  },
  {
    text: 'Silent Mode',
    link: null,
    isClickable: false,
  },
  {
    text: 'Scrum Mode',
    link: null,
    isClickable: false,
  },
  {
    text: 'Settings',
    link: '/settings',
    isClickable: true,
  },
  {
    text: 'Log Off',
    link: null,
    isClickable: true,
  },
];

export default class extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      listVisible: false,
    };
  }

  handleClick = () => {
    this.setState(() => ({
      listVisible: !this.state.listVisible,
    }));
  };

  hide = () => {
    this.setState(() => ({
      listVisible: false,
    }));
  };

  render() {
    const items = dropDownData.map((item) => {
      if (item.isClickable) {
        return (
          <li className="dropdown__item" key={item.text}>
            <Link
              className="dropdown__link"
              to={item.link || ''}
            >
              {item.text}
            </Link>
          </li>
        );
      }

      return (
        <li
          className="dropdown__item"
          onClick={() => { console.log('SET MODE!'); }}
          key={item.text}
        >
          {item.text}
          <input type="radio" className="b-radio" />
        </li>
      );
    });

    return (
      <div className="dropdown" onBlur={this.hide}>
        <button
          className="dropdown__btn"
          onClick={this.handleClick}
        >
          {this.props.text}
        </button>
        <ul className="dropdown__list">
          {this.state.listVisible && items}
        </ul>
      </div>
    );
  }
}

