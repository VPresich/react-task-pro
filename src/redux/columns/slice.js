import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';

import {
  fetchColumnsForBoard,
  addColumnForBoard,
  deleteColumnById,
  updateColumnById,

  //   getColumTasks,
} from './operations';

const columnsSlice = createSlice({
  name: 'columns',
  initialState: {
    items: [],
    activeColumndId: null,
    isLoading: false,
    isAdding: false,
    isDeleting: false,
    error: null,
  },

  reducers: {
    setActiveColumn(state, action) {
      state.activeColumndId = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchColumnsForBoard.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchColumnsForBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload.columns;
      })

      .addCase(fetchColumnsForBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //-----------------------------------

      .addCase(addColumnForBoard.pending, state => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(addColumnForBoard.fulfilled, (state, action) => {
        state.isAdding = false;
        state.error = null;
        state.items.push({
          ...action.payload,
          board: { _id: action.payload.board },
        });
      })
      .addCase(addColumnForBoard.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })
      //-----------------------------------

      .addCase(deleteColumnById.pending, (state, action) => {
        state.isDeleting = action.meta.arg;
        state.error = null;
      })
      .addCase(deleteColumnById.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          column => column.id === action.payload.id
        );

        if (index !== -1) {
          state.items.splice(index, 1);
        }
        state.isDeleting = false;
        state.error = null;
      })
      .addCase(deleteColumnById.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload;
      })
      //-----------------------------------

      .addCase(updateColumnById.pending, state => {
        state.isAdding = true;
        state.error = null;
      })
      .addCase(updateColumnById.fulfilled, (state, action) => {
        state.isAdding = false;
        const updatedColumn = action.payload;
        const columnIndex = state.items.findIndex(
          column => column.id === updatedColumn.id
        );
        if (columnIndex !== -1) {
          state.items[columnIndex] = updatedColumn;
        }
        state.error = null;
        state.isAdding = null;
      })
      .addCase(updateColumnById.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })
      //-----------------------------------
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { setActiveColumn } = columnsSlice.actions;
export default columnsSlice.reducer;
