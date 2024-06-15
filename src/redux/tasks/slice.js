import { createSlice } from '@reduxjs/toolkit';
import {
  deleteTask,
  editTask,
  addTask,
  fetchTasksForBoard,
  fetchTasksForColumn,
} from './operations';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(deleteTask.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          item => item._id !== action.payload._id
        );
      })
      .addCase(deleteTask.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(addTask.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(addTask.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(editTask.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const existingItemIndex = state.items.findIndex(
          item => item._id === action.payload._id
        );
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = action.payload;
        }
      })
      .addCase(editTask.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(fetchTasksForBoard.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchTasksForBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.tasks;
      })
      .addCase(fetchTasksForBoard.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })

      .addCase(fetchTasksForColumn.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(fetchTasksForColumn.fulfilled, (state, action) => {
        state.isLoading = false;
        const columnId = action.payload.boardId;
        state.items = state.items.filter(item => item._id !== columnId);
        state.items.push(action.payload.tasks);
      })
      .addCase(fetchTasksForColumn.rejected, state => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export default tasksSlice.reducer;
