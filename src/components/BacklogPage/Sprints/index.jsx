/**
 * Created by Zerk on 24-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as SprintActions from '@/actions/SprintActions';
import SprintList from './SprintList';
import CreateSprint from './CreateSprint';
import PlanSprint from './PlanSprint';
import './styles.scss';


const mapStateToProps = state => ({
  inPlanning: state.sprints.inPlanning.isBeingPlanned,
});

const mapDispatchToProps = {
  onStartSprintPlanning: SprintActions.startSprintPlanning,
};

@connect(mapStateToProps, mapDispatchToProps)
export default class extends Component {
  static propTypes = {
    inPlanning: PropTypes.bool.isRequired,
    onStartSprintPlanning: PropTypes.func.isRequired,
  };

  render() {
    const {
      onStartSprintPlanning,
      inPlanning,
    } = this.props;

    return (
      <div>
        <SprintList />
        {inPlanning && <PlanSprint />}
        {!inPlanning && <CreateSprint onClick={onStartSprintPlanning} />}
      </div>
    );
  }
}
