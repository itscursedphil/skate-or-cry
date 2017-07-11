import API from '../api.json';
import { UPDATE_ACHIEVEMENTS, ADD_ACHIEVEMENT } from './achievementsActions';

// const initialState = [...API.achievements].sort((a, b) => a.id - b.id);
const initialState = [];

const achievements = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACHIEVEMENT:
      return [...state, { ...action.payload }];

    case UPDATE_ACHIEVEMENTS:
      return [
        ...state.filter(
          achievement =>
            action.payload.achievements.find(a => a.id === achievement.id) ===
            undefined
        ),
        ...action.payload.achievements
      ].sort((a, b) => a.id - b.id);

    default:
      return state;
  }
};

export default achievements;
