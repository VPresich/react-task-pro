import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInst } from '../../api/axiosInst.js';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInst.get('/tasks');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTasks',
  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInst.delete(`/task/${taskId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',

  async (newTask, thunkAPI) => {
    try {
      const response = await axiosInst.post(`/tasks`, newTask);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',

  async (taskId, thunkAPI) => {
    try {
      const response = await axiosInst.patch(`/tasks/${taskId}`, {
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
