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

const homePath = process.env.PUBLIC_URL + "/";

const RouteNotFound = () => <Redirect to={process.env.PUBLIC_URL + "/"} />;

const App = () => (
  <ErrorBoundary>
    <Router>
      <React.Fragment>
        <Route path={homePath} component={NavBar} />
        <Route exact path={homePath} component={Home} />
        <Route exact path={homePath + "contacts"} component={Contacts} />
        <Route path={homePath + "contacts/:id"} component={Contact} />
        <Route exact path={homePath + "help"} component={Help} />
        <Route path="*" component={RouteNotFound} />
      </React.Fragment>
    </Router>
  </ErrorBoundary>
);

export default App;
