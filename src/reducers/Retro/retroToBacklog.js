import { FINISH_RETRO } from '@/actions/Retro';

export default function (state = [], action) {
  switch (action.type) {
    case FINISH_RETRO: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}
