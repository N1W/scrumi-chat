/**
 *  * Created by Zerk on 19-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import onGetUsers from '@/actions/Masthead/onGetUsers';

import Icon from '@/components/common/Icon';
import Navigation from './Navigation';
import UserMenu from './UserMenu';

import logoImage from './img/LOGO_green.svg';
import './styles.scss';

class Masthead extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    // getUsers: PropTypes.func.isRequired,
  };

  componentWillMount() {
    // const userID = localStorage.getItem('id');
    // console.log('user id', userID);

    this.props.dispatch(onGetUsers());
  }

  render() {
    return (
      <header className="header">
        <Icon
          className="header__logo"
          imageLink={logoImage}
          alt="#"
        />
        <Navigation />
        <UserMenu />
      </header>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   getUsers() {
//     dispatch(onGetUsers());
//   },
// });
//
// export default connect(null, mapDispatchToProps)(Masthead);

export default connect()(Masthead);
