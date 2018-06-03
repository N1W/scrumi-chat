import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import backlogReducers from './Backlog';
import boardReducers from './Board';
import calendarReducers from './Calendar';
import chatReducers from './Chat';
import projectReducers from './Project';
import retroReducers from './Retro';
import generalReduces from './Masthead';

export default combineReducers({
  ...backlogReducers,
  ...boardReducers,
  ...calendarReducers,
  ...chatReducers,
  ...projectReducers,
  ...retroReducers,
  ...generalReduces,
  routing,
});
