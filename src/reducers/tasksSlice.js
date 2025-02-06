import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API_URL = "https://jsonplaceholder.typicode.com/todos";


export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get(API_URL);
  return response.data; 
});

export const addTaskAPI = createAsyncThunk("tasks/addTask", async (task) => {
  
  return {
    ...task,
    id: Math.random().toString(36).substr(2, 9), 
  };
});

export const updateTaskAPI = createAsyncThunk("tasks/updateTask", async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data; 
});

export const deleteTaskAPI = createAsyncThunk("tasks/deleteTask", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id; 
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(addTaskAPI.fulfilled, (state, action) => {
        state.items.unshift(action.payload); 
      })

      
      .addCase(updateTaskAPI.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      
      .addCase(deleteTaskAPI.fulfilled, (state, action) => {
        state.items = state.items.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
