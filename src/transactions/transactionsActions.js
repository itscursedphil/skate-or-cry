export const SET_TRANSACTIONS_FILTER = 'SET_TRANSACTIONS_FILTER';

export const setTransactionsFilter = filter => {
  return {
    type: SET_TRANSACTIONS_FILTER,
    payload: {
      filter
    }
  };
};
