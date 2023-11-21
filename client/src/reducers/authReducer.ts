// client/src/reducers/authReducer.ts

import { AuthActionTypes, SET_USER, SET_ERROR, LOGOUT } from '../actions/types';

interface AuthState {
  isAuthenticated: boolean;
  user: any; // Tipo del usuario autenticado
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
