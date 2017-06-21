export const getCategories = state => [...state.categories.all];

export const getCategoryById = (state, id) =>
  getCategories(state).find(category => category.id === id);

export const getActiveCategoryId = state => state.categories.active;

export const getActiveCategory = state =>
  getCategories(state)[getActiveCategoryId(state)];
