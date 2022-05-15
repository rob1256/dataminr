/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface IDropdownIcon {
  isOpen: boolean
}

const DropdownIcon: React.FC<IDropdownIcon> = ({ isOpen }): ReactElement => (
  <span
    css={css`
      margin-left: 15px;
      font-weight: bold;
      position: relative;
      top: -6px;
    `}
  >
    {isOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
  </span>
);

export default DropdownIcon;
