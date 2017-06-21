import { getActiveCategoryId } from '../categories/categoriesUtils';

export const getTasks = state => [...state.tasks.all];
export const getTasksForCategoryId = (state, id) =>
  getTasks(state).filter(task => task.catId === id);
export const getTasksForActiveCategory = state =>
  getTasksForCategoryId(state, getActiveCategoryId(state));
export const getTasksFilter = state => state.tasks.filter;
