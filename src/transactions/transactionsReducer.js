import {
  SET_TRANSACTIONS_FILTER,
  ADD_TRANSACTION
} from './transactionsActions';
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

    case ADD_TRANSACTION:
      return {
        ...state,
        all: [
          ...state.all,
          {
            id: state.all.length,
            ammount: action.payload.ammount,
            senderId: action.payload.senderId,
            receiverId: action.payload.receiverId,
            comment: action.payload.comment
          }
        ]
      };

    default:
      return state;
  }
};

export default transactions;
