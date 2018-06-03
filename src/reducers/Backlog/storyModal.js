import filter from 'lodash/filter';
import * as types from '@/actions/StoryModalActions';

const initialState = {
  isVisible: false,
  story: {
    tasks: [],
  },
  tasks: [],
  epicId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.SHOW_STORY_MODAL:
      return {
        isVisible: true,
        epicId: action.payload.epicId,
        story: action.payload.story,
        tasks: action.payload.tasks,
      };
    case types.EDIT_DESCR_MODAL:
      return {
        ...state,
        story: {
          ...state.story,
          descr: action.payload,
        },
      };
    case types.HIDE_STORY_MODAL:
      return {
        isVisible: false,
      };
    case types.ADD_TASK_TO_MODAL:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],

      };
    case types.ATTACH_TASK_TO_STORY_MODAL:
      return {
        ...state,
        story: {
          ...state.story,
          tasks: [...state.story.tasks, action.payload],
        },
      };
    case types.DETACH_TASK_FROM_STORY_MODAL:
      return {
        ...state,
        story: {
          ...state.story,
          tasks: filter(state.story.tasks, task => task !== action.payload),
        },
      };
    case types.DELETE_TASK_IN_MODAL:
      return {
        ...state,
        tasks: filter(state.tasks, task => task.id !== action.payload),
      };
    default:
      return state;
  }
}
