import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ModalWindow from '@/components/common/ModalWindow/ModalWindow';
import onAddCard from '@/actions/Retro/onAddCard';

import './styles.scss';

class AddCard extends Component {

  static propTypes = {
    area: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onAddCard: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      isAnonymous: false,
    };
  }

  onCheck = () => {
    this.setState({
      isAnonymous: !this.state.isAnonymous,
    });
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
      isAnonymous: false,
    });
  };

  hideModal = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    return (
      <div className="card">
        <div className="user_card add_card">
          <div className="circle-button-l">
            <button onClick={this.showModal}>
              <span className="cross-l" />
            </button>
          </div>
          {this.state.isModalVisible && <ModalWindow
            onCloseModal={this.hideModal}
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
              />
              <div className="r-modal-window">
                <input
                  type="checkbox"
                  id="r-modal-window__checkbox"
                  className="r-input__checkbox"
                  onChange={this.onCheck}
                />
                <label
                  className="r-label__checkbox"
                  htmlFor="r-modal-window__checkbox"
                >
                  Отправить анонимно
                </label>
              </div>
              <div className="open_sticker__buttons">
                <button
                  className="button-red modalRetro__button-cancel"
                  onClick={this.hideModal}
                >
                  Отменить
                </button>
                <button
                  className="button-green"
                  onClick={() => {
                    const area = this.props.area;
                    const card = {
                      text: this.input.value,
                      area,
                      hidden: this.state.isAnonymous,
                    };
                    this.props.onAddCard(card);
                    this.hideModal();
                  }}
                >
                  Сохранить
                </button>
              </div>
            </div>
          </ModalWindow>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.users.find(user => +user.id === +localStorage.getItem('id')),
});

export default connect(mapStateToProps, { onAddCard })(AddCard);
