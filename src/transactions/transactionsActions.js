export const SET_TRANSACTIONS_FILTER = 'SET_TRANSACTIONS_FILTER';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

export const setTransactionsFilter = filter => {
  return {
    type: SET_TRANSACTIONS_FILTER,
    payload: {
      filter
    }
  };
};

export const addTransaction = ({
  senderId,
  receiverId,
  ammount,
  comment,
  timestamp,
  id
}) => {
  return {
    type: ADD_TRANSACTION,
    payload: {
      senderId,
      receiverId,
      ammount,
      comment,
      timestamp,
      id
    }
  };
};

export const deleteTransaction = id => {
  return {
    type: DELETE_TRANSACTION,
    payload: {
      id
    }
  };
};
