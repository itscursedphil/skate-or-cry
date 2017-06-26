import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PageWarning from '../ui/pageWarning';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getUsers, getActiveUserId } from '../users/usersUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { getTransactionsSentTotalForActiveUser } from './transactionsUtils';
import randomSwearWord from '../ui/randomSwearWord';
import { addTransaction } from './transactionsActions';
import Subtitle from '../ui/subtitle';
import PageTitle from '../ui/pageTitle';

class TransactionAddPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userError: false,
      ammount: '',
      ammountError: false,
      comment: '',
      commentError: false
    };

    this.toUserChangedHandler = this.toUserChangedHandler.bind(this);
    this.ammountChangedHandler = this.ammountChangedHandler.bind(this);
    this.commentChangedHandler = this.commentChangedHandler.bind(this);
    this.isUserValid = this.isUserValid.bind(this);
    this.isAmmountValid = this.isAmmountValid.bind(this);
    this.isCommentValid = this.isCommentValid.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  toUserChangedHandler(e, i, v) {
    this.setState({
      ...this.state,
      user: v
    });
  }

  isUserValid() {
    const { user } = this.state;
    return user !== null && user > 0;
  }

  ammountChangedHandler(e) {
    const { totalLeft } = this.props;
    const prevAmmount = this.state.ammount;
    const { value } = e.target;
    const ammount = isNaN(value)
      ? ''
      : value > totalLeft ? prevAmmount : value < 0 ? '' : value;
    this.setState({
      ...this.state,
      ammount
    });
  }

  isAmmountValid() {
    const { ammount } = this.state;
    const { totalLeft } = this.props;
    return !isNaN(ammount) && ammount > 0 && ammount < totalLeft + 1;
  }

  commentChangedHandler(e) {
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  }

  isCommentValid() {
    const { comment } = this.state;
    return comment.length > 0;
  }

  submitHandler(e) {
    e.preventDefault();

    const userValid = this.isUserValid();
    const ammountValid = this.isAmmountValid();
    const commentValid = this.isCommentValid();

    this.setState({
      ...this.state,
      userError: !userValid,
      ammountError: !ammountValid,
      commentError: !commentValid
    });

    const valid = (userValid && ammountValid && commentValid) === true;

    if (!valid) return;

    const { activeUserId } = this.props;
    const { user, ammount, comment } = this.state;
    this.props.submitTransaction(
      activeUserId,
      user,
      ammount,
      comment,
      this.props.history
    );
  }

  render() {
    const { users, totalLeft, activeUserId } = this.props;
    const form = this.state;
    return (
      <PageWarning users>
        <PageTitle title="Bezahlung">
          <Container>
            <Row>
              <Col>
                <form onSubmit={this.submitHandler}>
                  <SelectField
                    floatingLabelText="An:"
                    value={form.user}
                    onChange={this.toUserChangedHandler}
                    hintText="Benutzer auswählen"
                    floatingLabelFixed={true}
                    errorText={
                      form.userError
                        ? `Du musst einen Benutzer auwählen, du ${randomSwearWord()}!`
                        : ''
                    }
                    fullWidth
                  >
                    {[...users]
                      .filter(user => user.id !== activeUserId)
                      .map((user, i) =>
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
                    // min="1"
                    // max={totalLeft}
                    value={form.ammount}
                    onChange={this.ammountChangedHandler}
                    errorText={
                      form.ammountError
                        ? `Bist du zu dumm zum rechnen, du ${randomSwearWord()}?`
                        : ''
                    }
                    fullWidth
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 8 + 'px'
                    }}
                  >
                    <Subtitle>Übrig:</Subtitle>
                    <Chip>
                      {totalLeft - form.ammount} Pts.
                    </Chip>
                  </div>
                  <TextField
                    hintText="Kommentar eingeben"
                    floatingLabelText="Für:"
                    multiLine={true}
                    rows={3}
                    onChange={this.commentChangedHandler}
                    errorText={
                      form.commentError
                        ? `Und für was soll das jetzt sein, du ${randomSwearWord()}?`
                        : ''
                    }
                    fullWidth
                  />
                  <RaisedButton
                    label="Bezahlen"
                    primary={true}
                    fullWidth
                    style={{
                      marginTop: 16 + 'px'
                    }}
                    onTouchTap={this.submitHandler}
                  />
                </form>
              </Col>
            </Row>
          </Container>
        </PageTitle>
      </PageWarning>
    );
  }
}

TransactionAddPage.propTypes = {
  users: PropTypes.array.isRequired,
  activeUserId: PropTypes.number.isRequired,
  totalLeft: PropTypes.number.isRequired,
  submitTransaction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    submitTransaction: (senderId, receiverId, ammount, comment, history) => {
      dispatch(addTransaction(senderId, receiverId, ammount * 1.0, comment));
      history.push('/transactions');
    }
  };
};

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    totalLeft: getTransactionsSentTotalForActiveUser(state),
    activeUserId: getActiveUserId(state)
  };
};

const TransactionAdd = connect(mapStateToProps, mapDispatchToProps)(
  TransactionAddPage
);

export default TransactionAdd;
