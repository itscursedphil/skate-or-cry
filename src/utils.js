const getUsers = state => [...state.users];
const getTasks = state => [...state.tasks];
const getTransactions = state => [...state.transactions];
const getCategories = state => [...state.categories];

export { getUsers, getTasks, getTransactions, getCategories };
