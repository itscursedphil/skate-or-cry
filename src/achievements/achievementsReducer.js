import { UPDATE_ACHIEVEMENTS, ADD_ACHIEVEMENT } from "./achievementsActions";

// const initialState = [...API.achievements].sort((a, b) => a.id - b.id);
const initialState = [];

const achievements = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACHIEVEMENT:
      return [...state, { ...action.payload }];

    // case UPDATE_ACHIEVEMENTS:
    //   return [
    //     ...state.filter(
    //       achievement =>
    //         action.payload.find(a => a.id === achievement.id) === undefined
    //     ),
    //     ...action.payload
    //   ].sort((a, b) => a.id - b.id);

    case UPDATE_ACHIEVEMENTS:
      return [...action.payload];

    default:
      return state;
  }
};

export default achievements;
