import { TAKE_TO_NEXT_SPRINT } from '@/actions/Retro';
import { checkStatus, toJSON, handleError } from '@/actions/helpers/fetchData';
import url from './url';

const onEditCard = (dataToSend, action) => (dispatch) => {
  const next = action === TAKE_TO_NEXT_SPRINT ? +(!dataToSend.next) : +dataToSend.next;
  const formData = new FormData();
  formData.append('update', JSON.stringify(
    { ...dataToSend, next }));
  const options = {
    method: 'POST',
    credentials: 'same-origin',
    body: formData,
  };

  fetch(url, options)
    .then(checkStatus)
    .then(toJSON)
    .then((result) => {
      if (result) {
        dispatch({
          type: action,
          card: dataToSend,
        });
      } else console.log('Something went wrong: data wasn\'t sent!');
    })
    .catch(handleError);
};

export default onEditCard;
