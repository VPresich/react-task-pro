import { createSlice } from '@reduxjs/toolkit';
import { logOut } from '../auth/operations';
import { fetchBackGrounds } from './operations';

const backGroundsSlice = createSlice({
  name: 'baclgrounds',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBackGrounds.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchBackGrounds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchBackGrounds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //-----------------------------------------------
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
    //-----------------------------------------------
  },
});

export default backGroundsSlice.reducer;
