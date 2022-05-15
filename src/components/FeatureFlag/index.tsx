/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
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
import AdditionalInput from './AdditionalInput';

const hasChildFeatureFlags = (childFeatureFlags: IFeatureFlag[] | undefined): boolean => (
  childFeatureFlags
  && childFeatureFlags?.length > 0
) as boolean;

interface IFeatureFlagComponent extends IFeatureFlag {
  parentId?: string
}

// TODO: add input dropdown
const FeatureFlag: React.FC<IFeatureFlagComponent> = ({
  id,
  parentId,
  title,
  childFeatureFlags,
  additionalInput,
}): ReactElement => {
  const isFlagChecked = useSelector(selectIsFlagChecked(id, parentId));
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
        {additionalInput && (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <AdditionalInput {...additionalInput} />
        )}
        <div>
          <Toggle
            icons={false}
            checked={isFlagChecked}
            // @ts-ignore
            onChange={(e) => dispatch(
              toggleFeatureFlag({ id, parentId, isChecked: e.target.checked }),
            )}
          />
          {hasChildFeatureFlags(childFeatureFlags)
              && <DropdownIcon isOpen={isFlagChecked} />}
        </div>
      </FeatureFlagContainer>

      {hasChildFeatureFlags(childFeatureFlags) && (
        <FeatureFlagCSSTransitions
          inProp={(hasChildFeatureFlags(childFeatureFlags) && isFlagChecked)}
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
                parentId={id}
                title={childFeatureFlag.title}
              />
            ))}
          </div>
        </FeatureFlagCSSTransitions>
      )}
    </>
  );
};

FeatureFlag.defaultProps = {
  parentId: undefined,
};

export default FeatureFlag;
