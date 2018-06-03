/**
 * Created by Zerk on 19-Aug-17.
 */

import React, { Component } from 'react';

import Icon from '@/components/common/Icon';
import DropDown from '../DropDown';

// Разобраться с картинками
import avatar from '../img/ava.png';

import './styles.scss';

export default class extends Component {
  // тут Redux, эти методы будут у самого итема дропдаун менюхи
  handleSilentMode = () => {};
  handleScrumMode = () => {};
  constructor(props) {
    super(props);
    this.state = {
      avatarPath: avatar,
      username: '',
    };

    this.uploadAvatar = this.uploadAvatar.bind(this);
  }

  getUserId = () => {
    const fetchData = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      credentials: 'same-origin',
    };
    return fetch('/ajax/iam', fetchData)
      .then(response => response.json());
  };

  componentWillMount() {
    const fetchData = {
      method: 'GET',
      credentials: 'same-origin'
    };
    fetch('https://scrumi.org/ajax/myinfo', fetchData)
      .then(response => response.json())
      .then((result) => {
        this.setState({
          avatarPath: result.avatar,
          username: result.firstname,
        });
      }).catch((error) => {
        console.log('error getting user info', error);
      });
  }

  uploadAvatar(afile) {
    const formdata = new FormData();
    formdata.append('sendf', JSON.stringify({type:'avatar'}));
    formdata.append('afile', afile);
    const fetchData = {
      method: 'POST',
      credentials: 'same-origin',
      body: formdata,
    };
    fetch('/ajax/chat', fetchData)
      .then(response => response.json())
      .then((result) => {
        console.log('upload avatar - response', result);
        this.setState({
          ...this.state,
          avatarPath: result,
        })
      }).catch((error) => {
        console.log('error uploading avatar', error);
    });
  }

  render() {
    return (
      <div className="user-menu">
        <input
          type="file"
          name="afile"
          accept="image/*"
          className="user-menu__load"
          ref={(ref) => this.fileUpload = ref}
          onChange={() => {
            this.uploadAvatar(this.fileUpload.files[0]);
          }}
        />
        <Icon
          className="user-menu__icon"
          imageLink={this.state.avatarPath}
          alt="User Avatar"
        />
        <p>{this.state.username}</p>
        {/*<DropDown text="My Profile" />*/}
      </div>
    );
  }
}

