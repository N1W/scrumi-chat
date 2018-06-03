/**
 * Created by Zerk on 20-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sprints from './Sprints';
import Backlog from './Backlog';
import StoryModal from './StoryModal';
import TaskModal from '@/components/common/TaskModal';
import './styles.scss';

@connect(state => ({ storyModal: state.storyModal }), null)
export default class BacklogPage extends Component {
  static propTypes = {
    storyModal: PropTypes.shape().isRequired,
  };

  render() {
    const { storyModal } = this.props;

    return (
      <div className="b-backlog-view">
        <Sprints />
        <Backlog />
        {storyModal.isVisible && <StoryModal /> }
        <TaskModal />
      </div>
    );
  }
}
