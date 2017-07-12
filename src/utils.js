import config from './config';
import moment from 'moment';

export const getUsers = state => [...state.users];
export const getTasks = state => [...state.tasks];
export const getTransactions = state => [...state.transactions];
export const getCategories = state => [...state.categories];

export const endDateIsToday = () => {
  const { endDate } = config;
  const today = moment().startOf('day');

  return endDate.isSame(moment().startOf('day'));
};
