import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AddEmployeesPayload {
  taskId: string;
  employeeIds: string[];
}

export const addEmployees = createAsyncThunk(
  'tasks/addEmployees',
  async ({ taskId, employeeIds }: AddEmployeesPayload, { rejectWithValue }) => {
    try {
      await axios.put(`/tasks/${taskId}/addEmployees`, { employeeIds });
      return taskId;
    } catch (error) {
      return rejectWithValue('Failed to add employees to task');
    }
  }
);

interface TaskState {
  loading: boolean;
  error: string;
}

const initialState: TaskState = {
  loading: false,
  error: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmployees.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addEmployees.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(addEmployees.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
