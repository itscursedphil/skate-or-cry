import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getAchievements } from './achievementsUtils';
import { getUsers } from '../users/usersUtils';

const AchievementsPage = ({ achievements, users }) =>
  <Container>
    <Row>
      <Col>
        Achievements
      </Col>
    </Row>
  </Container>;

AchievementsPage.propTypes = {};

const mapStateToProps = state => {
  return {
    achievements: getAchievements(state),
    users: getUsers(state)
  };
};

const Achievements = connect(mapStateToProps)(AchievementsPage);

export default Achievements;
