export const userLoading = () => {
  return {
    type: 'USER_LOADING'
  }
}

export const userLoaded = (user: any) => {
  return {
    type: 'USER_LOADED',
    payload: user
  }
}

export const authError = () => {
  return {
    type: 'AUTH_ERROR'
  }
}

export const loginSuccess = (user: any) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user
  }
}

export const loginFail = () => {
  return {
    type: 'LOGIN_FAIL'
  }
}

export const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS'
  }
}

export const registerSuccess = (user: any) => {
  return {
    type: 'REGISTER_SUCCESS',
    payload: user
  }
}

export const registerFail = () => {
  return {
    type: 'REGISTER_FAIL'
  }
}

