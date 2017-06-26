import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Subheader from 'material-ui/Subheader';
import { getReceivedTransactionsForUserId } from '../transactions/transactionsUtils';
import { getAchievementsForUserId } from '../achievements/achievementsUtils';
import PageTitle from '../ui/pageTitle';

const ResultsPage = ({ users, getUserPoints }) => {
  const sortedUsers = [...users].sort((userA, userB) => {
    const userAScores = getUserPoints(userA);
    const userBScores = getUserPoints(userB);
    return userBScores - userAScores;
  });
  return (
    <PageTitle title="Ergebnisse">
      <Container>
        <Row className="flex-colum" style={{ padding: '16px 0 32px 0' }}>
          <Col xs={12} className="d-flex justify-content-center">
            <Subheader style={{ textAlign: 'center', paddingLeft: 0 }}>
              Gewinner:
            </Subheader>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <Avatar src={sortedUsers[0].image} size={120} />
          </Col>
          <Col
            xs={12}
            className="d-flex justify-content-center"
            style={{ marginTop: 16 + 'px' }}
          >
            <h3>{sortedUsers[0].nickname}</h3>
          </Col>
          <Col xs={12} className="d-flex justify-content-center">
            <Chip>
              {getUserPoints(sortedUsers[0])} Pts.
            </Chip>
          </Col>
        </Row>
        <Row>
          <List
            style={{
              width: 100 + '%'
            }}
          >
            <Divider />
            {sortedUsers.filter((u, i) => i !== 0).map((user, i) =>
              <span key={user.id}>
                <ListItem
                  primaryText={
                    <span
                      style={{
                        width: 100 + '%',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Avatar src={user.image} />
                      <span
                        style={{
                          marginLeft: 16 + 'px'
                        }}
                      >
                        {user.nickname}
                      </span>
                      <Chip
                        style={{
                          marginLeft: 'auto'
                        }}
                      >
                        {getUserPoints(user)} Pts.
                      </Chip>
                    </span>
                  }
                  // secondaryText={user.name}
                />
                <Divider />
              </span>
            )}
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
  return {
    users: state.users.all,
    getUserPoints: user => {
      const tasksPoints = user.completed
        .map(task => task.points)
        .reduce((acc, val) => acc + val * 1.0, 0);
      const transactionsPoints = getReceivedTransactionsForUserId(
        state,
        user.id
      )
        .map(transaction => transaction.ammount)
        .reduce((acc, val) => acc + val * 1.0, 0);
      const achievementPoints = getAchievementsForUserId(state, user.id)
        .map(achievement => achievement.points)
        .reduce((acc, val) => acc + val * 1.0, 0);
      return tasksPoints + transactionsPoints + achievementPoints;
    }
  };
};

const Results = connect(mapStateToProps, mapDispatchToProps)(ResultsPage);

export default Results;
