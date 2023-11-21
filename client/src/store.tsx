import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { userLoginReducer } from '../src/reducers/reducers'

const reducers = combineReducers({
  userLogin: userLoginReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo')!)
  : undefined

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
} as {}

const middleware = [thunk]

const store = configureStore({
  reducer: reducers,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
}
);


export type RootState = ReturnType<typeof store.getState>

export default store