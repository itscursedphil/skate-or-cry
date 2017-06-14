export const SELECT_CATEGORY = 'SELECT_CATEGORY';

export const selectCategory = id => {
  return {
    type: SELECT_CATEGORY,
    payload: {
      id
    }
  };
};
