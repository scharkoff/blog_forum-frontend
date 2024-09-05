import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/store';
import App from './app/App';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import ApolloProvider from './ApolloProvider';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <ApolloProvider>
            <App />
          </ApolloProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </>,
);
