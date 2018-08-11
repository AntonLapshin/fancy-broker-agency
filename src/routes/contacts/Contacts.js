import React from "react";
import PropTypes from "prop-types";
import { PaginationTable, LoadIndicator } from "components";
import options, { visibleColumns } from "constants/table";
import dataTransform from "./dataTransform";

const apiMethod = "getAllContacts";
class Contacts extends React.PureComponent {
  state = { data: [] };

  componentDidMount() {
    this._isMounted = true;
    const { dataService } = this.props;
    dataService.pubsub.on("requested", this.dataRequested);
    dataService.pubsub.on("received", this.dataReceived);
    this.requestData();
  }

  componentWillUnmount() {
    const { dataService } = this.props;
    dataService.pubsub.off(this.dataReceived);
    dataService.pubsub.off(this.dataRequested);
    this._isMounted = false;
  }

  requestData() {
    this.props.dataService[apiMethod]();
  }

  dataRequested = ({ methodName }) => {
    if (methodName !== apiMethod) {
      return;
    }
    this.setState({ ...this.state, isPending: true });
  };

  dataReceived = async ({ methodName, result }) => {
    if (methodName !== apiMethod) {
      return;
    }
    const data = await dataTransform(result);
    this.setState({ data, isPending: false });
  };

  render() {
    const content =
      !this.state.isPending && this.state.data.length === 0 ? (
        <div />
      ) : this.state.isPending ? (
        <LoadIndicator />
      ) : (
        <div>
          <PaginationTable
            data={this.state.data}
            options={options}
            visibleColumns={visibleColumns}
          />
        </div>
      );

    return <div className="page">{content}</div>;
  }
}

Contacts.propTypes = {
  dataService: PropTypes.object
};

export default Contacts;
