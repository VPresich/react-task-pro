import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';

import { fetchBoards, deleteBoard, addBoard, updateBoard } from './operations';


const contactsSlice = createSlice({
  name: 'boards',
  initialState: {
    items: [],
    activeBoardId: null,
    isLoading: false,
    error: null,
    isAdding: false,
    deletingItem: null,
    updatingItem: null,
  },
  reducers: {
    setActiveBoard(state, action) {
      state.activeBoardId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBoards.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addBoard.pending, state => {
        state.isAdding = true;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.isAdding = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })

      .addCase(deleteBoard.pending, (state, action) => {
        state.deletingItem = action.meta.arg;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
        state.error = null;
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.deletingItem = null;
        state.error = action.payload;
      })

      .addCase(updateBoard.pending, state => {
        state.isAdding = true;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isAdding = false;
        const updatedBoard = action.payload;
        const contactIndex = state.items.findIndex(
          contact => contact.id === updatedBoard.id
        );
        if (contactIndex !== -1) {
          state.items[contactIndex] = updatedBoard;
        }
        state.error = null;
        state.updatingItem = null;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      })
  }
  
});

export const { setActiveBoard } = contactsSlice.actions;
export default contactsSlice.reducer;

