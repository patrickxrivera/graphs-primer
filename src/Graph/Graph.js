import React, { Component } from 'react';

class GraphView extends Component {
  state = {
    ctx: null,
    colors: ['#3498db', '#9b59b6', '#2ecc71', '#e74c3c', '#fd79a8', '#e17055'],
    canvasWidth: 780,
    canvasHeight: 610
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
    this.renderGraph(ctx);
  };

  clearCanvas = (ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
  };

  renderGraph = (ctx) => {
    const { graph } = this.props;

    graph.vertexes.forEach((v) => {
      graph.bfs.call(graph, v); // use call to bind "this" context to graph inside bfs
    });

    const connectedComponents = graph.getConnectedComponents();

    connectedComponents.forEach((component, idx) => {
      component.forEach((v) => {
        this.drawCircle(v, idx);
        v.edges.forEach(this.drawLine(v, idx));
      });
    });
  };

  drawCircle = ({ pos, value }, idx) => {
    const { ctx, colors } = this.state;
    const { x } = pos;
    const { y } = pos;
    const radius = 20;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = colors[idx];
    ctx.font = '16px Arial';
    ctx.fillText(value, x, y, 50);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors[idx];
    ctx.stroke();
  };

  drawLine = (v, idx) => (e) => {
    const { ctx } = this.state;
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
    return (
      <canvas
        className="canvas"
        ref="canvas"
        width={this.state.canvasWidth}
        height={this.state.canvasHeight}
      />
    );
  }
}

export default GraphView;
