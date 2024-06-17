import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst';

export const fetchBackGrounds = createAsyncThunk(
  'backgrounds/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get('backgrounds');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
