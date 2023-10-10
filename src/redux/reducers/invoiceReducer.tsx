import { createSlice } from "@reduxjs/toolkit";

type InvoiceState = {
  sale: string[];
  client: string[];
  invoice: string[];
};

const initialInvoiceState: InvoiceState = {
  sale: [],
  client: [],
  invoice: []
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState:initialInvoiceState,
  reducers: {
    updateInvoiceData: (state, action) => {
      state.sale = action.payload.sale;
      state.client = action.payload.client;
      state.invoice = action.payload.invoice;
    },
    // If you want to update them separately in the future:
    setSaleData: (state, action) => {
      state.sale = action.payload;
    },
    setClientData: (state, action) => {
      state.client = action.payload;
    },
    setInvoiceDetails: (state, action) => {
      state.invoice = action.payload;
    }
  },
});

export const { updateInvoiceData, setSaleData, setClientData, setInvoiceDetails } = invoiceSlice.actions;

export default invoiceSlice.reducer;
