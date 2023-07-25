import axios from 'configs/axios/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/comments');
      return data.comments;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchLastsComments = createAsyncThunk(
  'posts/fetchLastsComments',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/comments/lasts');
      return data.comments;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchRemoveComment = createAsyncThunk(
  'posts/fetchRemoveComment',
  async (data, thunkAPI) => {
    try {
      axios.delete(`/comments/${data.commentId}`);
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);
