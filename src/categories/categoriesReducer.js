import { SELECT_CATEGORY } from './categoriesActions';
import API from '../api.json';

const initialState = {
  all: API.categories,
  active: -1
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        active: action.payload.id
      };

    default:
      return state;
  }
};

export default categories;
