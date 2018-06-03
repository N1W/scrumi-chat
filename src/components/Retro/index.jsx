import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import id from 'uuid';

import getCards from '@/actions/Retro/onGetCards';
import getUsers from '@/actions/Masthead/onGetUsers';

import RetroContainer from './RetroContainer/index';
import ModalFirstRetro from './ModalFirstRetro/index';
import areas from './areas';
import SideMenu from './SideMenu/index';
import FinishRetro from './FinishRetro';

import './styles.scss';

class Retro extends Component {
  static propTypes = {
    onGetCards: PropTypes.func.isRequired,
    showFinishRetro: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    this.props.onGetCards();
    getUsers();
  }

  render() {
    return (
      <div
        className="wrapper"
      >
        {areas.map(item => (
          <div
            className="retro__container"
            key={id()}
          >
            <RetroContainer
              title={item.title}
              area={(item.area)}
            />
          </div>
        ))}
        <div className="retro__container">
          <RetroContainer
            title="Переносим на следующий спринт:"
            area={4}
          />
        </div>
        <ModalFirstRetro />
        {/*<SideMenu />*/}
        { this.props.showFinishRetro && <FinishRetro /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showFinishRetro: state.showFinishRetro,
});

const mapDispatchToProps = dispatch => ({
  onGetCards() {
    dispatch(getCards());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Retro);

