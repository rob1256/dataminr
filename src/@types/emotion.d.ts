import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string
      black: string
      lightBlue: string
      darkBlue: string
      lightGrey: string
      darkGrey: string
      darkSlate: string
      lightSlate: string
    }
    states: {
      featureFlagTrack: string
      featureFlagTrackHover: string
      featureFlagTrackActive: string
      featureFlagTrackActiveHover: string
    }
    backgrounds: {
      main: string
      group: string
    }
    textColors: {
      default: string
    }
  }
}
