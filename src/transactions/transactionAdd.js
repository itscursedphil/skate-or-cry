import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import PageWarning from '../ui/pageWarning';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { getUsers, getActiveUserId } from '../users/usersUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const TransactionAddPage = ({ users, activeUserId }) =>
  <PageWarning users>
    <Container>
      <Row>
        <Col>
          {/* <Subheader>
              An:
            </Subheader> */}
          <SelectField
            floatingLabelText="An:"
            value={null}
            onChange={(e, i, v) => {
              console.log(e, i, v);
            }}
            hintText="Benutzer auswählen"
            floatingLabelFixed={true}
            fullWidth
          >
            {users.map((user, i) =>
              <MenuItem
                style={{
                  paddingTop: 8 + 'px',
                  paddingBottom: 8 + 'px'
                }}
                key={user.id}
                value={user.id}
                label={user.nickname}
                primaryText={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Avatar src={user.image} />
                    <span
                      style={{
                        paddingLeft: 16 + 'px',
                        paddingRight: 16 + 'px'
                      }}
                    >
                      {user.nickname}
                    </span>
                  </div>
                }
              />
            )}
          </SelectField>
          <TextField
            hintText="Betrag eingeben"
            floatingLabelText="Punkte:"
            type="number"
            fullWidth
          />
          <TextField
            hintText="Kommentar eingeben"
            floatingLabelText="Für:"
            multiLine={true}
            rows={3}
            fullWidth
          />
          <RaisedButton
            label="Bezahlen"
            primary={true}
            fullWidth
            style={{
              marginTop: 16 + 'px'
            }}
          />
        </Col>
      </Row>
    </Container>
  </PageWarning>;

TransactionAddPage.propTypes = {
  users: PropTypes.array.isRequired,
  activeUserId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    activeUserId: getActiveUserId(state)
  };
};

const TransactionAdd = connect(mapStateToProps, mapDispatchToProps)(
  TransactionAddPage
);

export default TransactionAdd;
