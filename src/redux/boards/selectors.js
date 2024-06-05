export const selectBoards = state => state.boards;
export const selectItems = state => state.boards.items;
export const selectIsLoading = state => state.boards.isLoading;
export const selectError = state => state.boards.error;
export const selectIsAdding = state => state.boards.isAdding;
export const selectDeletingItem = state => state.boards.deletingItem;

export const selectUpdatingItem = state => {
  const { items, updatingItem } = state.boards;
  return items.find(item => item.id === updatingItem) || null;
};
