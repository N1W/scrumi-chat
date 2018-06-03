import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import v4 from 'uuid/v4';
import find from 'lodash/find';
import filter from 'lodash/filter';
import * as TaskModalActions from '@/actions/TaskModalActions';
import * as TaskActions from '@/actions/TaskActions';
import * as StoryActions from '@/actions/StoryActions';
import * as BoardActions from '@/actions/BoardActions';
import Header from './Header';
import Descr from './Descr';
import Checklist from './Checklist';
import './styles.scss';


const propTypes = {
  closeTaskModal: PropTypes.func.isRequired,
  modal: PropTypes.shape().isRequired,
  deleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
  story: PropTypes.shape(),
  stories: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onCreateTask: PropTypes.func.isRequired,
};

const TaskModal = ({
  closeTaskModal,
  modal,
  deleteTask,
  story,
  stories,
  onEditTask,
  onCreateTask,
}) => {
  const task = modal.task;

  if (modal.isVisible) {
    const editDescr = (inputDescr, inputDeadline, inputAuthor, inputAssignee, inputStory) => {
      task.descr = inputDescr;
      task.deadline = inputDeadline;
      task.author = inputAuthor;
      task.assignee = inputAssignee;
      modal.storyId = inputStory;
    };

    const editHeader = (name, points, priority) => {
      task.name = name;
      task.points = points;
      task.priority = priority;
    };

    const onSuccess = () => {
      if (modal.task.id) {
        onEditTask(modal.task, story.id);
      } else {
        onCreateTask(modal.storyId, { id: v4(), ...task });
      }
    };

    return (
      <div className="b-task-modal">
        <div className="b-task-modal__body">
          <Header
            name={task.name}
            closeTaskModal={closeTaskModal}
            points={task.points}
            priority={task.priority}
            onEditHeader={editHeader}
          />
          <div className="b-task-modal__sections">
            <Descr
              task={task}
              onDescrEdit={editDescr}
              stories={stories}
            />
            {/* {task.checklist} */}
            <Checklist items={[
              { descr: 'ONE', checked: false },
              { descr: 'TWO', checked: false },
              { descr: 'T3EE', checked: false },
            ]}
            />
          </div>
          <footer className="b-task-modal__footer">
            <button
              className="b-task-modal__btn-del"
              onClick={() => deleteTask(story.id, task.id)}
            />
            <button
              className="b-task-modal__btn button-red"
              onClick={closeTaskModal}
            >Cancel</button>
            <button
              className="b-task-modal__btn button-green"
              onClick={onSuccess}
            >Save</button>
          </footer>
        </div>
      </div>
    );
  }
  return <div />;
};

TaskModal.propTypes = propTypes;
TaskModal.defaultProps = {
  story: {},
};

const mapStateToProps = state => ({
  modal: state.taskModal,
  story: find(state.backlog.stories, x => x.tasks.includes(state.taskModal.task.id)),
  stories: filter(state.backlog.stories, story => state.sprints.current.stories.includes(story.id)),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  closeTaskModal() {
    dispatch(TaskModalActions.closeTaskModal());
  },
  deleteTask(storyId, taskId) {
    dispatch(StoryActions.detachFromStory(storyId, taskId));
    dispatch(TaskModalActions.closeTaskModal());
    dispatch(TaskActions.deleteTask(taskId));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onCreateTask(storyId, task) {
    const dispatch = dispatchProps.dispatch;

    dispatch(TaskActions.createTaskFromBoard(task));
    dispatch(StoryActions.attachToStory(storyId, task.id));
    dispatch(TaskModalActions.closeTaskModal());
    dispatch(BoardActions.attachToLane(null, task.id));
  },
  onEditTask(task, storyId) {
    const dispatch = dispatchProps.dispatch;
    dispatch(TaskActions.editTask(task.id, task));
    // если id истории поменялась, нужно отвязать таску от старой и привязать к новой истории
    if (stateProps.modal.storyId !== storyId) {
      dispatch(StoryActions.detachFromStory(storyId, task.id));
      dispatch(StoryActions.attachToStory(stateProps.modal.storyId, task.id));
    }
    dispatch(TaskModalActions.closeTaskModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(TaskModal);
