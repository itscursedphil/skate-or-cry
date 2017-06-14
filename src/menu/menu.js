import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ActionFace from 'material-ui/svg-icons/action/face';
import ImageCollections from 'material-ui/svg-icons/image/collections';
import EditorList from 'material-ui/svg-icons/editor/format-list-bulleted';
import SocialCake from 'material-ui/svg-icons/social/cake';

export default class Menu extends Component {
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
    const { open } = this.state;
    const page = window.location.pathname;
    let title = '';

    if (/users/.test(page)) title = 'Benutzer';
    if (/categories/.test(page)) title = 'Kategorien';
    if (/tasks/.test(page)) title = 'Aufgaben';
    if (/results/.test(page)) title = 'Ergebnisse';

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
          // iconClassNameRight={open ?  : "muidocs-icon-navigation-expand-more"}
          onLeftIconButtonTouchTap={this.handleToggle}
          zDepth={2}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1400
          }}
        />
        <Drawer
          docked={false}
          // width={100 + '%'}
          open={open}
          onRequestChange={open => this.setState({ open })}
        >
          <div
            style={{
              marginTop: 64 + 'px'
            }}
          >
            <Link to="/users">
              <MenuItem
                onTouchTap={this.handleClose}
                leftIcon={<ActionFace />}
                rightIcon={<ChevronRight />}
              >
                Benutzer
              </MenuItem>
            </Link>
            <Divider />
            <Link to="/categories">
              <MenuItem
                onTouchTap={this.handleClose}
                leftIcon={<ImageCollections />}
                rightIcon={<ChevronRight />}
              >
                Kategorien
              </MenuItem>
            </Link>
            <Divider />
            <Link to="/tasks">
              <MenuItem
                onTouchTap={this.handleClose}
                leftIcon={<EditorList />}
                rightIcon={<ChevronRight />}
              >
                Aufgaben
              </MenuItem>
            </Link>
            <Divider />
            <Link to="/results">
              <MenuItem
                onTouchTap={this.handleClose}
                leftIcon={<SocialCake />}
                rightIcon={<ChevronRight />}
              >
                Ergbnisse
              </MenuItem>
            </Link>
          </div>
        </Drawer>
      </div>
    );
  }
}
