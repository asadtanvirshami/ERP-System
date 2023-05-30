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
