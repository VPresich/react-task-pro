import { createSelector } from 'reselect';
import { selectFilterPriority } from '../filter/selectors';

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

export const selectTasksByPriority = createSelector(
  [selectTasksItems, selectFilterPriority],
  (items, filterPriority) => {
    if (!items || items.length === 0) return [];
    if (filterPriority === 'all') return items;
    return items.filter(
      item => item.priority.toLowerCase() === filterPriority.toLowerCase()
    );
  }
);

export const selectTasksForColumn = createSelector(
  [selectTasksByPriority, (_, columnId) => columnId],
  (items, columnId) => items.filter(item => item.column === columnId) || []
);
