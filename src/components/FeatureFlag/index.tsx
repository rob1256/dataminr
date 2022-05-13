/** @jsxImportSource @emotion/react */
import React, { ReactElement, useState } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
// @ts-ignore
import Toggle from 'react-toggle';

import { IFeatureFlag } from '../../schema';
import { useAppDispatch } from '../../store/store';
import { selectIsFlagChecked, toggleFeatureFlag } from '../../reducers/featureFlags';

import FeatureFlagContainer from './Container';
import DropdownIcon from './DropdownIcon';
import FeatureFlagCSSTransitions from './CSSTransition';

const hasChildFeatureFlags = (childFeatureFlags: IFeatureFlag[] | undefined): boolean => (
  childFeatureFlags
  && childFeatureFlags?.length > 0
) as boolean;

const FeatureFlag: React.FC<IFeatureFlag> = ({
  id,
  title,
  childFeatureFlags,
}): ReactElement => {
  const [parentFeatureFlagIsChecked] = useState<boolean>(false);

  const isFlagChecked = useSelector(selectIsFlagChecked(id));
  console.log({ id, isFlagChecked });
  const dispatch = useAppDispatch();

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
            icons={false}
            checked={isFlagChecked}
            // @ts-ignore
            onChange={(e) => dispatch(toggleFeatureFlag({ id, isChecked: e.target.checked }))}
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
            <FeatureFlag
              key={`featureFlag-${childFeatureFlag.title}`}
              id={childFeatureFlag.id}
              title={childFeatureFlag.title}
            />
          ))}
        </div>
      </FeatureFlagCSSTransitions>
      )}
    </>
  );
};

export default FeatureFlag;
