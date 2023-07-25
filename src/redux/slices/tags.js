import axios from 'configs/axios/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk(
  'posts/fetchLastsTags',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/tags/lasts');
      return data.lastTags;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);
