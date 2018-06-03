import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import map from 'lodash/map';
import find from 'lodash/find';
import filter from 'lodash/filter';
import * as EpicActions from '@/actions/EpicActions';
import * as StoryActions from '@/actions/StoryActions';
import * as TaskActions from '@/actions/TaskActions';
import * as SprintActions from '@/actions/SprintActions';
import * as StoryModalActions from '@/actions/StoryModalActions';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
import TasksSection from './TaskSection/';

import './styles.scss';

const propTypes = {
  story: PropTypes.shape(),
  tasks: PropTypes.arrayOf(PropTypes.shape()),
  onCloseModal: PropTypes.func.isRequired,
  onEditDescr: PropTypes.func.isRequired,
  onCreateStory: PropTypes.func.isRequired,
  onDeleteStory: PropTypes.func.isRequired,
  onEditStory: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

const StoryModal =
  ({
     story,
     tasks,
     onCloseModal,
     onCreateStory,
     onEditStory,
     onEditDescr,
     onDeleteStory,
     onDeleteTask,
     onAddTask,
   }) => {
    if (story.id) {
      return (<div className="b-story-modal">
        <div className="b-story-modal__body">
          <ModalHeader
            descr={story.descr}
            points={story.points}
            editDescr={onEditDescr}
            onCloseModal={onCloseModal}
          />
          <div className="b-story-modal__content">
            <TasksSection
              tasks={tasks || []}
              createTask={onAddTask}
              deleteTask={onDeleteTask}
            />
          </div>
          <ModalFooter
            editModal={'edited'}
            onSave={() => {
              onEditStory();
            }}
            onCancel={onCloseModal}
            onDelete={() => {
              onDeleteStory(story.id, story.tasks);
            }}
          />
        </div>
      </div>);
    }

    return (<div className="b-story-modal">
      <div className="b-story-modal__body">
        <ModalHeader
          onCloseModal={onCloseModal}
          editDescr={onEditDescr}
        />
        <div className="b-story-modal__content">
          <TasksSection
            tasks={tasks || []}
            createTask={onAddTask}
            deleteTask={onDeleteTask}
          />
        </div>
        <ModalFooter
          onSave={() => {
            onCreateStory(story);
          }}
          onCancel={onCloseModal}
          onDelete={(e) => {
            e.preventDefault();
          }}
        />
      </div>
    </div>);
  };

const mapStateToProps = state => ({
  epicId: state.storyModal.epicId,
  story: state.storyModal.story,
  tasks: state.storyModal.tasks,
  state,
});

const mapDispatchToProps = dispatch => ({ dispatch });
const mergeProps = (stateProps, dispatchProps) =>
  ({
    ...stateProps,
    ...dispatchProps,
    onCreateStory(story) {
      StoryActions.createStory(story)
        .then((action) => {
          dispatchProps.dispatch(action);
          dispatchProps.dispatch(
            EpicActions.attachToEpic(stateProps.epicId, action.payload.id),
          );
          dispatchProps.dispatch(TaskActions.addTasks(stateProps.tasks));
          dispatchProps.dispatch(StoryModalActions.hideStoryModal());
        });
    },
    onEditStory() {
      // сравниваем массив задач в истории с массивом задач истории с модальки,
      // оставляем те задачи в истоии, которых нет в массиве с модальки, потом
      // то что получилось сравниваем с со стейтом всех историй беклога
      // и удаляем те что остались после сравнения массивов задач историиб
      // потом заменяем переписываем массив задач истории новым массивом с
      // модальки, потом фильтруем новые только задачи с модальки и
      // добавляем в массив задач со стейта беклога

      const state = stateProps.state;
      const dispatch = dispatchProps.dispatch;
      const originalStoryTasks = find(state.backlog.stories, story => story.id === stateProps.story.id).tasks;
      const modifiedStoryTasks = state.storyModal.story.tasks;
      const toBeDeleted = filter(originalStoryTasks, task => !modifiedStoryTasks.includes(task));
      const toBeAddedIds = filter(modifiedStoryTasks, task => !originalStoryTasks.includes(task));
      const toBeAddedTasks = filter(state.storyModal.tasks, task => toBeAddedIds.includes(task.id));

      dispatch(TaskActions.cleanUpTasks(toBeDeleted));
      dispatch(TaskActions.addTasks(toBeAddedTasks));
      dispatch(StoryActions.editStory(stateProps.story));
      dispatch(StoryModalActions.hideStoryModal());
    },
    onDeleteStory(storyId, taskIds) {
      dispatchProps.dispatch(EpicActions.detachFromEpic(stateProps.epicId, storyId));
      dispatchProps.dispatch(SprintActions.removeFromSprint(storyId));
      dispatchProps.dispatch(TaskActions.cleanUpTasks(taskIds));
      dispatchProps.dispatch(StoryActions.deleteStory(storyId));
      dispatchProps.dispatch(StoryModalActions.hideStoryModal());
    },
    onEditDescr(value) {
      dispatchProps.dispatch(StoryModalActions.editDescr(value));
    },
    onAddTask(name) {
      StoryModalActions.addTaskToModal(name)
        .then((task) => {
          dispatchProps.dispatch(task);
          dispatchProps.dispatch(StoryModalActions.attachTaskToStoryModal(task.payload.id));
        });
    },
    onDeleteTask(taskId) {
      dispatchProps.dispatch(StoryModalActions.detachTaskFromStoryModal(taskId));
      dispatchProps.dispatch(StoryModalActions.deleteTaskInModal(taskId));
    },
    onCloseModal() {
      dispatchProps.dispatch(StoryModalActions.hideStoryModal());
    },
  });

StoryModal.propTypes = propTypes;

StoryModal.defaultProps = {
  story: {},
  tasks: [],
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(StoryModal);

// Отображение в режиме редактирования сторипоинтов(подсчет со всех задач)
// Редактирование задач в модальке
// Дропдаун для выбора цвета карточки

