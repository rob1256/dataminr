import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      lightBlue: string;
      darkBlue: string;
      lightGrey: string;
      darkGrey: string;
    };
  }
}
