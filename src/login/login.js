import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import PageTitle from '../ui/pageTitle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isAuthenticated } from '../authentication/authenticationUtils';
import { loginUserRequest } from '../authentication/authenticationActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sending: false
    };

    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  submitLoginForm(e) {
    e.preventDefault();
    // this.setState({
    //   ...this.state,
    //   sending: true
    // });
    this.props.loginUserRequest(this.username, this.password);
  }

  render() {
    const { sending } = this.state;
    const { authenticated } = this.props;
    if (authenticated) return <Redirect to="/users" />;
    return (
      <PageTitle title="Login">
        <Container>
          <Row>
            <Col xs="12">
              <TextField
                floatingLabelText="Username"
                style={{ width: 100 + '%' }}
                onChange={(e, val) => (this.username = val)}
              />
            </Col>
            <Col xs="12">
              <TextField
                onChange={(e, val) => (this.password = val)}
                floatingLabelText="Passwort"
                type="password"
                style={{ width: 100 + '%' }}
              />
            </Col>
            <Col xs="12">
              <RaisedButton
                label={sending ? 'Logging in...' : 'Login'}
                primary
                fullWidth
                style={{ marginTop: 20 + 'px' }}
                onTouchTap={this.submitLoginForm}
                disabled={sending}
              />
            </Col>
          </Row>
        </Container>
      </PageTitle>
    );
  }
}

LoginPage.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  loginUserRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    authenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = {
  loginUserRequest
};

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage);

export default Login;
