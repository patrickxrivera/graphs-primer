/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */

import Graph from '../src/graph';

describe('Graph', () => {
  let graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('should do a breadth first search within the graph', () => {
    const arr = [];
    const foo = ({ value }) => arr.push(value);
    const vertexOne = new Vertex('One');
    const vertexTwo = new Vertex('Two');
    const vertexThree = new Vertex('Three');
    const vertexFour = new Vertex('Four');
    const vertexFive = new Vertex('Five');

    this._connectVerts(vertexOne, vertexFour);
    this._connectVerts(vertexOne, vertexFive);
    this._connectVerts(vertexFour, vertexThree);
    this._connectVerts(vertexThree, vertexTwo);

    graph.bfs(vertexOne, foo);
    expect(arr).toBe(['One', 'Four', 'Five', 'Three', 'Two']);
  });
});
