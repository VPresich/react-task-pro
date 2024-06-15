import { createSelector } from 'reselect';

// Basic selectors
const selectColumnsState = state => state.columns;
const selectColumnsItems = createSelector(
  selectColumnsState,
  columns => columns.items
);
export const selectActiveColumndId = createSelector(
  selectColumnsState,
  columns => columns.activeColumnId
);

// Memoized selectors
export const selectColumns = selectColumnsState;
export const selectItems = selectColumnsItems;
export const selectIsLoading = createSelector(
  selectColumnsState,
  columns => columns.isLoading
);
export const selectError = createSelector(
  selectColumnsState,
  columns => columns.error
);
export const selectIsAdding = createSelector(
  selectColumnsState,
  columns => columns.isAdding
);
export const selectDeletingItem = createSelector(
  selectColumnsState,
  columns => columns.deleting
);

export const selectActiveColumn = createSelector(
  [selectColumnsItems, selectActiveColumndId],
  (items, activeColumnId) =>
    items.find(item => item._id === activeColumnId) || null
);

export const selectColumnsForBoard = createSelector(
  [selectColumnsItems, (_, boardId) => boardId],
  (items, boardId) => items.filter(item => item.board._id === boardId) || []
);
