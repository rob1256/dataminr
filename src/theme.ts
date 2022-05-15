import { Theme } from '@emotion/react';

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  lightBlue: '#1F71EEFF',
  darkBlue: '#15448d',
  lightGrey: '#909090',
  darkGrey: '#5E5E5EFF',
  darkSlate: '#0d0d0f',
  lightSlate: '#27272a',
};

const states = {
  featureFlagTrack: colors.lightGrey,
  featureFlagTrackHover: colors.darkGrey,
  featureFlagTrackActive: colors.lightBlue,
  featureFlagTrackActiveHover: colors.darkBlue,
};

const backgrounds = {
  main: colors.darkSlate,
  group: colors.lightSlate,
  selectControl: colors.darkSlate,
  selectOptionFocused: colors.lightSlate,
};

const textColors = {
  default: colors.white,
};

const theme: Theme = {
  colors,
  states,
  backgrounds,
  textColors,
};

export default theme;
