import {
  LOAD_CARDS,
  ADD_CARD,
  TAKE_TO_NEXT_SPRINT,
  EDIT_CARD,
  DELETE_CARD,
} from '@/actions/Retro/';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_CARD: {
      return [...state, action.card];
    }
    case LOAD_CARDS: {
      return [...action.payload];
    }
    case DELETE_CARD: {
      return state.filter(card => card.id !== action.cardID);
    }
    case EDIT_CARD: {
      return state.map((card) => {
        if (card.id === action.card.id) {
          return {
            ...card,
            text: action.card.text,
          };
        }
        return card;
      });
    }
    case TAKE_TO_NEXT_SPRINT: {
      return state.map((card) => {
        if (card.id === action.card.id && card.area !== 4) {
          return {
            ...card,
            next: !card.next,
          };
        }
        return card;
      });
    }
    default: {
      return state;
    }
  }
}
