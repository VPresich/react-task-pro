import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchAll",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get("/tasks");
  
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

export const deleteTask = createAsyncThunk(
    "tasks/deleteTasks",
    async (taskId, thunkAPI) => {
      try {
        const response = await axios.delete(`/task/${taskId}`);
  
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    });

    export const addTask = createAsyncThunk(
        "tasks/addTask",
      
        async (nowTask, thunkAPI) => {
          try {
            const response = await axios.post(`/tasks`, nowTask);
      
            return response.data;
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
        }
      );

      export const editTask = createAsyncThunk(
        "tasks/editContact",
      
        async (taskId, thunkAPI) => {
          try {
            const response = await axios.patch(`/tasks/${taskId}`);
      
            return response.data;
          } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
          }
        }
      );