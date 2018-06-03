import React from 'react';

import './SkypeButton.scss';

import skype from './img/skype.png';
import skypeHover from './img/skypeHover.png';
import skypePressed from './img/skypePressed.png';

export default class SkypeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skypeIcon: skype,
    };
    this.hoverSkype = this.hoverSkype.bind(this);
    this.clickSkype = this.clickSkype.bind(this);
    this.openSkype = this.openSkype.bind(this);
    this.DefaultSkype = this.DefaultSkype.bind(this);
  }

  hoverSkype() {
    this.setState({
      skypeIcon: skypeHover,
    });
  }

  clickSkype() {
    this.setState({
      skypeIcon: skypePressed,
    });
  }

  DefaultSkype() {
    this.setState({
      skypeIcon: skype,
    });
  }

  openSkype() {
    // написать функцию открытия скайпа();
  }

  render() {
    return (
      <a
        href=""
        className="skype_button"
        onMouseEnter={this.hoverSkype}
        onMouseLeave={this.DefaultSkype}
        onMouseDown={this.clickSkype}
        onMouseUp={this.hoverSkype}
      >
        <img src={this.state.skypeIcon} alt="skype" />
      </a>
    );
  }
}
