import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";
import { ErrorBoundary, NavBar } from "./components";
import { Home, Contacts, Contact, Help } from "./routes";

const RouteNotFound = () => <Redirect to="/" />;

const App = () => (
  <ErrorBoundary>
    <Router>
      <React.Fragment>
        <Route path={process.env.PUBLIC_URL + "/"} component={NavBar} />
        <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />
        <Route
          exact
          path={process.env.PUBLIC_URL + "/contacts"}
          component={Contacts}
        />
        <Route
          path={process.env.PUBLIC_URL + "/contacts/:id"}
          component={Contact}
        />
        <Route exact path={process.env.PUBLIC_URL + "/help"} component={Help} />
        <Route path="*" component={RouteNotFound} />
      </React.Fragment>
    </Router>
  </ErrorBoundary>
);

export default App;
