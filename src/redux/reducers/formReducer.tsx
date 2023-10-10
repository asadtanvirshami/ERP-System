import { createSlice } from "@reduxjs/toolkit";

type FormState = {
  value: {
    _id: string;
    info: boolean;
    edit: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    open: boolean;
    values: any[];  // Use appropriate type instead of any if possible
  };
};

const initialFormState: FormState = {
  value: {
    _id: "",
    info: false,
    edit: false,
    create: false,
    update: false,
    delete: false,
    open: false,
    values: []
  }
};

export const formSlice = createSlice({
  name: "form",
  initialState: initialFormState,  // Corrected here
  reducers: {
    form_: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { form_ } = formSlice.actions;

export default formSlice.reducer;
