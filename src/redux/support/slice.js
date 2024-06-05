import { createSlice } from '@reduxjs/toolkit';
import { sendSupportEmail } from './operations';

const supportSlice = createSlice({
  name: 'support',
  initialState: {
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(sendSupportEmail.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendSupportEmail.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(sendSupportEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default supportSlice.reducer;
export const selectStateSupport = state => state.support;
