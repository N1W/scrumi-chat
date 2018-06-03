import v4 from 'uuid/v4';
import moment from 'moment';

// CONSTANTS
export const SHOW_STORY_MODAL = 'SHOW_STORY_MODAL';
export const HIDE_STORY_MODAL = 'HIDE_STORY_MODAL';
export const EDIT_DESCR_MODAL = 'EDIT_DESCR_MODAL';
export const ADD_TASK_TO_MODAL = 'ADD_TASK_TO_MODAL';
export const EDIT_TASK_IN_MODAL = 'EDIT_TASK_IN_MODAL';
export const DELETE_TASK_IN_MODAL = 'DELETE_TASK_IN_MODAL';
export const ATTACH_TASK_TO_STORY_MODAL = 'ATTACH_TASK_TO_STORY_MODAL';
export const DETACH_TASK_FROM_STORY_MODAL = 'DETACH_TASK_FROM_STORY_MODAL';

// ACTIONS
export const showStoryModal = (epicId, story = {}, tasks = []) => ({
  type: SHOW_STORY_MODAL,
  payload: {
    epicId,
    story: {
      tasks: [],
      ...story,
    },
    tasks: [
      ...tasks,
    ],
  },
});

export const editDescr = value => ({
  type: EDIT_DESCR_MODAL,
  payload: value,
});

export const hideStoryModal = () => ({
  type: HIDE_STORY_MODAL,
  payload: '',
});

export const addTaskToModal = name =>
  new Promise((resolve) => {
    resolve({
      type: ADD_TASK_TO_MODAL,
      payload: {
        id: v4(),
        name,
        descr: '',
        deadline: moment().format('L'),
        tech: [],
        completed: false,
        priority: '0',
        points: '0',
        author: '',
        assignee: '',
        isBeingEdited: false,
        checklist: [],
      },
    });
  });

export const deleteTaskInModal = taskId => ({
  type: DELETE_TASK_IN_MODAL,
  payload: taskId,
});

export const attachTaskToStoryModal = taskId => ({
  type: ATTACH_TASK_TO_STORY_MODAL,
  payload: taskId,
});

export const detachTaskFromStoryModal = taskId => ({
  type: DETACH_TASK_FROM_STORY_MODAL,
  payload: taskId,
});

export const editTaskInModal = (taskId, taskData) => ({
  type: EDIT_TASK_IN_MODAL,
  payload: {
    taskId,
    taskData,
  },
});
