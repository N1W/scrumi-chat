import { GET_USERS } from '@/actions/Masthead/';
import { checkStatus, toJSON } from '@/actions/helpers/fetchData';

const onGetUsers = () => (dispatch) => {
  fetch('/ajax/users', {
  // fetch('http://scrumi.dev/users.php', {
  // fetch('https://postpsychology.com.ua/users.php', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(toJSON)
    // .then(toConsole)
    .then((result) => {
      // console.log('user array', result);
      dispatch({
        type: GET_USERS,
        payload: result,
      });
    })
    .catch((error) => {
      console.log('error fetching user array: ', error);
    });
};

export default onGetUsers;
