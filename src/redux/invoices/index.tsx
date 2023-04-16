import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  invoices:[]
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    invoice: (state, action) => {
      state.value = action.payload
    },
    addCompanies: (state, action) => {
      state.invoices = action.payload
    },
  },
})

export const { invoice, addCompanies } = invoiceSlice.actions

export default invoiceSlice.reducer