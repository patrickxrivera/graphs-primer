import React, { Component } from 'react';
import { Graph } from './graph';
import './App.css';

const canvasWidth = 780;
const canvasHeight = 630;

class GraphView extends Component {
  state = {
    ctx: null
  };

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  initCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');

    this.setState({ ctx });
  };

  updateCanvas = async () => {
    const { ctx } = this.state;

    if (!ctx) {
      await this.initCanvas(); // ensure setState is finished before returning
      return;
    }

    this.clearCanvas(ctx);
    this.initGraph(ctx);
  };

  clearCanvas = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  initGraph = (ctx) => {
    const { graph } = this.props;

    graph.randomize(5, 4, 150, 0.6);

    graph.vertexes.forEach((v) => {
      this.drawCircle(v);
      v.edges.forEach(this.drawLine(ctx, v));
    });
  };

  drawCircle = ({ pos, value }) => {
    const { ctx } = this.state;
    const { x } = pos;
    const { y } = pos;
    const radius = 20;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(value, x, y, 50);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  };

  drawLine = (ctx, v) => (e) => {
    const { destination } = e;

    ctx.beginPath();
    ctx.moveTo(v.pos.x, v.pos.y);
    ctx.lineTo(destination.pos.x, destination.pos.y);
    ctx.stroke();
  };

  /**
   * Render
   */
  render() {
    return <canvas className="canvas" ref="canvas" width={canvasWidth} height={canvasHeight} />;
  }
}

class App extends Component {
  state = {
    graph: new Graph()
  };

  // !!! IMPLEMENT ME
  // use the graph randomize() method

  render() {
    return (
      <div className="App">
        <GraphView graph={this.state.graph} />
      </div>
    );
  }
}

export default App;
