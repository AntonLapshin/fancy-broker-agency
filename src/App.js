import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./components";
import Menu from "./containers/menu/Menu";
import { default as urls, Home, Contacts, Contact, Help } from "./routes";
import DataServiceContext from "contexts/dataServiceContext";

const RouteNotFound = () => <Redirect to={urls.home} />;

const App = () => (
  <ErrorBoundary>
    <Router>
      <div className="app">
        <header>
          <Menu />
        </header>
        <section className="body">
          <DataServiceContext.Provider>
            <Switch>
              <Route exact path={urls.home} component={Home} />
              <Route path={urls.contacts} component={Contacts} />
              <Route path={urls.contact} component={Contact} />
              <Route exact path={urls.help} component={Help} />
              <Route component={RouteNotFound} />
            </Switch>
          </DataServiceContext.Provider>
        </section>
        <footer>
          <h3>Fancy Broker Agency</h3>
          <p className="tagline">We know how much you owe us</p>
        </footer>
      </div>
    </Router>
  </ErrorBoundary>
);

export default App;
