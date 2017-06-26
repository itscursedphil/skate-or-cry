import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './home/home';
import Users from './users/users';
import Categories from './categories/categories';
import Tasks from './tasks/tasks';
import Results from './results/results';
import Transactions from './transactions/transactions';
import TransactionAdd from './transactions/transactionAdd';
import TransactionSingle from './transactions/transactionSingle';
import Achievements from './achievements/achievements';

const App = props =>
  <Router>
    <Layout>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/categories" component={Categories} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/results" component={Results} />
      <Switch>
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/transactions/add" component={TransactionAdd} />
        <Route path="/transactions/:id" component={TransactionSingle} />
      </Switch>
    </Layout>
  </Router>;

export default App;
