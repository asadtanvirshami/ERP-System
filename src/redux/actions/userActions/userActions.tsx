// authActions.js
import { USER_SIGNIN_SUCCESS, USER_SIGNIN_FALIURE, LOGOUT } from '../../constants/userConstants';

export const loginSuccess = (user:any, role:any) => ({
  type: USER_SIGNIN_SUCCESS,
  payload: { user, role },
});

export const loginFailure = (error:Error) => ({
  type: USER_SIGNIN_FALIURE,
  payload: { error },
});

export const logout = () => ({
  type: LOGOUT,
});
