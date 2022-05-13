/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeProvider } from '@emotion/react';

import theme from './theme';
import FeatureFlag from './components/FeatureFlag';

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="app">
      <FeatureFlag title="test" />
    </div>
  </ThemeProvider>
);

export default App;
