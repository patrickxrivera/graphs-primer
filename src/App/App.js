import React, { Component } from 'react';

import GraphView from '../Graph/Graph';
import { Graph } from '../utils/graph';

class App extends Component {
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
    return (
      <div className="App">
        <button onClick={this.handleClick}>Randomize</button>
        <GraphView graph={this.state.graph} />
      </div>
    );
  }
}

export default App;
