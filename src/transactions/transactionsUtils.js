import { getActiveUserId } from '../users/usersUtils';

export const getTransactions = state => [...state.transactions.all];

export const getTransactionById = (state, id) =>
  getTransactions(state).find(transaction => transaction.id === id);

export const getTransactionsForUserId = (state, id) => [
  ...getTransactions(state).filter(
    transaction => transaction.senderId === id || transaction.receiverId === id
  )
];

const getSentTransactionsForUserId = (state, id) =>
  [...getTransactionsForUserId(state, id)].filter(
    transaction => transaction.senderId === id
  );

const getReceivedTransactionsForUserId = (state, id) =>
  [...getTransactionsForUserId(state, id)].filter(
    transaction => transaction.receiverId === id
  );

export const getTransactionsSentTotalForUserId = (state, id) =>
  150 -
  getSentTransactionsForUserId(state, id).reduce(
    (total, transaction) => total + transaction.ammount,
    0
  );

export const getTransactionsForActiveUser = state =>
  getTransactionsForUserId(state, getActiveUserId(state));

export const getSentTransactionsForActiveUser = state =>
  getSentTransactionsForUserId(state, getActiveUserId(state));

export const getReceivedTransactionsForActiveUser = state =>
  getReceivedTransactionsForUserId(state, getActiveUserId(state));

export const getTransactionsSentTotalForActiveUser = state =>
  getTransactionsSentTotalForUserId(state, getActiveUserId(state));

export const getTransactionsFilter = state => state.transactions.filter;

export const getFilteredTransactionsForUserId = (state, id) => {
  const filter = getTransactionsFilter(state);
  switch (filter) {
    case 'sent':
      return getSentTransactionsForUserId(state, id);

    case 'received':
      return getReceivedTransactionsForUserId(state, id);

    default:
      return getTransactionsForUserId(state, id);
  }
};

export const getFilteredTransactionsForActiveUser = state =>
  getFilteredTransactionsForUserId(state, getActiveUserId(state));
