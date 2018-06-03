/* eslint-disable no-param-reassign */
import map from 'lodash/map';
import filter from 'lodash/filter';
import * as types from '@/actions/StoryActions';

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_STORY:
      return [...state, action.payload];
    case types.DELETE_STORY:
      return filter(state, story => story.id !== action.payload);
    case types.EDIT_STORY:
      return map(state, (story) => {
        if (story.id === action.payload.id) {
          return { ...action.payload };
        }
        return story;
      });
    case types.ATTACH_TO_STORY:
      return map(state, (story) => {
        if (story.tasks.includes(action.payload.taskId)) {
          story.tasks = filter(
            story.tasks,
            task => task !== action.payload.taskId);
        }

        if (story.id === action.payload.storyId) {
          story.tasks = [...story.tasks, action.payload.taskId];
        }

        return story;
      });
    case types.DETACH_FROM_STORY:
      return map(state, (story) => {
        if (story.id === action.payload.storyId) {
          story.tasks = filter(
            story.tasks,
            task => task !== action.payload.taskId,
        );
        }
        return story;
      });
    case types.SET_SELECTED_STATE:
      return map(state, (story) => {
        if (story.id === action.payload.id) {
          return {
            ...story,
            isSelected: action.payload.state,
          };
        }
        return story;
      });
    case types.CLEAN_UP_STORIES:
      return filter(state, story => !action.payload.includes(story.id));
    default:
      return state;
  }
}
