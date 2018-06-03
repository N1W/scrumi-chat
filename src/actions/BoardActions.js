export const INIT_BOARD = 'INIT_BOARD';
export const RESET_BOARD = 'RESET_BOARD';
export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';
export const MOVE_TO_LANE = 'MOVE_TO_LANE';


export const initBoard = (isSprintActive, taskIds) => ({
  type: INIT_BOARD,
  payload: {
    isSprintActive,
    taskIds,
  },
});

export const attachToLane = (laneId, taskId) => ({
  type: ATTACH_TO_LANE,
  payload: {
    laneId,
    taskId,
  },
});

export const moveToLane = (sourceId, targetId) => ({
  type: MOVE_TO_LANE,
  payload: {
    sourceId,
    targetId,
  },
});

export const resetBoard = () => ({
  type: RESET_BOARD,
});


// export const CREATE_LANE = 'CREATE_LANE';
// export const DELETE_LANE = 'DELETE_LANE';
// export const EDIT_LANE_NAME = 'EDIT_LANE_NAME';

// export const createLane = () => ({
//   type: CREATE_LANE,
//   payload: {
//     id: v4(),
//     name: 'New Lane',
//     tasks: [],
//     isBeingEdited: false,
//   },
// });
//
// export const deleteLane = id => ({
//   type: DELETE_LANE,
//   payload: id,
// });
//
// export const editLaneName = (id, isBeingEdited, value) => ({
//   type: EDIT_LANE_NAME,
//   payload: {
//     id,
//     isBeingEdited,
//     value,
//   },
// });

