import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './home/home';
import Users from './users/users.js';
import Categories from './categories/categories.js';
import Tasks from './tasks/tasks.js';
import Results from './results/results.js';

const App = props =>
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/categories" component={Categories} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/results" component={Results} />
    </Layout>
  </Router>;

export default App;
