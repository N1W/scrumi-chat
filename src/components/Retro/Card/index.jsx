import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import id from 'uuid';

import ModalWindow from '@/components/common/ModalWindow/ModalWindow';
import userPhoto from '@/components/Retro/Card/img/human-pic.jpg';
import anonym from '@/components/Retro/img/anonymous.svg';
import flag from '@/components/Retro/Card/img/flague.svg';
import { EDIT_CARD, TAKE_TO_NEXT_SPRINT } from '@/actions/Retro';
import onEditCard from '@/actions/Retro/onEditCard';
import onRemoveCard from '@/actions/Retro/onRemoveCard';

import trashIcon from '../img/cart.svg';

import './styles.scss';

class Card extends Component {

  static propTypes = {
    area: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    next: PropTypes.bool.isRequired,
    isAnonymous: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.number,
      datetime: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    onEditCard: PropTypes.func.isRequired,
    onRemoveCard: PropTypes.func.isRequired,
  };

  static defaultProps = {
    children: null,
    onRemoveCard: () => {},
    onEditCard: () => {},
    user: {
      id: '',
      name: '',
      avatar: '',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      text: this.props.text,
      checked: this.props.next ? 'checked' : '',
    };
    this.user = this.props.isAnonymous ?
    { ava: anonym,
      name: 'анонимно' }
      :
    { ava: this.props.user.avatar ? this.props.user.avatar : userPhoto,
      name: this.props.user.name };
  }

  onValueChange = () => {
    this.setState({
      text: this.input.value,
    });
  };

  handleCardClick = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  closeModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      text: this.props.text,
    });
  };

  handleHide = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };

  render() {
    const inputID = id();
    return (
      <div className="card">
        <div
          className="user_card"
          role="presentation"
          onClick={this.handleCardClick}
          id={this.props.id}
        >
          <p
            className="user_content"
            role="presentation"
          >{this.props.text}
          </p>
          <div
            className="user_info"
            role="presentation"
          >
            <img
              className="user_photo"
              src={this.user.ava}
              alt={this.props.user.name}
            />
            <input
              id={inputID}
              className="checkbox_flag"
              type="checkbox"
              checked={this.state.checked}
              onChange={() => {
                const cardToEdit = {
                  id: this.props.id,
                  text: this.props.text,
                  next: this.props.next,
                };
                this.props.onEditCard(
                  cardToEdit,
                  TAKE_TO_NEXT_SPRINT);
              }}
            />
            {this.props.area !== 4 && <label
              htmlFor={inputID}
              className="label_flag"
            >
            </label>}
          </div>
        </div>
        {this.state.isModalVisible && <ModalWindow
          onCloseModal={this.closeModal}
          className="open_sticker"
        >
          <div className="content">
            <div className="open_sticker__sticker_title">
              <h1 className="title">{this.props.title}</h1>
            </div>
            <p className="description_title">Описание:</p>
            <textarea
              ref={(elem) => { this.input = elem; }}
              className="textArea__open_sticker"
              value={this.state.text}
              onChange={this.onValueChange}
            />
            <p className="open_sticker__user_inf">
              <span>Автор:</span>
              <span className="open_sticker__user_name">{this.user.name}</span>
              <img
                className="open_sticker__user_avatar"
                src={this.user.ava}
                alt="user avatar"
              />
            </p>
            <div className="open_sticker__buttons">
              <button
                type="button"
                name="button"
                className="button-trash"
                onClick={() => {
                  this.props.onRemoveCard(this.props.id);
                }}
              >
                <img
                  src={trashIcon}
                  alt="delete"
                  className="trash_icon"
                />
              </button>
              <button
                className="button-red modalRetro__button-cancel"
                onClick={this.closeModal}
              >
                Отменить
              </button>
              <button
                className="button-green"
                onClick={() => {
                  const cardToMove = {
                    id: this.props.id,
                    text: this.input.value,
                    next: this.props.next,
                  };
                  this.props.onEditCard(
                    cardToMove,
                    EDIT_CARD);
                  this.handleHide();
                }
                }
              >
                Сохранить
              </button>
              <button
                type="button"
                name="button"
                className="button-flag"
              >
                <img
                  src={flag}
                  alt="flag"
                  className="flag_icon"
                />
              </button>
            </div>
          </div>
        </ModalWindow>}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.users.find(user => +user.id === props.author),
});

const mapDispatchToProps = dispatch => ({
  onEditCard(dataToSend, action) {
    dispatch(onEditCard(dataToSend, action));
  },
  onRemoveCard(cardID) {
    dispatch(onRemoveCard(cardID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
