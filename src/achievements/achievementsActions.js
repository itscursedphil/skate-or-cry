export const ADD_ACHIEVEMENT = 'ADD_ACHIEVEMENT';
export const UPDATE_ACHIEVEMENTS = 'UPDATE_ACHIEVEMENTS';

export const addAchievement = ({ title, points, userId, id }) => {
  return {
    type: ADD_ACHIEVEMENT,
    payload: {
      title,
      points,
      userId,
      id
    }
  };
};

export const updateAchievements = achievements => {
  return {
    type: UPDATE_ACHIEVEMENTS,
    payload: {
      achievements
    }
  };
};
