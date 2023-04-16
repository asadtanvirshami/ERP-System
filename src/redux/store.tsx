import { configureStore } from '@reduxjs/toolkit';

import invoiceReducer from '../redux/invoices/index'
import userReducer from '../redux/user/index'

export const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
    user: userReducer
  },
})