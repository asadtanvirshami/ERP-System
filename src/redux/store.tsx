import { configureStore } from '@reduxjs/toolkit';

import formReducer from '../redux/form/index'
import userReducer from '../redux/user/index'

export const store = configureStore({
  reducer: {
    form: formReducer,
    user: userReducer
  },
})