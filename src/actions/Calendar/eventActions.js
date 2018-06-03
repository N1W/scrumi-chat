/**
 *  *  * Created by khlopik on 7/20/17.
 */

export function addEvent(event) {
  return {
    type: 'ADD_EVENT',
    payload: event,
  };
}

export function editEvent(event) {
  return {
    type: 'EDIT_EVENT',
    payload: event,
  };
}

export function deleteEvent(eventId) {
  return {
    type: 'DELETE_EVENT',
    payload: eventId,
  };
}

export function updateStore(response) {
  return {
    type: 'UPDATE_STORE',
    payload: response,
  };
}
