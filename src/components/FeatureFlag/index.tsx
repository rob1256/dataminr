/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';
import { css } from '@emotion/react';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../../schema';

import FeatureFlagContainer from './Container';
import DropdownIcon from './DropdownIcon';
import FeatureFlagCSSTransitions from './CSSTransition';

const hasChildFeatureFlags = (childFeatureFlags: IFeatureFlag[] | undefined): boolean => (
  childFeatureFlags
  && childFeatureFlags?.length > 0
) as boolean;

const FeatureFlag: React.FC<IFeatureFlag> = ({
  title,
  childFeatureFlags,
}): ReactElement => {
  const [parentFeatureFlagIsChecked, setParentFeatureFlagIsChecked] = useState<boolean>(false);

  return (
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
            // checked={shouldBeChecked(parentFeatureFlagIsCheckedProp)}
            icons={false}
              // @ts-ignore
            onChange={(e) => setParentFeatureFlagIsChecked(e.target.checked)}
          />
          {hasChildFeatureFlags(childFeatureFlags)
              && <DropdownIcon isOpen={parentFeatureFlagIsChecked} />}
        </div>
      </FeatureFlagContainer>

      {hasChildFeatureFlags(childFeatureFlags) && (
      <FeatureFlagCSSTransitions
        inProp={(hasChildFeatureFlags(childFeatureFlags) && parentFeatureFlagIsChecked)}
      >
        <div
          css={css`
                padding-right: 40px;
                padding-left: 40px;
              `}
        >
          {childFeatureFlags?.map((childFeatureFlag) => (
            <FeatureFlag key={`featureFlag-${childFeatureFlag.title}`} title={childFeatureFlag.title} />
          ))}
        </div>
      </FeatureFlagCSSTransitions>
      )}
    </>
  );
};

export default FeatureFlag;
