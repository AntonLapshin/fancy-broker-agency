import React from "react";
import PropTypes from "prop-types";

const Contact = props => (
  <div className="page">
    <div className="content">
      <h2>Contact {props.match.params.id}</h2>
      <p>Show the contact's details here</p>
    </div>
  </div>
);

Contact.propTypes = {
  match: PropTypes.object.isRequired
};

export default Contact;
