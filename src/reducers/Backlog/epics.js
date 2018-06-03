/* eslint-disable no-case-declarations */
import v4 from 'uuid/v4';
import update from 'react-addons-update';
import map from 'lodash/map';
import filter from 'lodash/filter';
import find from 'lodash/find';
import * as types from '@/actions/EpicActions';

const initialState = [
  {
    id: v4(),
    descr: 'Click to edit',
    stories: [],
    isBeingEdited: false,
  },
];

export default function (state = initialState, action) {
  switch (action.type) {
    case types.CREATE_EPIC:
      return [...state, action.payload];
    case types.DELETE_EPIC:
      return filter(state, epic => epic.id !== action.payload);
    case types.EDIT_EPIC:
      return map(state, (epic) => {
        if (epic.id === action.payload.id) {
          return {
            ...epic,
            descr: action.payload.value || epic.descr,
            isBeingEdited: action.payload.isBeingEdited,
          };
        }
        return epic;
      });
    case types.ATTACH_TO_EPIC:
      return map(state, (epic) => {
        let stories = [...epic.stories];

        if (epic.stories.includes(action.payload.storyId)) {
          stories = filter(epic.stories, story => story !== action.payload.storyId);
        }

        if (epic.id === action.payload.epicId) {
          stories = [...epic.stories, action.payload.storyId];
        }

        return { ...epic, stories };
      });
    case types.DETACH_FROM_EPIC:
      return map(state, (epic) => {
        let stories = [...epic.stories];
        if (epic.id === action.payload.epicId) {
          stories = filter(epic.stories, story => story !== action.payload.storyId);
        }
        return {
          ...epic,
          stories,
        };
      });
    case types.MOVE_TO_EPIC:
      const sourceId = action.payload.sourceId;
      const targetId = action.payload.targetId;
      const epics = state;

      const sourceEpic = find(epics, epic => epic.stories.includes(sourceId));
      const targetEpic = find(epics, epic => epic.stories.includes(targetId));
      const sourceStoryIndex = sourceEpic.stories.indexOf(sourceId);
      const targetStoryIndex = targetEpic.stories.indexOf(targetId);

      if (sourceEpic === targetEpic) {
        return state.map((epic) => {
          if (epic.id === sourceEpic.id) {
            return {
              ...epic,
              stories: update(sourceEpic.stories, {
                $splice: [
                  [sourceStoryIndex, 1],
                  [targetStoryIndex, 0, sourceId],
                ],
              }),
            };
          }
          return epic;
        });
      }

      return state.map((epic) => {
        if (epic === sourceEpic) {
          return {
            ...epic,
            stories: epic.stories.length > 1
              ? epic.stories
                .slice(0, sourceStoryIndex)
                .concat(epic.stories.slice(sourceStoryIndex + 1))
              : [],
          };
        }

        if (epic === targetEpic) {
          return {
            ...epic,
            stories: epic.stories
              .slice(0, targetStoryIndex)
              .concat([sourceId])
              .concat(epic.stories.slice(targetStoryIndex)),
          };
        }

        return epic;
      });
    default:
      return state;
  }
}

