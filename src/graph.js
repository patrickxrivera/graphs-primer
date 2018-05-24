// https://msdn.microsoft.com/en-us/library/aa289150(v=vs.71).aspx
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

export class Edge {
  constructor(destination, weight = 0.2) {
    this.destination = destination;
    this.weight = weight;
  }
}

export class Vertex {
  constructor(value = null) {
    this.value = value;
    this.edges = [];
    this.isVisited = 'white';
    this.pos = {
      x: null,
      y: null
    };
  }
}

export class Graph {
  constructor() {
    this.vertexes = [];
    this.connectedComponents = [];
    this.seen = {};
  }

  /**
   * Create a random graph
   */
  randomize(width, height, pxBox, probability = 0.6) {
    let count = 0;

    // Build a grid of verts
    let grid = [];
    for (let y = 0; y < height; y++) {
      let row = [];
      for (let x = 0; x < width; x++) {
        let v = new Vertex();
        //v.value = 'v' + x + ',' + y;
        v.value = 'v' + count++;
        row.push(v);
      }
      grid.push(row);
    }

    // Go through the grid randomly hooking up edges
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Connect down
        if (y < height - 1) {
          if (Math.random() < probability) {
            this._connectVerts(grid[y][x], grid[y + 1][x]);
          }
        }

        // Connect right
        if (x < width - 1) {
          if (Math.random() < probability) {
            this._connectVerts(grid[y][x], grid[y][x + 1]);
          }
        }
      }
    }

    // Last pass, set the x and y coordinates for drawing
    const boxBuffer = 0.8;
    const boxInner = pxBox * boxBuffer;
    const boxInnerOffset = (pxBox - boxInner) / 2;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        grid[y][x].pos = {
          x: (x * pxBox + boxInnerOffset + Math.random() * boxInner) | 0,
          y: (y * pxBox + boxInnerOffset + Math.random() * boxInner) | 0
        };
      }
    }

    // Finally, add everything in our grid to the vertexes in this Graph
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.vertexes.push(grid[y][x]);
      }
    }
  }

  /**
   * Dump graph data to the console
   */
  dump() {
    let s;

    for (let v of this.vertexes) {
      if (v.pos) {
        s = v.value + ' (' + v.pos.x + ',' + v.pos.y + '):';
      } else {
        s = v.value + ':';
      }

      for (let e of v.edges) {
        s += ` ${e.destination.value}`;
      }
      console.log(s);
    }
  }

  bfs(start) {
    const queue = [start];
    let cache = [];

    if (!this.seen[start.value]) {
      cache.push(start);
      this.seen[start.value] = true;
    }

    while (queue.length > 0) {
      const currVertex = queue.shift();

      if (currVertex.isVisited === 'black') continue;

      currVertex.isVisited = 'black';

      currVertex.edges.forEach(({ destination }) => {
        if (destination.isVisited === 'white') {
          destination.isVisited = 'grey';
          queue.push(destination);

          if (!this.seen[destination.value]) {
            cache.push(destination);
            this.seen[destination.value] = true;
          }
        }
      });
    }
    this.connectedComponents.push(cache);
  }

  getConnectedComponents() {
    return this.connectedComponents.filter(this._isValidArray);
  }

  resetGraph() {
    this.vertexes = [];
    this.connectedComponents = [];
    this.seen = {};
  }

  _isValidArray(arr) {
    return arr.length !== 0;
  }

  // Helper function to set up two-way edges
  _connectVerts(v0, v1) {
    v0.edges.push(new Edge(v1));
    v1.edges.push(new Edge(v0));
  }
}
