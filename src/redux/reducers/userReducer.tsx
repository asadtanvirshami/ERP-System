// authReducer.js
import {
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FALIURE,
  LOGOUT,
} from "../constants/userConstants";

const initialState = {
  isAuthenticated: false,
  user: {},
  role: {},
  error: {},
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        role: action.payload.role,
        error: {},
      };
    case USER_SIGNIN_FALIURE:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        role: {},
        error: action.payload.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
