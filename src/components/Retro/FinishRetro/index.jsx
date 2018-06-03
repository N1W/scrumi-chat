import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FINISH_RETRO } from '@/actions/Retro';

import './styles.scss';

import button from './img/finish_retro_i.png';

class FinishRetro extends Component {

  static propTypes = {
    cardsToBacklog: PropTypes.arrayOf(PropTypes.shape()),
    finishRetro: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    cardsToBacklog: [],
    users: [],
  };

  handleSubmit = () => {
    const cardsArray = this.props.cardsToBacklog.map((card) => {
      const author = _.find(this.props.users, user => +user.id === card.author);
      return {
        id: card.id,
        text: card.text,
        avatar: author.avatar,
        name: author.name,
      };
    });
    this.props.finishRetro(cardsArray);
  };

  render() {
    return (
      <div>
        <Link to="/board" className="finish_retro_btn">
          <button
            className="button-green finish_retro_btn__width"
            onClick={this.handleSubmit}
          >
            Завершить ретро
          </button>
          <img src={button} alt="finish retro" />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cardsToBacklog: state.retroCards.filter(card => card.next),
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  finishRetro(arr) {
    dispatch({
      type: FINISH_RETRO,
      payload: arr,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FinishRetro);

