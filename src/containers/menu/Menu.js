import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { matchPath } from "react-router";
import { NavBar } from "components";
import urls from "routes";

const items = [
  {
    name: "Home",
    exact: true
  },
  {
    name: "Contacts",
    exact: false
  },
  {
    name: "Help",
    exact: true
  }
].map(item => {
  return { ...item, url: urls[item.name.toLowerCase()] };
});

const Menu = props => {
  const selectedItemName = (
    items.find(item =>
      matchPath(props.location.pathname, { path: item.url, exact: item.exact })
    ) || {}
  ).name;
  const navProps = {
    items,
    selectedItemName,
    changeHandler: item => props.history.push(item.url)
  };
  return <NavBar {...navProps} />;
};

Menu.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(Menu);
