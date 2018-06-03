import { combineReducers } from 'redux';
import epics from './epics';
import stories from './stories';
import tasks from './tasks';
import sprints from './sprints';
import storyModal from './storyModal';
import taskModal from './taskModal';

const backlog = combineReducers({
  epics,
  stories,
  tasks,
});

export default {
  backlog,
  sprints,
  storyModal,
  taskModal,
};
