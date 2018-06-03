/**
 * Created by Katya on 8/30/17.
 */
import * as types from '@/actions/TaskModalActions';

const initialState = {
  isVisible: false,
  storyId: null,
  task: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_TASK_MODAL:
      return {
        ...state,
        isVisible: action.payload.isVisible,
        task: { ...action.payload.task },
      };
    case types.HIDE_TASK_MODAL:
      return {
        isVisible: false,
        storyId: null,
        task: {},
      };
    default:
      return state;
  }
}
