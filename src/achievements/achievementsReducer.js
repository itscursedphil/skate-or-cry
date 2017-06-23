import API from '../api.json';

const initialState = API.achievements;

const achievements = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default achievements;
