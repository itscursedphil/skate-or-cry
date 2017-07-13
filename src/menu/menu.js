import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionFace from 'material-ui/svg-icons/action/face';
import ImageCollections from 'material-ui/svg-icons/image/collections';
import EditorList from 'material-ui/svg-icons/editor/format-list-bulleted';
import SocialCake from 'material-ui/svg-icons/social/cake';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import StarIcon from 'material-ui/svg-icons/action/grade';
import DiceIcon from 'material-ui/svg-icons/places/casino';
import LogoutIcon from 'material-ui/svg-icons/notification/do-not-disturb';
import MenuItem from './menuItem';
import { getActiveUserId, getActiveUser } from '../users/usersUtils';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';
import { endDateIsToday } from '../utils';
import { darkBlack } from 'material-ui/styles/colors';

class MenuComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  }

  handleOpen() {
    this.setState({
      ...this.state,
      open: true
    });
  }

  handleClose() {
    this.setState({
      ...this.state,
      open: false
    });
  }

  render() {
    const { activeUserId, activeUser, title } = this.props;
    const { open } = this.state;
    const page = window.location.pathname;

    return (
      <div>
        <AppBar
          title={title}
          iconElementLeft={
            open
              ? <IconButton>
                  <NavigationClose />
                </IconButton>
              : <IconButton>
                  <NavigationMenu />
                </IconButton>
          }
          iconElementRight={
            activeUserId > -1 ? <Avatar src={activeUser.image} /> : null
          }
          iconStyleRight={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 0
          }}
          // onRightIconButtonTouchTap={() => history.push('/users')}
          onLeftIconButtonTouchTap={this.handleToggle}
          zDepth={2}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1400,
            backgroundColor: darkBlack
          }}
        />
        <Drawer
          docked={false}
          open={open}
          onRequestChange={open => this.setState({ open })}
        >
          <div
            style={{
              marginTop: 64 + 'px'
            }}
          >
            <MenuItem
              link="/users"
              label="Benutzer"
              onClick={this.handleClose}
              icon={<ActionFace />}
            />
            <Divider />
            <MenuItem
              link="/categories"
              label="Kategorien"
              onClick={this.handleClose}
              icon={<ImageCollections />}
            />
            <Divider />
            <MenuItem
              link="/tasks"
              label="Aufgaben"
              onClick={this.handleClose}
              icon={<EditorList />}
            />
            <Divider />
            <MenuItem
              link="/roulette"
              label="Roulette"
              onClick={this.handleClose}
              icon={<DiceIcon />}
            />
            <Divider />
            <MenuItem
              link="/achievements"
              label="Achievements"
              onClick={this.handleClose}
              icon={<StarIcon />}
            />
            <Divider />
            <MenuItem
              link="/transactions"
              label="Konto"
              onClick={this.handleClose}
              icon={<CreditCard />}
            />
            <Divider />
            {(endDateIsToday() || process.env.NODE_ENV === 'development') &&
              <MenuItem
                link="/results"
                label="Ergebnisse"
                onClick={this.handleClose}
                icon={<SocialCake />}
              />}
            <Divider />
            {/* <MenuItem
              link="/logout"
              label="Logout"
              onClick={this.handleClose}
              icon={<LogoutIcon />}
            /> */}
          </div>
        </Drawer>
      </div>
    );
  }
}

MenuComponent.propTypes = {
  activeUserId: PropTypes.number.isRequired,
  activeUser: PropTypes.object,
  title: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    activeUserId: getActiveUserId(state),
    activeUser: getActiveUser(state),
    title: state.app.pageTitle
  };
};

const Menu = connect(mapStateToProps)(MenuComponent);

export default Menu;
