import styled from '@emotion/styled';

/**
 * Container to Feature Flag, mainly for toggle styles
 * Toggle styles were taken from react-toggle repo
 */
const FeatureFlagContainer = styled.div`
  .react-toggle {
    touch-action: pan-x;

    display: inline-block;
    position: relative;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    padding: 0;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    -webkit-tap-highlight-color: transparent;
    
    &-screenreader-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    
    &--disabled {
      cursor: not-allowed;
      opacity: 0.5;
      -webkit-transition: opacity 0.25s;
      transition: opacity 0.25s;
    }

    &:hover:not(.react-toggle--disabled) .react-toggle-track {
      background-color: ${(props) => props.theme.states.featureFlagTrackHover};
    }
    
    &.react-toggle--checked .react-toggle-track {
      background-color: ${(props) => props.theme.states.featureFlagTrackActive};
    }
    
    &--checked:hover:not(.react-toggle--disabled) .react-toggle-track {
      background-color: ${(props) => props.theme.states.featureFlagTrackActiveHover};
    }

    .react-toggle-track {
      width: 50px;
      height: 24px;
      padding: 0;
      border-radius: 30px;
      background-color: ${(props) => props.theme.states.featureFlagTrack};
      -webkit-transition: all 0.2s ease;
      -moz-transition: all 0.2s ease;
      transition: all 0.2s ease;
    }

    .react-toggle-thumb {
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
      position: absolute;
      top: 1px;
      left: 1px;
      width: 22px;
      height: 22px;
      border: 1px solid #4D4D4D;
      border-radius: 50%;
      background-color: #FAFAFA;

      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;

      -webkit-transition: all 0.25s ease;
      -moz-transition: all 0.25s ease;
      transition: all 0.25s ease;
    }

    &--checked .react-toggle-thumb {
      left: 27px;
      border-color: #19AB27;
    }

    &--focus .react-toggle-thumb {
      -webkit-box-shadow: 0px 0px 3px 2px #0099E0;
      -moz-box-shadow: 0px 0px 3px 2px #0099E0;
      box-shadow: 0px 0px 2px 3px #0099E0;
    }

    &:active:not(.react-toggle--disabled) .react-toggle-thumb {
      -webkit-box-shadow: 0px 0px 5px 5px #0099E0;
      -moz-box-shadow: 0px 0px 5px 5px #0099E0;
      box-shadow: 0px 0px 5px 5px #0099E0;
    }
  }
`;

export default FeatureFlagContainer;
