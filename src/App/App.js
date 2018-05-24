import React from 'react';

import GraphContainer from '../Graph/GraphContainer';

const App = ({ graph, handleClick }) => (
  <div>
    <button onClick={handleClick}>Randomize</button>
    <GraphContainer graph={graph} />
  </div>
);

export default App;
