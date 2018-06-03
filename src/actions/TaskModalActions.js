/**
 * Created by Katya on 8/30/17.
 */
import v4 from 'uuid/v4';

// CONSTANTS
export const SHOW_TASK_MODAL = 'SHOW_TASK_MODAL';
export const HIDE_TASK_MODAL = 'HIDE_TASK_MODAL';

// ACTIONS
export const openTaskModal = task => ({
  type: SHOW_TASK_MODAL,
  payload: {
    isVisible: true,
    task,
  },
});

export const closeTaskModal = () => ({
  type: HIDE_TASK_MODAL,
  payload: {
    isVisible: false,
  },
});

