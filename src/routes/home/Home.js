import React from "react";
import PropTypes from "prop-types";
import { Grid, LoadIndicator } from "components";
import options from "constants/grid";
import layout from "./layout";
import widgetsMeta from "./widgets";

class Home extends React.PureComponent {
  state = { widgets: new Array(widgetsMeta.length).fill(null) };

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
    widgetsMeta.forEach(w => this.props.dataService[w.apiMethod]());
  }

  dataRequested = ({ methodName }) => {
    const newWidgets = [...this.state.widgets];
    widgetsMeta.filter(w => w.apiMethod === methodName).forEach(w => {
      newWidgets[w.id] = {
        isPending: true
      };
    });
    this.setState({ widgets: newWidgets });
  };

  dataReceived = ({ methodName, result }) => {
    widgetsMeta.filter(w => w.apiMethod === methodName).forEach(async w => {
      const props = await w.getProps(result);
      const newWidgets = [...this.state.widgets];
      newWidgets[w.id] = {
        isPending: false,
        component: w.component,
        props: props
      };

      this._isMounted &&
        this.setState({
          widgets: newWidgets
        });
    });
  };

  render() {
    const widgets = this.state.widgets.map(
      w =>
        !w ? (
          <div />
        ) : w.isPending ? (
          <LoadIndicator />
        ) : (
          <w.component {...w.props} />
        )
    );
    return <Grid {...{ layout, options, widgets }} />;
  }
}

Home.propTypes = {
  dataService: PropTypes.object
};

export default Home;
