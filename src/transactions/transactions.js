import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageWarning from '../ui/pageWarning';
import { Container, Row, Col } from 'reactstrap';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Chip from 'material-ui/Chip';

const TransactionsPage = ({ activeUserId }) => {
  // if (activeUserId < 0) return <PageWarning users />;
  return (
    <Container>
      <Row>
        <Col>
          <SelectField
            floatingLabelText="Filter"
            value={'all'}
            onChange={(e, i, v) => null}
            fullWidth
          >
            <MenuItem value={'all'} primaryText="Alle" />
            <Divider />
            <MenuItem value={'sent'} primaryText="Gesendet" />
            <Divider />
            <MenuItem value={'received'} primaryText="Erhalten" />
          </SelectField>
        </Col>
      </Row>
      <Row>
        <List style={{ width: 100 + '%' }}>
          <ListItem
            primaryText={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src="https://scontent-ams3-1.xx.fbcdn.net/v/t1.0-9/1045007_558927827479472_390644001_n.jpg?oh=7da86d4f327f5919e20ad08885902696&oe=59E0F6DB" />
                <div
                  style={{ paddingLeft: 16 + 'px', paddingRight: 16 + 'px' }}
                >
                  <span
                    style={{
                      color: 'rgba(0, 0, 0, 0.3)',
                      fontSize: 0.8 + 'em',
                      marginBottom: 0.4 + 'em',
                      display: 'inline-block'
                    }}
                  >
                    Erhalten von Shawty
                  </span>
                  <br />
                  {/* <Chip style={{ marginTop: 8 + 'px' }}> */}
                  10 Pts.
                  {/* </Chip> */}
                </div>
                <ChevronRight style={{ marginLeft: 'auto' }} />
              </div>
            }
          />
          <Divider />
        </List>
      </Row>
    </Container>
  );
};

TransactionsPage.propTypes = {
  activeUserId: PropTypes.number.isRequired
};

const mapDispatchToProps = dispatch => {
  return {};
};

const mapStateToProps = state => {
  return {
    users: state.users.all,
    transactions: state.transactions.all,
    activeUserId: state.users.active
  };
};

const Transactions = connect(mapStateToProps, mapDispatchToProps)(
  TransactionsPage
);

export default Transactions;
