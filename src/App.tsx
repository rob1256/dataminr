/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';

import { ISection } from './schema';
import { selectSchemaSections } from './reducers/schema';
import Section from './components/Section';

const App = () => {
  const sections = useSelector(selectSchemaSections);

  return (
    <div
      css={(theme) => css`
        background-color: ${theme.backgrounds.main};
        color: ${theme.textColors.default};
      `}
    >
      {sections.map((section: ISection) => <Section key={`section-${section.title}`} title={section.title} featureFlagGroups={section.featureFlagGroups} />)}
    </div>
  );
};

export default App;
