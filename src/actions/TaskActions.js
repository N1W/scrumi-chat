import v4 from 'uuid/v4';
import moment from 'moment';

// CONSTANTS
export const CREATE_TASK = 'CREATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const CLEAN_UP_TASKS = 'CLEAN_UP_TASKS';
export const ADD_TASKS = 'ADD_MULTIPLE_TASKS';
export const CREATE_TASK_FROM_BOARD = 'CREATE_TASK_FROM_BOARD';

// ACTIONS
export const createTask = name =>
  new Promise((resolve) => {
    resolve({
      type: CREATE_TASK,
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

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const editTask = (taskId, taskData) => ({
  type: EDIT_TASK,
  payload: {
    taskId,
    taskData,
  },
});

export const addTasks = tasks => ({
  type: ADD_TASKS,
  payload: tasks,
});

export const cleanUpTasks = idList => ({
  type: CLEAN_UP_TASKS,
  payload: idList,
});

export const createTaskFromBoard = task => ({
  type: CREATE_TASK_FROM_BOARD,
  payload: task,
});
