import v4 from 'uuid/v4';

// CONSTANTS
export const CREATE_EPIC = 'CREATE_EPIC';
export const DELETE_EPIC = 'DELETE_EPIC';
export const EDIT_EPIC = 'EDIT_EPIC';
export const ATTACH_TO_EPIC = 'ATTACH_TO_EPIC';
export const DETACH_FROM_EPIC = 'DETACH_FROM_EPIC';
export const MOVE_TO_EPIC = 'MOVE_TO_EPIC';

// ACTIONS
export const createEpic = () => ({
  type: CREATE_EPIC,
  payload: {
    id: v4(),
    descr: 'Click to edit',
    stories: [],
    isBeingEdited: false,
  },
});

export const deleteEpic = id => ({
  type: DELETE_EPIC,
  payload: id,
});

export const editEpic = (id, isBeingEdited, value) => ({
  type: EDIT_EPIC,
  payload: {
    id,
    isBeingEdited,
    value,
  },
});

export const attachToEpic = (epicId, storyId) => ({
  type: ATTACH_TO_EPIC,
  payload: {
    epicId,
    storyId,
  },
});

export const detachFromEpic = (epicId, storyId) => ({
  type: DETACH_FROM_EPIC,
  payload: {
    epicId,
    storyId,
  },
});

export const moveToEpic = (sourceId, targetId) => ({
  type: MOVE_TO_EPIC,
  payload: {
    sourceId,
    targetId,
  },
});
