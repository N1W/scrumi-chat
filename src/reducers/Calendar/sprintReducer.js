import moment from 'moment';

const sprintReducer = (state = {
  sprint: {
    start: moment('01.08.2017', 'DD.MM.YYYY'),
    end: moment('15.08.2017', 'DD.MM.YYYY'),
  },
}, action) => {
  switch (action.type) {
    default:
      // other event
      break;
  }
  return state;
};

export default sprintReducer;
