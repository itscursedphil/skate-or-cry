import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './home/home';
import Users from './users/users';
import Categories from './categories/categories';
import Tasks from './tasks/tasks';
import Results from './results/results';
import Transactions from './transactions/transactions';

const App = props =>
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/categories" component={Categories} />
      <Route exact path="/tasks" component={Tasks} />
      <Route path="/results" component={Results} />
      <Route exact path="/transactions" component={Transactions} />
    </Layout>
  </Router>;

export default App;
