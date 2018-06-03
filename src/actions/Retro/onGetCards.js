import {LOAD_CARDS} from '@/actions/Retro';
import {checkStatus, toJSON, handleError} from '@/actions/helpers/fetchData';
import url from './url';

const onGetCards = () => (dispatch) => {
  fetch(url, {
    // fetch('broken', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(checkStatus)
    .then(toJSON)
    .then((result) => {
      const newJSON = result.map(card => (
        {
          ...card,
          next: !!(+card.next),
          hidden: !!(+card.hidden),
          area: +card.area,
          author: +card.author,
        }));
      dispatch({
        type: LOAD_CARDS,
        payload: newJSON,
      });
    })
    .catch(handleError);
};

export default onGetCards;
