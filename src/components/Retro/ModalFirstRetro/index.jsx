import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';

import ModalWindow from '@/components/common/ModalWindow/ModalWindow';
import Textarea from '@/components/Retro/ModalFirstRetro/Textarea';
import areas from '@/components/Retro/areas';
import onAddCard from '@/actions/Retro/onAddCard';

import './styles.scss';
import {SHOW_FINISH_RETRO} from "../../../actions/Retro/index";

class ModalFirstRetro extends Component {
  static propTypes = {
    onSaveRetroForm: PropTypes.func.isRequired,
    showFinishRetro: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      modalState: [],
    };
    this.childNodes = new Map();
  }

  onSubmit = () => {
    this.setState({
      modalState: [...this.childNodes.values()].map(item => item.state.items),
    }, () => {
      const cardsArray = this.state.modalState.reduce(
        (textarea1, textarea2) => textarea1.concat(textarea2));
      this.props.onSaveRetroForm(cardsArray);
      this.closeHandler();
    });
  };

  closeHandler = () => {
    this.setState({ visible: false });
    this.props.showFinishRetro();
  };

  render() {
    return (
      <div>
        {this.state.visible && <ModalWindow className="modalRetro" onCloseModal={this.closeHandler}>
          <div className="modalRetro__header">
            <h1 className="modalRetro__header-text">Заполните формы Ретроспективы:</h1>
          </div>
          <div className="modalRetro__wrapper">
            <div className="modalRetro__inside-content">
              {areas.map(area => (<Textarea
                ref={item => this.childNodes.set(area, item)}
                header={area.title}
                area={area.area}
                key={uuidv4()}
              />))}
            </div>
          </div>
          <div className="open_sticker__buttons">
            <button
              type="button"
              name="button"
              className="modalRetro__button-cancel button-red"
              onClick={this.closeHandler}
            >
            Отменить
            </button>
            <button
              type="submit"
              name="button"
              className="modalRetro__button button-green"
              onClick={this.onSubmit}
            >
            Сохранить
            </button>
          </div>
        </ModalWindow>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onSaveRetroForm(arr) {
    arr.forEach((item) => {
      if (item.text && /\S/.test(item.text)) {
        dispatch(onAddCard(item));
      }
    });
  },
  showFinishRetro() {
    dispatch({
      type: SHOW_FINISH_RETRO,
    });
  },
});

export default connect(null, mapDispatchToProps)(ModalFirstRetro);
