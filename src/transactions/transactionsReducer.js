import { SET_TRANSACTIONS_FILTER } from './transactionsActions';
import API from '../api.json';

const initialState = {
  all: API.transactions,
  filter: 'all'
};

const transactions = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTIONS_FILTER:
      return {
        ...state,
        filter: action.payload.filter
      };

    default:
      return state;
  }
};

export default transactions;
