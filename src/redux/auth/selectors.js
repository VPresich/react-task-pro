import { createSelector } from 'reselect';

// Basic selectors
const selectAuth = state => state.auth;
export const selectUser = createSelector(selectAuth, auth => auth.user);

// Memoized selectors
export const selectIsLoggedIn = createSelector(
  selectAuth,
  auth => auth.isLoggedIn
);
export const selectTheme = createSelector(selectUser, user => user.theme);
export const selectIsRefreshing = createSelector(
  selectAuth,
  auth => auth.isRefreshing
);
// export const selectUserDetails = selectUser; // Alias for clarity if needed
