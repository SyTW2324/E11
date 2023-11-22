import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import './index.css';
import authReducer from './slices/authSlice';
// import guessReducer from './slices/guessSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);