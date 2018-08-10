import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "components";

class ErrorHandler extends React.PureComponent {
  state = { message: null };

  componentWillMount() {
    this.props.dataService.pubsub.on("error", message => {
      this.setState({ message });
    });
  }

  render() {
    return <ErrorMessage message={this.state.message} />;
  }
}

ErrorHandler.propTypes = {
  dataService: PropTypes.object
};

export default ErrorHandler;
