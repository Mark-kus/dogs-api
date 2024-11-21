import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './Redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.jsx';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URI || 'http://localhost:3001/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);