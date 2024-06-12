import { createSlice } from '@reduxjs/toolkit';

const initialState = 'all';

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    filterPriority: initialState,
  },
  reducers: {
    filterByPriority: {
      reducer: (state, action) => {
        return { ...state, filterPriority: action.payload };
      },
    },
  },
});

export const { filterByPriority } = filterSlice.actions;
export default filterSlice.reducer;
