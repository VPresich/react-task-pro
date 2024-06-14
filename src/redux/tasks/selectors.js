import { createSelector } from 'reselect';

// Basic selectors
const selectTasksState = (state) => state.tasks;
const selectTasksItems = createSelector(selectTasksState, (tasks) => tasks.items);

// Memoized selectors
export const selectAllTasks = selectTasksItems;
export const selectLoading = createSelector(selectTasksState, (tasks) => tasks.loading);
export const selectError = createSelector(selectTasksState, (tasks) => tasks.error);


// export const selectAllTasks = state => state.tasks.items;
// export const selectLoading = state => state.tasks.loading;
// export const selectError = state => state.tasks.error;

// export const selectTasksForColumn = (state, columnId) => {
//   const { items } = state.tasks;
//   console.log(items);
//   const filteredItems = [];

//   items.forEach(item => {
//     const filteredTasks = item.filter(task => task.column._id === columnId);
//     filteredItems.push(...filteredTasks);
//   });

//   return filteredItems;
// };
