/**
 * Created by Zerk on 23-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import map from 'lodash/map';
import * as EpicActions from '@/actions/EpicActions';
import Column from '../Column';
import './styles.scss';
import RoundButton from '../../../common/RoundButton/index';


const mapStateToProps = state => ({
  epics: state.backlog.epics,
});

const mapDispatchToProps = {
  onCreateEpic: EpicActions.createEpic,
};

@connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })
@DragDropContext(HTML5Backend)
export default class BacklogColumns extends Component {
  static propTypes = {
    epics: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCreateEpic: PropTypes.func.isRequired,
  };

  render() {
    const { epics, onCreateEpic } = this.props;
    return (
      <div className="b-backlog__list" ref={(x) => { this.viewport = x; }}>
        {map(epics, (epic, idx) =>
          (<Column
            key={epic.id}
            epic={epic}
            epicIdx={idx}
          />),
        )}
        <RoundButton
          classNameA={'circle-button-l b-add-epic-btn'}
          onClick={() => onCreateEpic()}
        />
      </div>
    );
  }
}
