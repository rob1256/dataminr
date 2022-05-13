/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';

import { ISection } from '../../schema';
import FeatureFlag from '../FeatureFlag';

const Section: React.FC<ISection> = ({ title, featureFlagGroups }): ReactElement => (
  <div>
    <h2
      css={(theme) => css`
        color: ${theme.textColors.sectionTitle};
      `}
    >
      {title}
    </h2>
    <div
      css={() => css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
      `}
    >
      {featureFlagGroups.map((featureFlags) => (
        <div
          css={(theme) => css`
            background-color: ${theme.backgrounds.group};
            border-radius: 5px;
          `}
        >
          {featureFlags.map((featureFlag) => <FeatureFlag title={featureFlag.title} />)}
        </div>
      ))}
    </div>
  </div>
);

export default Section;
