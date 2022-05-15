import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider, Global, css } from '@emotion/react';

import App from './App';
import { store } from './store/store';
import './reset.css';
import appTheme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <Global
          styles={(theme) => css`
            body {
              background: ${theme.backgrounds.main};
            }
          `}
        />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
