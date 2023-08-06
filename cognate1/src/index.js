import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B3C21',
    },
    secondary: {
      main: '#000000',
    },
    text:{
      disabled: '#000000'
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
<ThemeProvider theme={theme}>
<BrowserRouter>
        <App/>
</BrowserRouter>
</ThemeProvider>


    
  </React.StrictMode>,
  document.getElementById('root')
);


