import moment from 'moment';
import _ from 'lodash';

// function newId(events) {
//   return _.maxBy(events, 'id').id + 1;
// }

const eventReducer = (state = {
  events: [
    // {
    //   id: 3,
    //   start: moment('25.08.2017', 'DD.MM.YYYY'),
    //   end: moment('28.08.2017', 'DD.MM.YYYY'),
    //   type: 4,
    //   assign: 2,
    //   title: 'Спринт',
    //   description: 'Спринт',
    //   location: '',
    // },
  ],
}, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      const newEvent = action.payload;
      // newEvent.id = newId(state.events);
      return {
        ...state,
        events: _.union(state.events, [newEvent]),
      };
    case 'EDIT_EVENT':
      let eventIndex = _.findIndex(state.events, o => (o.id === action.payload.id));
      return {
        ...state,
        events: _.map(state.events, (item, index) => {
          if (index !== eventIndex) {
            return item;
          }
          return {
            ...item,
            ...action.payload,
          };
        }),
      };
    case 'DELETE_EVENT':
      // delete existing event
      eventIndex = _.findIndex(state.events, o => (o.id === action.payload));
      return {
        ...state,
        events: [
          ...state.events.slice(0, eventIndex),
          ...state.events.slice(eventIndex + 1),
        ],
      };
    case 'UPDATE_STORE':
      const newStore = action.payload;
      return {
        ...state,
        events: _.map(newStore, (event) => {
          return {
            ...event,
            type: parseInt(event.type),
            assign: parseInt(event.assign),
            start: moment(event.start, 'x'),
            end: moment(event.end, 'x'),
          }
        })
      };
    default:
      // other event
      break;
  }
  return state;
};

export default eventReducer;
