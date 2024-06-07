import { createSlice } from "@reduxjs/toolkit";
import { deleteTask,addTask, editTask } from "./operations";

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
      items: [],
      isLoading: false,
      error: null,
    }
}
.addCase(deleteTask .pending, (state) => {
    state.error = false;
    state.isLoading = true;
  })
  .addCase(deleteTask.fulfilled, (state, action) => {
    state.isLoading = false;
    state.items = state.items.filter(
      (item) => item.id !== action.payload.id
    );
  })
  .addCase(deleteTask.rejected, (state, action) => {
    console.log(action);
    state.error = true;
    state.isLoading = false;
  })
  .addCase(addTask .pending, (state) => {
    state.error = false;
    state.isLoading = true;
  })
  .addCase(addTask.fulfilled, (state, action) => {
    state.isLoading = false;
    state.items.push(action.payload);
  })
  .addCase(addTask.rejected, (state, action) => {
    console.log(action);
    state.error = true;
    state.isLoading = false;
  })
  .addCase(editTask .pending, (state) => {
    state.error = false;
    state.isLoading = true;
  })
  .addCase(editTask.fulfilled, (state, action) => {
    state.isLoading = false;
    const { id } = action.payload;
        const existingItemIndex = state.items.findIndex(item => item.id === id);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex] = action.payload; 
        }
        
    
  })
  .addCase(editTask.rejected, (state, action) => {
    console.log(action);
    state.error = true;
    state.isLoading = false;
  })
)

export const tasksReducer = tasksSlice.reducer;