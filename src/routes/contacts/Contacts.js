import React from "react";
import PropTypes from "prop-types";
import "./Contacts.css";
import debounce from "lodash/debounce";
import { PaginationTable, LoadIndicator, Search } from "components";
import options, { visibleColumns } from "constants/table";
import dataTransform from "./dataTransform";
import config from "constants/config";
import Fuse from "fuse.js";
import urls, { goto } from "routes";

const apiMethod = "getAllContacts";
class Contacts extends React.PureComponent {
  state = { data: [], searchPattern: "" };

  fuse;

  componentDidMount() {
    const { dataService } = this.props;
    dataService.pubsub.on("requested", this.dataRequested);
    dataService.pubsub.on("received", this.dataReceived);
    this.requestData();
  }

  componentWillUnmount() {
    const { dataService } = this.props;
    dataService.pubsub.off(this.dataReceived);
    dataService.pubsub.off(this.dataRequested);
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
    const keys = Object.keys(data[0]);
    this.fuse = new Fuse(data, { keys: keys });
    this.setState({ ...this.state, data, isPending: false });
  };

  updateSearchPattern = debounce(
    searchPattern => this.setState({ ...this.state, searchPattern }),
    config.debounceDelay
  );

  gotoContact = item => {
    goto(urls.contact.replace(":id", item.guid));
  };

  render() {
    const { searchPattern, data, isPending } = this.state;
    const visibleData =
      searchPattern.length > 0 && isPending === false && data.length > 0
        ? this.fuse.search(searchPattern)
        : data;
    const content =
      !isPending && data.length === 0 ? (
        <div />
      ) : isPending ? (
        <LoadIndicator />
      ) : (
        <div>
          <Search changeHandler={this.updateSearchPattern} />
          <PaginationTable
            data={visibleData}
            options={options}
            visibleColumns={visibleColumns}
            rowClickHandler={this.gotoContact}
          />
        </div>
      );

    return <div className="page contacts-page">{content}</div>;
  }
}

Contacts.propTypes = {
  dataService: PropTypes.object
};

export default Contacts;
