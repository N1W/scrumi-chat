/* eslint-disable no-case-declarations */
import filter from 'lodash/filter';
import find from 'lodash/find';
import moment from 'moment';
import * as types from '@/actions/SprintActions';

const defaultEvents = {
  start: moment().valueOf(),
  finish: moment().add(7, 'days').valueOf(),
  demoStart: moment().add(7, 'days').valueOf(),
  demoFinish: moment().add(7, 'days').valueOf(),
  startVisible: false,
  finishVisible: false,
  demoStartVisible: false,
  demoFinishVisible: false,
};

const initialState = {
  current: {
    isActive: false,
    stories: [],
  },
  inPlanning: {
    isBeingPlanned: false,
    stories: [],
    events: {
      start: moment().valueOf(),
      finish: moment().add(7, 'days').valueOf(),
      demoStart: moment().add(7, 'days').valueOf(),
      demoFinish: moment().add(7, 'days').valueOf(),
      startVisible: false,
      finishVisible: false,
      demoStartVisible: false,
      demoFinishVisible: false,
    },
  },
  inEditing: {},
  planned: [],
  finished: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.START_SPRINT_PLANNING:
      return {
        ...state,
        inPlanning: {
          ...state.inPlanning,
          isBeingPlanned: true,
        },
      };
    case types.CANCEL_SPRINT_PLANNING:
      return {
        ...state,
        inPlanning: {
          isBeingPlanned: false,
          stories: [],
          events: { ...defaultEvents },
        },
      };
    case types.FINISH_SPRINT_PLANNING:
      return {
        ...state,
        inPlanning: {
          isBeingPlanned: false,
          stories: [],
          events: { ...defaultEvents },
        },
        planned: [...state.planned, action.payload],
      };
    case types.SET_CURRENT_SPRINT:
      const date = action.payload;
      const sprint = find(
        state.planned,
        x => date >= x.events.start && date <= x.events.finish,
      );

      if (sprint) {
        if (state.current.isActive && state.current.events.finish > date) {
          return {
            ...state,
            current: {
              ...sprint,
              isActive: true,
            },
            planned: filter(state.planned, x => x.id !== sprint.id),
            finished: [
              ...state.finished,
              {
                ...state.current,
                isActive: false,
              },
            ],
          };
        }

        return {
          ...state,
          current: {
            ...sprint,
            isActive: true,
          },
          planned: filter(state.planned, x => x.id !== sprint.id),
        };
      }
      // если не нашли подходящего спринта, нужно сделать проверку не
      // закончился ли текущий спринт, если закончился кинуть его в finished
      // и обнулить state.current
      return state;
    case types.ADD_TO_SPRINT:
      return {
        ...state,
        inPlanning: {
          ...state.inPlanning,
          stories: [...state.inPlanning.stories, action.payload],
        },
      };
    case types.REMOVE_FROM_SPRINT:
      return {
        ...state,
        inPlanning: {
          ...state.inPlanning,
          stories: filter(state.inPlanning.stories, storyId => storyId !== action.payload),
        },
      };
    case types.CLEAN_UP_SPRINT:
      return {
        ...state,
        current: {
          ...state.current,
          stories: filter(state.inPlanning.stories, storyId => !action.payload.includes(storyId)),
        },
        inPlanning: {
          ...state.inPlanning,
          stories: filter(state.inPlanning.stories, storyId => !action.payload.includes(storyId)),
        },
      };
    case types.DELETE_SPRINT:
      if (action.payload.isCurrent) {
        return {
          ...state,
          current: {
            isActive: false,
            stories: [],
          },
        };
      }
      return {
        ...state,
        planned: filter(state.planned, x => x.id !== action.payload.id),
      };
    case types.DP_SET_VISIBILITY:
      const datePickerVisible = [
        'startVisible',
        'finishVisible',
        'demoStartVisible',
        'demoFinishVisible',
      ];
      return {
        ...state,
        inPlanning: {
          ...state.inPlanning,
          events: {
            ...state.inPlanning.events,
            [datePickerVisible[action.payload.datePickerId]]: action.payload.visible,
          },
        },
      };
    case types.DP_SET_DATE:
      const datePickerDate = ['start', 'finish', 'demoStart', 'demoFinish'];
      return {
        ...state,
        inPlanning: {
          ...state.inPlanning,
          events: {
            ...state.inPlanning.events,
            [datePickerDate[action.payload.datePickerId]]: action.payload.newDate.valueOf(),
          },
        },
      };
    default:
      return state;
  }
}
