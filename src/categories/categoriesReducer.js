import { SELECT_CATEGORY, ADD_CATEGORY } from "./categoriesActions";

// const initialState = {
//   all: API.categories,
//   active: -1
// };

const initialState = {
  all: [],
  active: -1
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        all: [...state.all, { ...action.payload }]
      };

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
