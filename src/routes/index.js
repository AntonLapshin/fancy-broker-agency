import createBrowserHistory from 'history/createBrowserHistory'

export { default as Home } from "./home/Home";
export { default as Contacts } from "./contacts/Contacts";
export { default as Contact } from "./contacts/contact/Contact";
export { default as Help } from "./help/Help";

export const history = createBrowserHistory();
export const goto = url => history.push(url);
export const replace = url => history.replace(url);

const homePath = process.env.PUBLIC_URL + "/";

const home = homePath,
  contacts = homePath + "contacts/",
  contact = contacts + ":id",
  help = homePath + "help";

export default {
  home,
  contacts,
  contact,
  help
};
