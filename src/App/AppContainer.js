import React, { Component } from 'react';

import App from './App';
import { Graph } from '../utils/graph';

class AppContainer extends Component {
  state = {
    graph: new Graph(),
    width: 5,
    height: 4,
    pxBox: 150,
    probability: 0.6
  };

  componentDidMount() {
    this.initGraph();
  }

  handleClick = () => {
    const { graph } = this.state;

    graph.resetGraph();
    this.initGraph();
  };

  initGraph = () => {
    const { graph, width, height, pxBox, probability } = this.state;

    graph.randomize(width, height, pxBox, probability);

    this.setState({ graph });
  };

  render() {
    return <App onClick={this.handleClick} graph={this.state.graph} />;
  }
}

export default AppContainer;
