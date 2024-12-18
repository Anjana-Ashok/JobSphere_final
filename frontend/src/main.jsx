
// src/index.js (or App.js, wherever the app is initialized)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider
import store from './redux/store';  // Import the store
import App from './App';
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}> {/* Wrap your app with Provider */}
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
