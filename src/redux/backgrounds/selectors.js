import { createSelector } from 'reselect';

// Basic selectors
const selectBackGroundsState = state => state.backgrounds;
export const selectBackGrounds = createSelector(
  selectBackGroundsState,
  backgrounds => backgrounds.items
);
