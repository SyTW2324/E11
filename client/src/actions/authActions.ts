// client/src/actions/authActions.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../reducers';
import { AuthActionTypes, SET_USER, SET_ERROR, LOGOUT } from './types';
import { register, login, getUserInfo } from '../services/authService';

// Acción para establecer la información del usuario autenticado
export const setUser = (user: any): AuthActionTypes => ({
  type: SET_USER,
  payload: user,
});

// Acción para establecer mensajes de error
export const setError = (error: string): AuthActionTypes => ({
  type: SET_ERROR,
  payload: error,
});



// Acción para realizar el registro de usuario
export const registerUser = (
  userData: any
): ThunkAction<void, RootState, null, AuthActionTypes> => async dispatch => {
  try {
    const response = await register(userData);
    dispatch(setUser(response.user));
  } catch (error: any) {
    dispatch(setError(error.response.data.message));
  }
};

// Acción para realizar el inicio de sesión
export const loginUser = (
  userData: any
): ThunkAction<void, RootState, null, AuthActionTypes> => async dispatch => {
  try {
    const response = await login(userData);
    dispatch(setUser(response.user));
  } catch (error: any) {
    dispatch(setError(error.response.data.message));
  }
};

// Acción para obtener la información del usuario
export const checkUser = (): ThunkAction<void, RootState, null, AuthActionTypes> => async dispatch => {
  try {
    const response = await getUserInfo();
    dispatch(setUser(response.user));
  } catch (error) {
    // Puedes manejar errores aquí según tus necesidades
    console.error('Error al obtener la información del usuario:', error);
    dispatch(logoutUser());
  }
};

// Acción para cerrar sesión
export const logoutUser = (): AuthActionTypes => ({
  type: LOGOUT,
});

export type { AuthActionTypes };

