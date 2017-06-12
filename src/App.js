import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Users from './users/users.js';

const App = props => (
  <Router>
    <Layout>
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route path="/users" component={Users} />
      <Route path="/categories" render={() => <h1>Categories</h1>} />
    </Layout>
  </Router>
);

export default App;
