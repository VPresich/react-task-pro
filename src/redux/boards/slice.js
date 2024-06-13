import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
// import { fetchColumnsForBoard } from '../columns/operations';
// import { fetchTasksForColumn } from '../tasks/operations';
import {
  fetchBoards,
  deleteBoard,
  addBoard,
  updateBoard,
  getBoardById,
  // getColumnsAndTasks,
} from './operations';

const boardsSlice = createSlice({
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
          board => board.id === action.payload._id
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
        const boardIndex = state.items.findIndex(
          board => board._id === updatedBoard._id
        );
        if (boardIndex !== -1) {
          state.items[boardIndex] = updatedBoard;
        }
        state.error = null;
        state.updatingItem = null;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })
      //-----------------------------------------------
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      })
      //-----------------------------------------------
      .addCase(getBoardById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          task => task._id === action.payload.id
        );
        index
          ? (state.items[index] = action.payload)
          : state.items.push(action.payload);
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    //-----------------------------------------------
    //TODO
    // .addCase(getColumnsAndTasks.pending, state => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(getColumnsAndTasks.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.error = null;
    //   const { tasks, ...columnData } = action.payload;
    //   console.log('columnData', columnData);
    //   fetchColumnsForBoard.fulfilled(columnData);
    //   fetchTasksForColumn.fulfilled(tasks);
    // })
    // .addCase(getColumnsAndTasks.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { setActiveBoard } = boardsSlice.actions;
export default boardsSlice.reducer;
