import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { ErrorBoundary } from "./components";
import Menu from "containers/menu/Menu";
import ErrorHandler from "containers/errorHandler/ErrorHandler";
import {
  default as urls,
  history,
  Home,
  Contacts,
  Contact,
  Help
} from "./routes";
import { DataServiceContext, dataService } from "contexts/dataServiceContext";

const RouteNotFound = () => <Redirect to={urls.home} />;

const App = () => (
  <ErrorBoundary>
    <Router history={history}>
      <div className="app">
        <header>
          <Menu />
        </header>
        <section className="body">
          <DataServiceContext.Provider value={dataService}>
            <DataServiceContext.Consumer>
              {dataService => <ErrorHandler dataService={dataService} />}
            </DataServiceContext.Consumer>
            <Switch>
              <Route
                exact
                path={urls.home}
                component={() => (
                  <DataServiceContext.Consumer>
                    {dataService => <Home dataService={dataService} />}
                  </DataServiceContext.Consumer>
                )}
              />
              <Route
                exact
                path={urls.contacts}
                component={() => (
                  <DataServiceContext.Consumer>
                    {dataService => <Contacts dataService={dataService} />}
                  </DataServiceContext.Consumer>
                )}
              />
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
