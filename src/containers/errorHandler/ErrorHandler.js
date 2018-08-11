import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "components";

class ErrorHandler extends React.PureComponent {
  state = { message: null };

  setMessage = message => this.setState({ message });

  componentWillMount() {
    this.props.dataService.pubsub.on("error", this.setMessage);
  }

  componentWillUnmount() {
    this.props.dataService.pubsub.off(this.setMessage);
  }

  render() {
    return <ErrorMessage message={this.state.message} />;
  }
}

ErrorHandler.propTypes = {
  dataService: PropTypes.object
};

export default ErrorHandler;
