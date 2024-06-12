import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst';

export const sendSupportEmail = createAsyncThunk(
  'support/sendEmail',
  async (data, thunkAPI) => {
    try {
      const response = await axiosInst.post('help', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
