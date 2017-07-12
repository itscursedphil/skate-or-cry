import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import randomSwearWord from '../ui/randomSwearWord';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveUserId } from '../users/usersUtils';
import { getActiveCategoryId } from '../categories/categoriesUtils';

const WarningStyle1 = ({ text }) =>
  <p>
    Eh du
    {' '}
    {randomSwearWord()}
    , such mal lieber erstmal '{text} aus!
  </p>;

const WarningStyle2 = ({ text }) =>
  <p>
    Du musst erst '{text} auswählen, du {randomSwearWord()}!
  </p>;

const PageWarningComponent = ({
  users,
  categories,
  activeUserId,
  activeCategoryId,
  children
}) => {
  if (process.env.NODE_ENV === 'development') {
    return children;
  }
  if ((users && activeUserId < 0) || (categories && activeCategoryId < 0)) {
    const text = users && activeUserId < 0
      ? 'nen Benutzer'
      : categories && activeCategoryId < 0 ? 'ne Kategorie' : '';
    return (
      <Container>
        <Row style={{ paddingTop: 16 + 'px' }}>
          <Col>
            {!Math.round(Math.random())
              ? <WarningStyle1 text={text} />
              : <WarningStyle2 text={text} />}
            <Link
              to={
                users && activeUserId < 0
                  ? '/users'
                  : categories && activeCategoryId < 0 ? '/categories' : ''
              }
            >
              <RaisedButton label="Zur Auswahl" primary fullWidth />
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
  return children;
};

PageWarningComponent.propTypes = {
  users: PropTypes.bool,
  categories: PropTypes.bool,
  activeUserId: PropTypes.number.isRequired,
  activeCategoryId: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    users: ownProps.users,
    categories: ownProps.categories,
    activeUserId: getActiveUserId(state),
    activeCategoryId: getActiveCategoryId(state)
  };
};

const PageWarning = connect(mapStateToProps)(PageWarningComponent);

export default PageWarning;
