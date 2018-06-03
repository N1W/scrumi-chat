import React from 'react';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import UserName from '@/components/Retro/MyPartners/UserName/UserName';
import './MyPartners.scss';

export default class MyPartners extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="my_partners_list">
        {this.props.data.map(item => (
          <UserName data={item} key={uuid.v4()} />
        ))}
      </ul>
    );
  }
}

MyPartners.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    userAvatar: PropTypes.string,
  })).isRequired,
};

