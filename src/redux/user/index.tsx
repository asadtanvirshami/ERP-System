import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 value:{id:'', email:'', name:'', role:'', type:''}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    user_: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { user_ } = userSlice.actions

export default userSlice.reducer