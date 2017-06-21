import { getActiveUserId } from '../users/usersUtils';

export const getTransactions = state => [...state.transactions.all];

export const getTransactionById = (state, id) =>
  getTransactions(state).find(transaction => transaction.id === id);

export const getTransactionsForUserId = (state, id) => [
  ...getTransactions(state).filter(
    transaction => transaction.senderId === id || transaction.receiverId === id
  )
];

export const getTransactionsForActiveUser = state =>
  getTransactionsForUserId(state, getActiveUserId(state));
