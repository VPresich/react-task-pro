import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst';

export const fetchBoards = createAsyncThunk(
  'boards/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get('boards');
      console.log('response qqqq', response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (values, thunkAPI) => {
    try {
      const response = await axiosInst.post('boards', values);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`boards/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (data, thunkAPI) => {
    try {
      console.log({ name: data.name, number: data.number });
      const response = await axiosInst.patch(`boards/${data.id}`, {
        title: data.title,
        background: data.background,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
