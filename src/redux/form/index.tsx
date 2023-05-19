import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: "",
    show_info: false,
    form_edit: false,
    data_create: false,
    data_update: false,
    values: [],
  },
};

export const userSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    form_: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { form_ } = userSlice.actions;

export default userSlice.reducer;
