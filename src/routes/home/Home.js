import React from "react";
import PropTypes from "prop-types";
import { Grid, LoadIndicator } from "components";
import options from "constants/grid";
import layout from "./layout";
import widgetsMeta from "./widgets";

class Home extends React.PureComponent {
  state = { widgets: [] };

  reset() {
    this.setState({
      widgets: widgetsMeta.map(w => ({ id: w.id, isPending: true }))
    });
  }

  componentWillMount() {
    this.reset();
    widgetsMeta.forEach(w => this.props.dataService[w.apiMethod]());
    this.props.dataService.pubsub.on("received", ({ methodName, result }) => {
      widgetsMeta.filter(w => w.apiMethod === methodName).forEach(async w => {
        const props = await w.getProps(result);
        const newWidgets = [...this.state.widgets];
        newWidgets[w.id] = {
          isPending: false,
          component: w.component,
          props: props
        };

        this.setState({
          widgets: newWidgets
        });
      });
    });
  }

  render() {
    const widgets = this.state.widgets.map(
      w =>
        w.isPending ? (
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
