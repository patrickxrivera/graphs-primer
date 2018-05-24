import React from 'react';

import GraphContainer from '../Graph/GraphContainer';
import * as Style from './AppStyles';

const App = ({ graph, handleClick }) => (
  <Style.OuterWrapper>
    <Style.InnerWrapper>
      <Style.TextWrapper>
        <Style.Title>Random Graph Generator</Style.Title>
        <Style.Button onClick={handleClick}>Randomize</Style.Button>
      </Style.TextWrapper>
      <GraphContainer graph={graph} />
    </Style.InnerWrapper>
  </Style.OuterWrapper>
);

export default App;
