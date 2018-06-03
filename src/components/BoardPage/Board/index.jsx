/**
 * Created by Zerk on 27-Aug-17.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import flow from 'lodash/fp/flow';
import mapFP from 'lodash/fp/map';
import filter from 'lodash/fp/filter';
import flatten from 'lodash/fp/flatten';
import * as BoardActions from '@/actions/BoardActions';
import map from 'lodash/map';
import Lane from './Lane';
import './styles.scss';


// Flow is a much lighter version of lodash chaining
// We can cherry-pick functional versions of lodash methods from lodash/fp package
// and then just flow em in a natural order, unlike currying
const getSprintTaskIds = state => flow(
  filter(story => state.sprints.current.stories.includes(story.id)),
  mapFP(x => x.tasks),
  flatten,
)(state.backlog.stories);

const mapStateToProps = state => ({
  taskIds: getSprintTaskIds(state),
  isSprintActive: state.sprints.current.isActive && state.sprints.current.stories.length > 0,
  lanes: state.board.lanes,
});

const mapDispatchToProps = {
  initBoard: BoardActions.initBoard,
};


@connect(mapStateToProps, mapDispatchToProps)
@DragDropContext(HTML5Backend)
export default class Board extends Component {
  static propTypes = {
    lanes: PropTypes.arrayOf(PropTypes.object).isRequired,
    taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    isSprintActive: PropTypes.bool.isRequired,
    initBoard: PropTypes.func.isRequired,
  };

  componentDidMount() {
    if (this.props.isSprintActive) {
      this.props.initBoard(this.props.isSprintActive, this.props.taskIds);
    }
  }

  render() {
    const { lanes } = this.props;
    return (
      <div className="b-board">
        {map(lanes, lane => (
          <Lane key={lane.id} lane={lane} />
        ))}
      </div>
    );
  }
}
