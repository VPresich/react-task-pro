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

export const addTask = createAsyncThunk(
  'tasks/addTask',

  async ({ columnId, newTask }, thunkAPI) => {
    try {
      const response = await axiosInst.post(
        `columns/${columnId}/tasks`,
        newTask
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editTask = createAsyncThunk(
  'tasks/editTask',

  async ({ columnId, taskId, values }, thunkAPI) => {
    try {
      const response = await axiosInst.patch(
        `columns${columnId}/tasks/${taskId}`,
        values
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTasksForBoard = createAsyncThunk(
  'tasks/fetchTasksForBoard',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.get(`boards/${id}/tasks`);
      return { boardId: id, tasks: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTasksForColumn = createAsyncThunk(
  'tasks/fetchTasksForColumn',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInst.get(`columns/${id}/tasks`);
      return { columnId: id, tasks: response.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
