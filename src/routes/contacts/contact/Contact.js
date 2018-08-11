import React from "react";
import PropTypes from "prop-types";

const Contact = props => (
  <div className="page">
    <h2>Contact {props.match.params.id}</h2>
    <p>Show contact details here</p>
  </div>
);

Contact.propTypes = {
  match: PropTypes.object.isRequired
};

export default Contact;