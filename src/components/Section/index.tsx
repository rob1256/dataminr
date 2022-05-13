/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';

import { ISection } from '../../schema';
import FeatureFlag from '../FeatureFlag';

const Section: React.FC<ISection> = ({ title, featureFlagGroups }): ReactElement => (
  <div>
    <h2>{title}</h2>
    <div
      css={() => css`
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 20px;
      `}
    >
      {featureFlagGroups.map((featureFlags, index) => (
        <div
          key={`featureFlagGroup-${index}`} // eslint-disable-line react/no-array-index-key
          css={(theme) => css`
            background-color: ${theme.backgrounds.group};
            border-radius: 5px;
          `}
        >
          {featureFlags.map((featureFlag) => (
            <FeatureFlag
              key={`featureFlag-${featureFlag.title}`}
              id={featureFlag.id}
              title={featureFlag.title}
              childFeatureFlags={featureFlag.childFeatureFlags}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Section;
