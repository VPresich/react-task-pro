import { createSelector } from 'reselect';

// Basic selectors
const selectTasksState = state => state.tasks;
const selectTasksItems = createSelector(selectTasksState, tasks => tasks.items);

// Memoized selectors
export const selectAllTasks = selectTasksItems;
export const selectLoading = createSelector(
  selectTasksState,
  tasks => tasks.loading
);
export const selectError = createSelector(
  selectTasksState,
  tasks => tasks.error
);

export const selectTasksForColumn = createSelector(
  [selectTasksItems, (_, columnId) => columnId],
  (items, columnId) => items.filter(item => item.column === columnId) || []
);
