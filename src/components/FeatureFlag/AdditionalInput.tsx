/** @jsxImportSource @emotion/react */
import React, { ReactElement } from 'react';
import { useTheme, Theme } from '@emotion/react';
import Select, { ClassNamesState, Theme as ReactSelectTheme } from 'react-select';
import * as R from 'ramda';

import { IFeatureFlagAdditionalInput } from '../../schema';

const schemaOptionsToReactSelectOptions = R.map((option) => ({
  value: option,
  label: option,
}));

const customDropdownStyles = (theme: Theme) => ({
  control: (provided: ReactSelectTheme) => ({
    ...provided,
    backgroundColor: `${theme.backgrounds.selectControl}`,
    border: 'none',
    color: `${theme.textColors.default}`,
    marginRight: '10px',
  }),
  singleValue: (provided: ReactSelectTheme) => ({
    ...provided,
    color: `${theme.textColors.default}`,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided: ReactSelectTheme) => ({
    ...provided,
    backgroundColor: `${theme.backgrounds.selectControl}`,
  }),
  option: (provided: ReactSelectTheme, state: ClassNamesState) => ({
    ...provided,
    backgroundColor: state.isFocused ? `${theme.backgrounds.selectOptionFocused}` : 'none',
  }),
});

const DropDown: React.FC<IFeatureFlagAdditionalInput> = ({
  options,
}): ReactElement => {
  const theme = useTheme();

  return (
    <Select
      // @ts-ignore
      styles={customDropdownStyles(theme)}
      options={schemaOptionsToReactSelectOptions(options)}
    />
  );
};

const componentMap = {
  dropdown: DropDown,
};

const AdditionalInput: React.FC<IFeatureFlagAdditionalInput> = (props): ReactElement => {
  const { type } = props;
  const Component = componentMap[type];

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...props} />;
};

export default AdditionalInput;
