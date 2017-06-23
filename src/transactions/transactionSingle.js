import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import PageWarning from '../ui/pageWarning';
import { getTransactionById } from './transactionsUtils';
import { getUserById } from '../users/usersUtils';
import Divider from 'material-ui/Divider';
import Subtitle from '../ui/subtitle';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import 'moment/locale/de';
import RaisedButton from 'material-ui/RaisedButton';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import Dialog from 'material-ui/Dialog';
import randomSwearWord from '../ui/randomSwearWord';
import { deleteTransaction } from './transactionsActions';

moment.locale('de');

class TransactionSinglePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      sender: {},
      receiver: {},
      ammount: 0,
      comment: '',
      timestamp: 0,
      modal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.deleteTransactionAndRedirect = this.deleteTransactionAndRedirect.bind(
      this
    );
  }

  componentWillMount() {
    let { id } = this.props.match.params;
    id = id * 1.0;

    const {
      senderId,
      receiverId,
      ammount,
      comment,
      timestamp
    } = this.props.getTransaction(id);

    const sender = this.props.getUser(senderId);
    const receiver = this.props.getUser(receiverId);

    this.setState({
      ...this.state,
      id,
      sender,
      receiver,
      ammount,
      comment,
      timestamp
    });
  }

  deleteTransactionAndRedirect() {
    this.props.dispatchDeleteTransaction(this.state.id);
    this.props.history.push('/transactions');
  }

  toggleModal() {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    });
  }

  render() {
    const { sender, receiver, ammount, comment, timestamp } = this.state;

    return (
      <PageWarning users>
        <Container>
          <Row style={{ paddingTop: 16 + 'px' }}>
            <Col>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>Betrag:</Subtitle><br />
                {ammount} Pts.
                <Divider />
              </div>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>Von:</Subtitle><br />
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 8 + 'px'
                  }}
                >
                  {sender.nickname}
                  <Avatar src={sender.image} />
                </span>
                <Divider />
              </div>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>An:</Subtitle><br />
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 8 + 'px'
                  }}
                >
                  {receiver.nickname}
                  <Avatar src={receiver.image} />
                </span>
                <Divider />
              </div>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>Für:</Subtitle><br />
                {comment}
                <Divider />
              </div>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>Am:</Subtitle><br />
                {moment(timestamp).format('dddd, Do MMMM YYYY')}
                <Divider />
              </div>
              <div
                style={{
                  marginBottom: 16 + 'px'
                }}
              >
                <Subtitle>Um:</Subtitle><br />
                {moment(timestamp).format('HH:mm')} Uhr
                <Divider />
              </div>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 32 + 'px'
                }}
              >
                <RaisedButton
                  label="Löschen"
                  icon={<ClearIcon />}
                  secondary
                  onTouchTap={this.toggleModal}
                />
              </div>
            </Col>
          </Row>
          <Dialog
            title="Bezahlung löschen"
            actions={[
              <RaisedButton label="Abbrechen" onTouchTap={this.toggleModal} />,
              <RaisedButton
                label="Löschen"
                secondary
                onTouchTap={this.deleteTransactionAndRedirect}
              />
            ]}
            modal={false}
            open={this.state.modal}
            onRequestClose={this.toggleModal}
          >
            Eh {randomSwearWord()}, sicher dass du die Bezahlung löschen willst?
          </Dialog>
        </Container>
      </PageWarning>
    );
  }
}

TransactionSinglePage.propTypes = {
  getTransaction: PropTypes.func.isRequired,
  dispatchDeleteTransaction: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchDeleteTransaction: id => {
      dispatch(deleteTransaction(id));
    }
  };
};

const mapStateToProps = state => {
  return {
    getTransaction: id => getTransactionById(state, id),
    getUser: id => getUserById(state, id)
  };
};

const TransactionSingle = connect(mapStateToProps, mapDispatchToProps)(
  TransactionSinglePage
);

export default TransactionSingle;
