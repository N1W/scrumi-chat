/* eslint-disable no-case-declarations */
import filter from 'lodash/filter';
import map from 'lodash/map';
import * as types from '@/actions/TaskActions';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_TASK:
      return [...state, action.payload];
    case types.DELETE_TASK:
      return filter(state, task => task.id !== action.payload);
    case types.EDIT_TASK:
      return map(state, (task) => {
        if (task.id === action.payload.taskId) {
          return action.payload.taskData;
        }
        return task;
      });
    case types.ADD_TASKS:
      return [...state, ...action.payload];
    case types.CLEAN_UP_TASKS:
      return filter(state, task => !action.payload.includes(task.id));
    case types.CREATE_TASK_FROM_BOARD:
      return [...state, action.payload];
    default:
      return state;
  }
}
