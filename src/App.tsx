/** @jsxImportSource @emotion/react */
import React from 'react';
import { ThemeProvider, css } from '@emotion/react';

import { schema, ISection } from './schema';

import appTheme from './theme';
import Section from './components/Section';

const App = () => (
  <ThemeProvider theme={appTheme}>
    <div
      css={(theme) => css`
        background-color: ${theme.backgrounds.main};
        color: ${theme.textColors.default};
      `}
    >
      {schema.sections.map((section: ISection) => <Section key={`section-${section.title}`} title={section.title} featureFlagGroups={section.featureFlagGroups} />)}
    </div>
  </ThemeProvider>
);

export default App;
