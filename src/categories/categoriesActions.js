export const ADD_CATEGORY = 'ADD_CATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const addCategory = ({ title, id }) => {
  return {
    type: ADD_CATEGORY,
    payload: {
      title,
      id
    }
  };
};

export const selectCategory = id => {
  return {
    type: SELECT_CATEGORY,
    payload: {
      id
    }
  };
};
