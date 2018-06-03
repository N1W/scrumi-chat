/**
 * Created by Zerk on 24-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PopupHint from '@/components/common/ErrorQuestion/ErrorQuestion';
import './styles.scss';


const mapDispatchToProps = state => ({
  canStartSprint: state.sprints.inPlanning.stories.length > 0,
});

@connect(mapDispatchToProps, null)
export default class SprintControls extends Component {
  static propTypes = {
    onFinish: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    canStartSprint: PropTypes.bool.isRequired,
  };

  state = {
    showPopup: false,
  };

  handleSuccess = () => {
    const { canStartSprint, onFinish } = this.props;
    if (canStartSprint) {
      this.setState({
        showPopup: false,
      });
      onFinish();
    } else {
      this.setState({
        showPopup: true,
      });
    }
  };

  render() {
    const { onCancel } = this.props;
    return (
      <div className="b-sprint__controls">
        <button
          className="b-sprint__btn button-green"
          onClick={this.handleSuccess}
        >Принять</button>
        {this.state.showPopup &&
        <PopupHint
          text="Нельзя запланировать пустой спринт!"
          className="b-sprint__controls-err"
        />}
        <button className="b-sprint__btn button-gray" onClick={onCancel}>Отмена</button>
      </div>
    );
  }
}
