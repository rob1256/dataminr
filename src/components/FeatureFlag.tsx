/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../schema/types';

const FeatureFlag: React.FC<IFeatureFlag> = ({ title }): ReactElement => (
  <div>
    <span>{title}</span>
    <Toggle
      css={(theme) => css`
          .react-toggle-track {
            background-color: ${theme.colors.lightGrey};
          }
          
          .react-toggle--checked .react-toggle-track {
            background-color: ${theme.colors.lightBlue};
          }
        `}
      defaultChecked={false}
      icons={false}
    />
  </div>
);

export default FeatureFlag;
