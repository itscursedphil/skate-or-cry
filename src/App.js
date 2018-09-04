import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./home/home";
import Users from "./users/users";
import Categories from "./categories/categories";
import Tasks from "./tasks/tasks";
import Results from "./results/results";
import Transactions from "./transactions/transactions";
import TransactionAdd from "./transactions/transactionAdd";
import TransactionSingle from "./transactions/transactionSingle";
import Roulette from "./roulette/roulette";
import Achievements from "./achievements/achievements";
import Login from "./login/login";
import Logout from "./logout/logout";
import PrivateRoute from "./privateRoute/privateRoute";
import { todayIsWhileTrip } from "./utils";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  cyan500,
  cyan700,
  pinkA200,
  grey100,
  grey300,
  grey400,
  grey500,
  grey800,
  white,
  darkBlack,
  fullBlack,
  tealA400
} from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: tealA400,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: white,
    alternateTextColor: white,
    canvasColor: darkBlack,
    borderColor: white,
    disabledColor: fade(white, 0.6),
    pickerHeaderColor: tealA400,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  snackbar: {
    backgroundColor: fullBlack
  }
});

const App = props => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <Layout>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/users" component={Users} />
          <PrivateRoute path="/categories" component={Categories} />
          <PrivateRoute path="/tasks" component={Tasks} />
          <PrivateRoute path="/roulette" component={Roulette} />
          <PrivateRoute path="/achievements" component={Achievements} />
          {!todayIsWhileTrip() && (
            <PrivateRoute path="/results" component={Results} />
          )}
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
    </Router>
  </MuiThemeProvider>
);

export default App;
