import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import { List } from "material-ui/List";
import { ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import { connect } from "react-redux";
import Avatar from "material-ui/Avatar";
import Chip from "material-ui/Chip";
import Subheader from "material-ui/Subheader";
import { getReceivedTransactionsForUserId } from "../transactions/transactionsUtils";
import { getAchievementsForUserId } from "../achievements/achievementsUtils";
import PageTitle from "../ui/pageTitle";
import { Redirect } from "react-router-dom";
import { todayIsWhileTrip } from "../utils";
import { getTeams } from "../teams/teamsUtils";

const ResultsPage = ({ users, teams, getUserPoints }) => {
  if (!todayIsWhileTrip()) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }

  const teamPoints = teams.map(team =>
    users
      .filter(({ team: userTeam }) => userTeam === team)
      .map(teamUser => getUserPoints(teamUser))
      .reduce(
        (team, userPoints) => ({
          ...team,
          points: team.points + userPoints
        }),
        { team, points: 0 }
      )
  );

  const sortedTeams = [...teamPoints].sort(
    (teamA, teamB) => teamB.points - teamA.points
  );

  return (
    <PageTitle title="Ergebnisse">
      <Container>
        {/* {sortedTeams.length && (
          <Row className="flex-colum" style={{ padding: "16px 0 32px 0" }}>
            <Col xs={12} className="d-flex justify-content-center">
              <Subheader style={{ textAlign: "center", paddingLeft: 0 }}>
                Gewinner:
              </Subheader>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <Avatar src={sortedUsers[0].image} size={120} />
            </Col>
            <Col
              xs={12}
              className="d-flex justify-content-center"
              style={{ marginTop: 16 + "px" }}
            >
              <h3>{sortedUsers[0].nickname}</h3>
            </Col>
            <Col xs={12} className="d-flex justify-content-center">
              <Chip>{getUserPoints(sortedUsers[0])} Pts.</Chip>
            </Col>
          </Row>
        )} */}
        <Row>
          <List
            style={{
              width: 100 + "%"
            }}
          >
            <Divider />
            {sortedTeams.map((team, i) => (
              <span key={team.team}>
                <ListItem
                  primaryText={
                    <span
                      style={{
                        width: 100 + "%",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span
                        style={{
                          marginLeft: 16 + "px"
                        }}
                      >
                        {team.team}
                      </span>
                      <Chip
                        style={{
                          marginLeft: "auto"
                        }}
                      >
                        {team.points} Pts.
                      </Chip>
                    </span>
                  }
                  // secondaryText={user.name}
                />
                <Divider />
              </span>
            ))}
          </List>
        </Row>
      </Container>
    </PageTitle>
  );
};

ResultsPage.propTypes = {
  users: PropTypes.array.isRequired,
  getUserPoints: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  const users = state.users.all;

  const teams = getTeams(state) || [];

  const getUserPoints = user => {
    const completedTasksPoints = user.completedTasks
      .map(task => task.points)
      .reduce((acc, val) => acc + val * 1.0, 0);
    const failedTasksPoints = user.failedTasks
      .map(task => task.points)
      .reduce((acc, val) => acc + val * 1.0, 0);
    const transactionsPoints = getReceivedTransactionsForUserId(state, user.id)
      .map(transaction => transaction.ammount)
      .reduce((acc, val) => acc + val * 1.0, 0);
    const achievementPoints = getAchievementsForUserId(state, user.id)
      .map(achievement => achievement.points)
      .reduce((acc, val) => acc + val * 1.0, 0);
    return (
      completedTasksPoints +
      transactionsPoints +
      achievementPoints -
      failedTasksPoints
    );
  };

  return {
    users,
    teams,
    getUserPoints
  };
};

const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsPage);

export default Results;
