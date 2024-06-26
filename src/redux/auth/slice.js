import { createSlice } from '@reduxjs/toolkit';
import { setAuthHeader } from '../../api/axiosInst';
import {
  register,
  logIn,
  logOut,
  refreshUser,
  updateAvatar,
  updateProfile,
  updateTheme,
} from './operations';

const initialState = {
  user: { name: null, email: null, theme: 'light', avatarURL: '' },
  token: null,
  isLoggedIn: false,
  isRefreshing: true,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.user.theme = action.payload;
    },
    resetRefreshState(state, action) {
      state.isRefreshing = action.payload;
    },
    saveToken(state, action) {
      state.token = action.payload;
      setAuthHeader(state.token);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logIn.pending, state => {
        state.error = null;
        state.isLoggedIn = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logOut.pending, state => {
        state.error = null;
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null, theme: 'Light' };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })

      //------------------------------------------
      .addCase(updateAvatar.pending, state => {
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload.avatarURL;
        state.error = null;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.error = action.payload;
      })
      //------------------------------------------
      .addCase(updateProfile.pending, state => {
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      })
      //------------------------------------------

      .addCase(updateTheme.pending, state => {
        state.error = null;
      })
      .addCase(updateTheme.fulfilled, (state, action) => {
        state.user.theme = action.payload.theme;
        state.error = null;
      })
      .addCase(updateTheme.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setTheme } = authSlice.actions;
export const { resetRefreshState } = authSlice.actions;
export default authSlice.reducer;
export const { saveToken } = authSlice.actions;
