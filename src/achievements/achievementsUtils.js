export const getAchievements = state => state.achievements;

export const getAchievementsForUserId = (state, userId) =>
  state.achievements.filter(achievement => achievement.userId === userId);
