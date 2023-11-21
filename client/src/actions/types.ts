// client/src/actions/types.ts

export const SET_USER = 'SET_USER';
export const SET_ERROR = 'SET_ERROR';
export const LOGOUT = 'LOGOUT';

interface SetUserAction {
  type: typeof SET_USER;
  payload: any; // Tipo del usuario autenticado
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string; // Tipo del mensaje de error
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes = SetUserAction | SetErrorAction | LogoutAction;
