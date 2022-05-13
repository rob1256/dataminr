/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeProvider } from '@emotion/react';

import { schema, ISection } from './schema';

import appTheme from './theme';
import Section from './components/Section';

const App = () => (
  <ThemeProvider theme={appTheme}>
    <div className="app">
      {schema.sections.map((section: ISection) => <Section key={`section-${section.title}`} title={section.title} featureFlagGroups={section.featureFlagGroups} />)}
    </div>
  </ThemeProvider>
);

export default App;
