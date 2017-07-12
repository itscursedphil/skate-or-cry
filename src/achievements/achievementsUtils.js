export const getAchievements = state => state.achievements;

export const getAchievementsForUserId = (state, userId) =>
  state.achievements.filter(achievement => achievement.userId === userId);

export const getUpdatedAchievementsState = (
  achievements,
  updatedAchievements
) =>
  [
    ...achievements.filter(
      achievement =>
        updatedAchievements.find(a => a.id === achievement.id) === undefined
    ),
    ...updatedAchievements
  ].sort((a, b) => a.id - b.id);
