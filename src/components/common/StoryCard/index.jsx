import React, { Component } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/fp/map';
import Footer from './Footer';
import TasksList from './TasksList';
import chooseColor from './chooseColor';
import editIcon from './img/edit.svg';

import './styles.scss';
// 1. Story has 3 visual sections:
// - Text + color
// - TasksList of tasks with color of each task
// - Footer with counter of total and done tasks
//
// 2. Story can collapse and shows all tasks, handler is on the button in the
// footer
//
// 3. Story has double click handler on the text which opens its
// modal window

const propTypes = {
  story: PropTypes.shape().isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onShowStoryModal: PropTypes.func,
  onSelect: PropTypes.func.isRequired,
};

class StoryCard extends Component {
  state = {
    tasksVisible: false,
  };

  showTasks = () => {
    if (this.props.story.tasks.length >= 1) {
      this.setState(prevState => ({
        tasksVisible: !prevState.tasksVisible,
      }));
    }
  };

  onHandleSelect = (e) => {
    const target = e.target;

    if (target !== this.editBtn) {
      this.props.onSelect();
    }
  };

  render() {
    const { story, tasks, onShowStoryModal } = this.props;
    const tasksCompleted = map(tasks, task => (task.completed)).length;
    return (
      <div className={`b-story-card ${chooseColor(story.priority)}`} id={story.id}>
        <header className="b-story-card__header" onClick={this.onHandleSelect} >
          <p className="b-story-card__text">
            {story.descr}
          </p>
          <button
            className="b-story-card__edit"
            onClick={() => { onShowStoryModal(story, tasks); }}
            ref={(x) => { this.editBtn = x; }}
          >
            {/* <svg className="b-story-card__icon"> */}
            {/* <use xlinkHref={editIcon} /> */}
            {/* </svg> */}
          </button>
        </header>
        { this.state.tasksVisible && <TasksList tasks={tasks} /> }
        <Footer
          total={story.tasks.length}
          completed={tasksCompleted}
          showTasks={this.showTasks}
          tasksVisible={this.state.tasksVisible}
        />
      </div>
    );
  }
}

StoryCard.propTypes = propTypes;

StoryCard.defaultProps = {
  onShowStoryModal() {
  },
};

export default StoryCard;
