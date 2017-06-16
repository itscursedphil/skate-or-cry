import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import RandomSwearWord from '../ui/randomSwearWord';

const WarningStyle1 = ({ text }) =>
  <p>
    Eh du
    {' '}
    <RandomSwearWord />
    , such mal lieber erstmal '{text} aus!
  </p>;

const WarningStyle2 = ({ text }) =>
  <p>
    Du musst erst '{text} auswählen, du <RandomSwearWord />!
  </p>;

const PageWarning = ({ users, categories }) => {
  const text = users ? 'nen Benutzer' : categories ? 'ne Kategorie' : '';
  return (
    <Container>
      <Row style={{ paddingTop: 16 + 'px' }}>
        <Col>
          {!Math.round(Math.random())
            ? <WarningStyle1 text={text} />
            : <WarningStyle2 text={text} />}
          <Link to={users ? '/users' : categories ? '/categories' : ''}>
            <RaisedButton label="Zur Auswahl" primary fullWidth />
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PageWarning;
