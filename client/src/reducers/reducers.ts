import store from "../store"

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
}

export const userLoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false
      }
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state
  }
}

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false
      }
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'LOGOUT_SUCCESS':
    case 'REGISTER_FAIL':
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state
  }
}

export type RootState = ReturnType<typeof store.getState>

export default reducer