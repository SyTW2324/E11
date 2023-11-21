import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

const store = configureStore(
  {
    reducer: combineReducers({
      // Reducers go here
    }),
    middleware: [thunk]
  }
);



export default store