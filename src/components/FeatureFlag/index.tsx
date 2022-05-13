/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../../schema/types';

import FeatureFlagContainer from './Container';

const FeatureFlag: React.FC<IFeatureFlag> = ({ title }): ReactElement => (
  <FeatureFlagContainer>
    <span>{title}</span>
    <Toggle
      defaultChecked={false}
      icons={false}
    />
  </FeatureFlagContainer>
);

export default FeatureFlag;
