/* eslint-disable no-case-declarations */
import v4 from 'uuid/v4';
import update from 'react-addons-update';
import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import flow from 'lodash/fp/flow';
import mapFP from 'lodash/fp/map';
import flatten from 'lodash/fp/flatten';
import * as types from '@/actions/BoardActions';

const initialState = {
  lanes: [
    { id: v4(), name: 'Запланировано', tasks: [] },
    { id: v4(), name: 'В процессе', tasks: [] },
    { id: v4(), name: 'Тестирование', tasks: [] },
    { id: v4(), name: 'Сделано', tasks: [] },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.INIT_BOARD:
      // SPRINT STATE PERSISTENCE LOGIC
      // если заэдитили спринт, при открытии борда нужно взять снова весь спринт
      // массив id тасков
      // пройтись по всем lanes и фильтрануть на taskId's includes, если не includes то удалять
      // после чего собрать все id тасков со всех lane и оставить в taskIds только те что не входят
      // после чего добавить taskIds в первый lane
      if (action.payload.isSprintActive) {
        const taskIds = action.payload.taskIds;
        const filteredLanes = map(state.lanes, lane => ({
          ...lane,
          tasks: filter(lane.tasks, task => taskIds.includes(task)),
        }));
        const currentTasks = flow(
          mapFP(lane => lane.tasks),
          flatten,
        )(filteredLanes);
        const remainingTasks = filter(taskIds, task => !currentTasks.includes(task));

        return {
          lanes: [
            {
              ...filteredLanes[0],
              tasks: [
                ...filteredLanes[0].tasks,
                ...remainingTasks,
              ],
            },
            ...filteredLanes.slice(1),
          ],
        };
      }

      return {
        lanes: [
          { id: v4(), name: 'Запланировано', tasks: action.payload.taskIds || [] },
          { id: v4(), name: 'В процессе', tasks: [] },
          { id: v4(), name: 'Тестирование', tasks: [] },
          { id: v4(), name: 'Сделано', tasks: [] },
        ],
      };
    case types.ATTACH_TO_LANE:
      if (action.payload.laneId === null) {
        return {
          lanes: [
            {
              ...state.lanes[0],
              tasks: [
                ...state.lanes[0].tasks,
                action.payload.taskId,
              ],
            },
            ...state.lanes.slice(1),
          ],
        };
      }

      return {
        ...state,
        lanes: map(state.lanes, (lane) => {
          let tasks = [...lane.tasks];

          if (lane.tasks.includes(action.payload.taskId)) {
            tasks = filter(lane.tasks, task => task !== action.payload.taskId);
          }

          if (lane.id === action.payload.laneId) {
            tasks = [...lane.tasks, action.payload.taskId];
          }

          return { ...lane, tasks };
        }),
      };
    case types.MOVE_TO_LANE:
      const sourceId = action.payload.sourceId;
      const targetId = action.payload.targetId;
      const lanes = state.lanes;

      const sourceLane = find(lanes, lane => lane.tasks.includes(sourceId));
      const targetLane = find(lanes, lane => lane.tasks.includes(targetId));
      const sourceTaskIndex = sourceLane.tasks.indexOf(sourceId);
      const targetTaskIndex = targetLane.tasks.indexOf(targetId);


      if (sourceLane === targetLane) {
        return {
          ...state,
          lanes: state.lanes.map((lane) => {
            if (lane.id === sourceLane.id) {
              return {
                ...lane,
                tasks: update(sourceLane.tasks, {
                  $splice: [
                    [sourceTaskIndex, 1],
                    [targetTaskIndex, 0, sourceId],
                  ],
                }),
              };
            }
            return lane;
          }),
        };
      }

      return {
        ...state,
        lanes: state.lanes.map((lane) => {
          if (lane === sourceLane) {
            return {
              ...lane,
              tasks: lane.tasks.length > 1
                ? lane.tasks
                  .slice(0, sourceTaskIndex)
                  .concat(lane.tasks.slice(sourceTaskIndex + 1))
                : [],
            };
          }

          if (lane === targetLane) {
            return {
              ...lane,
              tasks: lane.tasks
                .slice(0, targetTaskIndex)
                .concat([sourceId])
                .concat(lane.tasks.slice(targetTaskIndex)),
            };
          }

          return lane;
        }),
      };
    case types.RESET_BOARD:
      return {
        lanes: [
          { id: v4(), name: 'Todo', tasks: [] },
          { id: v4(), name: 'In progress', tasks: [] },
          { id: v4(), name: 'To verify', tasks: [] },
          { id: v4(), name: 'Done', tasks: [] },
        ],
      };
    default:
      return state;
  }
}

// case types.CREATE_LANE:
// return {
//   ...state,
//   lanes: [...state.lanes, action.payload],
// };
// case types.DELETE_LANE:
// return {
//   ...state,
//   lanes: filter(state.lanes, lane => lane.id !== action.payload),
// };
// case types.EDIT_LANE_NAME:
// return {
//   ...state,
//   lanes: map(state.lanes, (lane) => {
//     if (lane.id === action.payload.id) {
//       return {
//         ...lane,
//         name: action.payload.value || lane.name,
//         isBeingEdited: action.payload.isBeingEdited,
//       };
//     }
//     return lane;
//   }),
// };
