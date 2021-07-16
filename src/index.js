import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { I18nextProvider } from 'react-i18next';

import store from './store';
import './index.css';
import './assests/styles/scss/_main.scss'
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import i18n from './localisation'
import AxiosInterceptors from './components/helper/HOC/AxiosInterceptors'
import config from './config';

ReactDOM.render(
  <React.StrictMode>
  <Router basename={`/${config.folder}/#`}>
  <Provider store={store}>
  <AxiosInterceptors>
  <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
  </AxiosInterceptors>
  </Provider>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
