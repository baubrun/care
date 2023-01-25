import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { theme } from "./shared/muiConfig/theme"
import { ThemeProvider} from '@mui/material/styles';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
 </React.StrictMode>,
  document.getElementById('root')
);
