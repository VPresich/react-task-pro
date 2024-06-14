// export const selectColumns = state => state.columns;
// export const selectActiveColumndId = state => state.columns.activeColumndId;
// export const selectItems = state => state.columns.items;
// export const selectIsLoading = state => state.columns.isLoading;
// export const selectError = state => state.columns.error;
// export const selectIsAdding = state => state.columns.isAdding;
// export const selectDeletingItem = state => state.columns.deleting;

// export const selectActiveColumn = state => {
//   const { items, activeColumnId } = state.columns;
//   return items.find(item => item._id === activeColumnId) || null;
// };

// export const selectColumnsForBoard = (state, boardId) => {
//   const { items } = state.columns;
//   //   return  items.filter(item => item.board._id === boardId) || null;
//   // const filteredItems = [];

//   // items.forEach(item => {
//   //   const filteredColumns = item.filter(column => column.board._id === boardId);
//   //   filteredItems.push(...filteredColumns);
//   // });

//   // return filteredItems;

//   const filteredItems = items.flat().filter(item => item.board._id === boardId);

//   return filteredItems;
// };

import { createSelector } from 'reselect';

// Basic selectors
const selectColumnsState = (state) => state.columns;
const selectColumnsItems = createSelector(selectColumnsState, (columns) => columns.items);
export const selectActiveColumndId = createSelector(selectColumnsState, (columns) => columns.activeColumnId);

// Memoized selectors
export const selectColumns = selectColumnsState;
export const selectItems = selectColumnsItems;
export const selectIsLoading = createSelector(selectColumnsState, (columns) => columns.isLoading);
export const selectError = createSelector(selectColumnsState, (columns) => columns.error);
export const selectIsAdding = createSelector(selectColumnsState, (columns) => columns.isAdding);
export const selectDeletingItem = createSelector(selectColumnsState, (columns) => columns.deleting);

export const selectActiveColumn = createSelector(
  [selectColumnsItems, selectActiveColumndId],
  (items, activeColumnId) => items.find(item => item._id === activeColumnId) || null
);

export const selectColumnsForBoard = createSelector(
  [selectColumnsItems, (_, boardId) => boardId],
  (items, boardId) => items.filter(item => item.board._id === boardId) || []
);
