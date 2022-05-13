/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../../schema';

import FeatureFlagContainer from './Container';

const FeatureFlag: React.FC<IFeatureFlag> = ({ title }): ReactElement => (
  <FeatureFlagContainer>
    <span
      css={(theme) => css`
        color: ${theme.textColors.featureFlagTitle};
        flex: 2 1 auto;
        padding-right: 20px;
      `}
    >
      {title}
    </span>
    <Toggle
      defaultChecked={false}
      icons={false}
    />
  </FeatureFlagContainer>
);

export default FeatureFlag;
