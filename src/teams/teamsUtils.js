import { getUsers } from "../users/usersUtils";

export const getTeams = state =>
  getUsers(state)
    .map(({ team }) => team)
    .reduce(
      (teams, team) => (teams.find(t => t === team) ? teams : [...teams, team]),
      []
    );

export const getTeamCompletedTasks = (state, team) =>
  getUsers(state)
    .filter(({ team: userTeam }) => userTeam === team)
    .map(({ completedTasks }) => completedTasks)
    .reduce((teamTasks, userTasks) => [...teamTasks, ...userTasks], []);
