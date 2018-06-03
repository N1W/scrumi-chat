import { ADD_CARD } from '@/actions/Retro';
import { checkStatus, toJSON, handleError } from '@/actions/helpers/fetchData';
import url from './url';

const onAddCard = dataToSend => (dispatch) => {
  const mapData = {
    area: dataToSend.area,
    next: dataToSend.area === 4 ? 1 : 0,
    text: dataToSend.text,
    hidden: +(dataToSend.hidden),
  };

  const formData = new FormData();
  formData.append('create', JSON.stringify(mapData));
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
        const card = {
          ...dataToSend,
          next: (dataToSend.area === 4),
          id: result,
          author: +localStorage.getItem('id'),
        };
        dispatch({
          type: ADD_CARD,
          card,
        });
      }
    })
    .catch(handleError);
};

export default onAddCard;
