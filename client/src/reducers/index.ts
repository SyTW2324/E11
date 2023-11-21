// client/src/reducers/index.ts

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  redu: reducer
  // Otros reductores si los tienes
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
