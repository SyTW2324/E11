import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers/reducers';
import authReducer from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    redu: reducer,
  },
});

export default store;