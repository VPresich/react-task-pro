import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst.js';

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`/tasks/${taskId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const addTask = createAsyncThunk(
//   'tasks/addTask',

//   async (newTask, thunkAPI) => {
//     try {
//       const response = await axiosInst.post(`/tasks`, newTask);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const editTask = createAsyncThunk(
  'tasks/editTask',

  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInst.patch(`/tasks/${taskId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
