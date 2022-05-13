/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../../schema';

import FeatureFlagContainer from './Container';
import DropdownIcon from './DropdownIcon';

const hasChildFeatureFlags = (childFeatureFlags: IFeatureFlag[] | undefined) => childFeatureFlags
  && childFeatureFlags.length > 0;

const FeatureFlag: React.FC<IFeatureFlag> = ({ title, childFeatureFlags }): ReactElement => (
  <>
    <FeatureFlagContainer
      css={css`
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
      `}
    >
      <span
        css={css`
          flex: 2 1 auto;
          padding-right: 20px;
        `}
      >
        {title}
      </span>
      <div>
        <Toggle
          defaultChecked={false}
          icons={false}
        />
        {hasChildFeatureFlags(childFeatureFlags) && <DropdownIcon isOpen={false} />}
      </div>
    </FeatureFlagContainer>
    {hasChildFeatureFlags(childFeatureFlags) && (
      <div
        css={css`
          padding-left: 40px;
          padding-right: 40px;
        `}
      >
        {childFeatureFlags?.map((childFeatureFlag) => (
          <FeatureFlag title={childFeatureFlag.title} />
        ))}
      </div>
    )}
  </>
);

export default FeatureFlag;
