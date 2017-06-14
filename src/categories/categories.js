import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { selectCategory } from './categoriesActions';
import {
  openNotification,
  setNoticationMessage
} from '../notifications/notificationsActions';
import { List } from 'material-ui/List';
import { ListItem } from 'material-ui/List';
import IconChecked from 'material-ui/svg-icons/toggle/check-box';
import IconUnchecked
  from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';

const categoriesList = (
  { categories, active, onCategorySelected, history }
) => (
  <Container>
    <Row>
      <List
        style={{
          width: 100 + '%'
        }}
      >
        {categories.map(category => (
          <span key={category.id}>
            <ListItem
              primaryText={category.title}
              leftCheckbox={<Checkbox checked={active === category.id} />}
              onClick={() =>
                onCategorySelected(category.id, category.title, history)}
            />
            <Divider />
          </span>
        ))}
      </List>
    </Row>
  </Container>
);

categoriesList.propTypes = {
  categories: PropTypes.array.isRequired,
  active: PropTypes.number.isRequired,
  onCategorySelected: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onCategorySelected: (id, title, history) => {
      dispatch(selectCategory(id));
      dispatch(setNoticationMessage(`${title} wurde ausgewählt`));
      dispatch(openNotification());
      history.push('/tasks');
    }
  };
};

const mapStateToProps = state => {
  return {
    categories: state.categories.all,
    active: state.categories.active
  };
};

const Categories = connect(mapStateToProps, mapDispatchToProps)(categoriesList);

export default Categories;
