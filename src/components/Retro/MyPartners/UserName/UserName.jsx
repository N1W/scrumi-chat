import React from 'react';
import PropTypes from 'prop-types';

export default class UserName extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <li>
        <a href=""><img src={this.props.data.img} alt="" />{this.props.data.name}</a>
      </li>
    );
  }
}


UserName.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
};

