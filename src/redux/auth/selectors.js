// export const selectIsLoggedIn = state => state.auth.isLoggedIn;
// export const selectUser = state => state.auth.user;
// export const selectTheme = state => state.auth.user.theme;
// export const selectIsRefreshing = state => state.auth.isRefreshing;
import { createSelector } from 'reselect';

// Basic selectors
const selectAuth = (state) => state.auth;
export const selectUser = createSelector(selectAuth, (auth) => auth.user);

// Memoized selectors
export const selectIsLoggedIn = createSelector(selectAuth, (auth) => auth.isLoggedIn);
export const selectTheme = createSelector(selectUser, (user) => user.theme);
export const selectIsRefreshing = createSelector(selectAuth, (auth) => auth.isRefreshing);
// export const selectUserDetails = selectUser; // Alias for clarity if needed