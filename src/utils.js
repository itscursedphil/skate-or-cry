import config from "./config";
import moment from "moment";

export const getUsers = state => [...state.users];
export const getTasks = state => [...state.tasks];
export const getTransactions = state => [...state.transactions];
export const getCategories = state => [...state.categories];

export const todayIsWhileTrip = () => {
  const { startDate, endDate } = config;
  const today = moment().startOf("day");

  const todayIsAfterStartDate = today.isAfter(startDate);
  const todayIsBeforeEndDate = today.isBefore(endDate);
  const todayIsWhileTrip = todayIsAfterStartDate && todayIsBeforeEndDate;

  if (process.env.NODE_ENV === "development") {
    console.log("Start of trip:", startDate);
    console.log("End of trip:", endDate);
    console.log("Today:", today);
    console.log("Today is after start date:", todayIsAfterStartDate);
    console.log("Today is before end date:", todayIsBeforeEndDate);
    console.log("Today is while trip:", todayIsWhileTrip);
  }

  // if (process.env.NODE_ENV === 'development') return true;

  if (todayIsAfterStartDate && !todayIsBeforeEndDate) return false;

  return todayIsWhileTrip;
};
