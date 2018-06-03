import { SHOW_FINISH_RETRO } from '@/actions/Retro/';

export default function (state = false, action) {
  switch (action.type) {
    case SHOW_FINISH_RETRO: {
      return true;
    }
    default: {
      return state;
    }
  }
}
