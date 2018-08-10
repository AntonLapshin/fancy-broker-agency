import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { ErrorBoundary, NavBar } from "./components";
import {
  default as urls,
  history,
  Home,
  Contacts,
  Contact,
  Help
} from "./routes";

const RouteNotFound = () => <Redirect to={urls.home} />;

const menu = {
  items: [
    {
      name: "Home"
    },
    {
      name: "Contacts"
    },
    {
      name: "Help"
    }
  ],
  pathname: "Home",
  changeHandler: item => window.notify("Selected item: " + item.name)
};

const App = () => (
  <ErrorBoundary>
    <Router history={history}>
      <div className="app">
        <header>
          <NavBar {...menu} />
        </header>
        <section className="body">
          <Switch>
            <Route exact path={urls.home} component={Home} />
            <Route exact path={urls.contacts} component={Contacts} />
            <Route path={urls.contact} component={Contact} />
            <Route exact path={urls.help} component={Help} />
            <Route path="*" component={RouteNotFound} />
          </Switch>
        </section>
        <footer>
          <h3>Fancy Broker Agency</h3>
        </footer>
      </div>
    </Router>
  </ErrorBoundary>
);

export default App;
