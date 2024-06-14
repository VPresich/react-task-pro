// export const selectBoards = state => state.boards;
// export const selectActiveBoardId = state => state.boards.activeBoardId;
// export const selectItems = state => state.boards.items;
// export const selectIsLoading = state => state.boards.isLoading;
// export const selectError = state => state.boards.error;
// export const selectIsAdding = state => state.boards.isAdding;
// export const selectDeletingItem = state => state.boards.deletingItem;

// export const selectUpdatingItem = state => {
//   const { items, updatingItem } = state.boards;
//   return items.find(item => item.id === updatingItem) || null;
// };

// export const selectActiveBoard = state => {
//   const { items, activeBoardId } = state.boards;
//   return items.find(item => item._id === activeBoardId) || null;
// }

import { createSelector } from 'reselect';

// Basic selectors
const selectBoardsState = (state) => state.boards;
const selectBoardsItems = createSelector(selectBoardsState, (boards) => boards.items);
export const selectActiveBoardId = createSelector(selectBoardsState, (boards) => boards.activeBoardId);
const selectUpdatingItemId = createSelector(selectBoardsState, (boards) => boards.updatingItem);

// Memoized selectors
export const selectBoards = selectBoardsState;
export const selectItems = selectBoardsItems;
export const selectIsLoading = createSelector(selectBoardsState, (boards) => boards.isLoading);
export const selectError = createSelector(selectBoardsState, (boards) => boards.error);
export const selectIsAdding = createSelector(selectBoardsState, (boards) => boards.isAdding);
export const selectDeletingItem = createSelector(selectBoardsState, (boards) => boards.deletingItem);

export const selectUpdatingItem = createSelector(
  [selectBoardsItems, selectUpdatingItemId],
  (items, updatingItemId) => items.find(item => item.id === updatingItemId) || null
);

export const selectActiveBoard = createSelector(
  [selectBoardsItems, selectActiveBoardId],
  (items, activeBoardId) => items.find(item => item._id === activeBoardId) || null
);
