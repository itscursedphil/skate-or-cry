import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import PageTitle from '../ui/pageTitle';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { getUsers } from '../users/usersUtils';
import Avatar from 'material-ui/Avatar';
import Subtitle from '../ui/subtitle';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DiceIcon from 'material-ui/svg-icons/places/casino';
import randomSwearWord from '../ui/randomSwearWord';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

class RoulettePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e) {
    e.preventDefault();

    this.setState({
      ...this.state,
      modalOpen: !this.state.modalOpen
    });
  }

  render() {
    const { users } = this.props;
    return (
      <PageTitle title="Roulette">
        <Container>
          <Row>
            <List
              style={{
                width: 100 + '%'
              }}
            >
              {users.map(user =>
                <span key={user.id}>
                  <ListItem
                    leftCheckbox={<Checkbox checked={false} />}
                    primaryText={
                      <div style={{ paddingRight: 32 + 'px' }}>
                        {user.nickname}
                        <span style={{ padding: `8px 0`, display: 'block' }}>
                          <Divider />
                        </span>
                        Lorem i<br />
                        <Subtitle>lkadjflkahsdf</Subtitle>
                      </div>
                    }
                    rightAvatar={<Avatar src={user.image} />}
                  />
                  <Divider />
                </span>
              )}
            </List>
          </Row>
          <FloatingActionButton
            style={{
              position: 'fixed',
              bottom: 16 + 'px',
              right: 16 + 'px',
              zIndex: 999
            }}
            onTouchTap={this.toggleModal}
          >
            <DiceIcon />
          </FloatingActionButton>
          <Dialog
            title="Würfel rollen"
            actions={[
              <RaisedButton label="Abbrechen" onTouchTap={this.toggleModal} />,
              <RaisedButton label="Bestätigen" secondary onTouchTap={null} />
            ]}
            modal={false}
            open={this.state.modalOpen}
            onRequestClose={this.toggleModal}
          >
            Eh {randomSwearWord()}, sicher dass du die Würfel neu rollen willst?
          </Dialog>
        </Container>
      </PageTitle>
    );
  }
}

RoulettePage.propTypes = {
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    users: getUsers(state)
  };
};

const Roulette = connect(mapStateToProps)(RoulettePage);

export default Roulette;
