export { default as Home } from "./home/Home";
export { default as Contacts } from "./contacts/Contacts";
export { default as Contact } from "./contacts/contact/Contact";
export { default as Help } from "./help/Help";

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
