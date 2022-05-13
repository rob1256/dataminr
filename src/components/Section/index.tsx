/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';

import { ISection } from '../../schema/types';

const Section: React.FC<ISection> = ({ title }): ReactElement => (
  <div>
    <h2>{title}</h2>
    <div
      css={() => css`
        display: grid;
        grid-template-columns: auto auto auto;
      `}
    >
      fsefe
    </div>
  </div>
);

export default Section;
