import v4 from 'uuid/v4';

// CONSTANTS
export const CREATE_STORY = 'CREATE_STORY';
export const DELETE_STORY = 'DELETE_STORY';
export const EDIT_STORY = 'EDIT_STORY';
export const ATTACH_TO_STORY = 'ATTACH_TO_STORY';
export const DETACH_FROM_STORY = 'DETACH_FROM_STORY';
export const SET_SELECTED_STATE = 'SET_SELECTED_STATE';
export const SET_COMPLETED_STATE = 'SET_COMPLETED_STATE';
export const CLEAN_UP_STORIES = 'CLEAN_UP_STORIES';


// ACTIONS
export const createStory = story =>
  new Promise((resolve) => {
    resolve({
      type: CREATE_STORY,
      payload: {
        id: v4(),
        descr: story.descr,
        priority: 0,
        completed: false,
        isSelected: false,
        criteriaList: [],
        tasks: story.tasks,
      },
    });
  });

export const editStory = data => ({
  type: EDIT_STORY,
  payload: data,
});

export const deleteStory = id => ({
  type: DELETE_STORY,
  payload: id,
});

export const attachToStory = (storyId, taskId) => ({
  type: ATTACH_TO_STORY,
  payload: {
    storyId,
    taskId,
  },
});

export const detachFromStory = (storyId, taskId) => ({
  type: DETACH_FROM_STORY,
  payload: {
    storyId,
    taskId,
  },
});

export const setSelectedState = (id, state) => ({
  type: SET_SELECTED_STATE,
  payload: {
    id,
    state,
  },
});

export const cleanUpStories = idList => ({
  type: CLEAN_UP_STORIES,
  payload: idList,
});
