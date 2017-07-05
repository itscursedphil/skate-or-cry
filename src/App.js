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
import Login from './login/login';
import Logout from './logout/logout';
import PrivateRoute from './privateRoute/privateRoute';

const App = props =>
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/tasks" component={Tasks} />
        <PrivateRoute path="/achievements" component={Achievements} />
        <PrivateRoute path="/results" component={Results} />
        <Switch>
          <PrivateRoute exact path="/transactions" component={Transactions} />
          <PrivateRoute
            exact
            path="/transactions/add"
            component={TransactionAdd}
          />
          <PrivateRoute
            path="/transactions/:id"
            component={TransactionSingle}
          />
        </Switch>
      </Switch>
    </Layout>
  </Router>;

export default App;
