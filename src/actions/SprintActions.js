import v4 from 'uuid/v4';
import random from 'lodash/random';

export const ADD_TO_SPRINT = 'ADD_TO_SPRINT';
export const REMOVE_FROM_SPRINT = 'REMOVE_FROM_SPRINT';
export const EDIT_SPRINT = 'EDIT_SPRINT';
export const CLEAN_UP_SPRINT = 'CLEAN_UP_SPRINT';

export const START_SPRINT_PLANNING = 'START_SPRINT_PLANNING';
export const CANCEL_SPRINT_PLANNING = 'CANCEL_SPRINT_PLANNING';
export const FINISH_SPRINT_PLANNING = 'FINISH_SPRINT_PLANNING';

export const SET_CURRENT_SPRINT = 'SET_CURRENT_SPRINT';
export const DELETE_SPRINT = 'DELETE_SPRINT';

export const DP_SET_VISIBILITY = 'DP_SET_VISIBILITY';
export const DP_SET_DATE = 'DP_SET_DATE';


export const startSprintPlanning = () => ({
  type: START_SPRINT_PLANNING,
});

export const cancelSprintPlanning = () => ({
  type: CANCEL_SPRINT_PLANNING,
});

export const finishSprintPlanning = (stories, events) => ({
  type: FINISH_SPRINT_PLANNING,
  payload: {
    id: v4(),
    stories,
    events,
    isActive: false,
    inEditing: false,
  },
});

export const setCurrentSprint = date => ({
  type: SET_CURRENT_SPRINT,
  payload: date,
});

export const addToSprint = id => ({
  type: ADD_TO_SPRINT,
  payload: id,
});

export const removeFromSprint = id => ({
  type: REMOVE_FROM_SPRINT,
  payload: id,
});

export const cleanUpSprint = idList => ({
  type: CLEAN_UP_SPRINT,
  payload: idList,
});

export const deleteSprint = (id, isCurrent) => ({
  type: DELETE_SPRINT,
  payload: {
    id,
    isCurrent,
  },
});

export const setDatePickerVisibility = (datePickerId, visible) => ({
  type: DP_SET_VISIBILITY,
  payload: {
    datePickerId,
    visible,
  },
});

export const setDatePickerDate = (datePickerId, newDate) => ({
  type: DP_SET_DATE,
  payload: {
    datePickerId,
    newDate,
  },
});
