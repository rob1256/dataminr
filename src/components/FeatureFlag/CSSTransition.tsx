import React, { ReactElement } from 'react';
import { ClassNames } from '@emotion/react';
import { CSSTransition } from 'react-transition-group';

interface IFeatureFlagCSSTransition {
  children: ReactElement
  inProp: boolean
}

const FeatureFlagCSSTransition: React.FC<IFeatureFlagCSSTransition> = ({ children, inProp }) => (
  <ClassNames>
    {({ css: classNameCss }) => (
      <CSSTransition
        in={inProp}
        timeout={300}
        unmountOnExit
        classNames={{
          enter: classNameCss({
            maxHeight: 0,
          }),
          enterActive: classNameCss({
            maxHeight: '1500px',
            transition: 'max-height 300ms',
          }),
          exit: classNameCss({
            maxHeight: '1500px',
          }),
          exitActive: classNameCss({
            maxHeight: 0,
            transition: 'max-height 300ms',
          }),
        }}
      >
        {children}
      </CSSTransition>
    )}
  </ClassNames>
);

export default FeatureFlagCSSTransition;
