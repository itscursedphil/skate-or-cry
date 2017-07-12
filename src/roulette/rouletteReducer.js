import { UPDATE_TIMESTAMP } from './rouletteActions';

const initialState = {
  timestamp: null
};

const roulette = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TIMESTAMP:
      return {
        ...state,
        timestamp: action.payload.timestamp
      };

    default:
      return state;
  }
};

export default roulette;
