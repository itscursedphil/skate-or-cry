export const UPDATE_ACHIEVEMENTS = 'UPDATE_ACHIEVEMENTS';

export const updateAchievements = achievements => {
  return {
    type: UPDATE_ACHIEVEMENTS,
    payload: {
      achievements
    }
  };
};
