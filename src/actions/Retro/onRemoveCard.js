import { DELETE_CARD } from '@/actions/Retro';
import { checkStatus, toJSON, handleError } from '@/actions/helpers/fetchData';
import url from './url';

const onRemoveCard = cardID => (dispatch) => {
  const data = new FormData();
  data.append('delete', JSON.stringify({
    id: cardID,
  }));
  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: data,
  })
    .then(checkStatus)
    .then(toJSON)
    .then((result) => {
      if (result) {
        dispatch({
          type: DELETE_CARD,
          cardID,
        });
      } else console.log('Something went wrong: card wasn\'t deleted!');
    })
    .catch(handleError);
};

export default onRemoveCard;
