import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst';

export const fetchColumnsForBoard = createAsyncThunk(
  'columns/fetchColumnsForBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.get(`boards/${id}/columns`);
      return { boardId: id, columns: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addColumnForBoard = createAsyncThunk(
  'columns/addColumnForBoard',
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await axiosInst.post(`boards/${id}/columns`, { title });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteColumnById = createAsyncThunk(
  'columns/deleteById',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`columns/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateColumnById = createAsyncThunk(
  'columns/updateColumn',
  async ({ id, title }, thunkAPI) => {
    try {
      const response = await axiosInst.patch(`columns/${id}`, { title });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
