import moment from 'moment';
import _ from 'lodash';

const datePickerReducer = (state = {
  datePicker: {

  },
}, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return;
    default:
      // other event
      break;
  }
  return state;
};

export default datePickerReducer;
