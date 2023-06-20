import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: "",
    info: false,
    edit: false,
    create: false,
    update: false,
    delete:false,
    values: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    form_: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { form_ } = formSlice.actions;

export default formSlice.reducer;
