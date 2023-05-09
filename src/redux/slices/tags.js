import axios from 'configs/axios/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTags = createAsyncThunk('posts/fetchLastsTags', async () => {
  const { data } = await axios.get('/tags/lasts');
  return data.lastTags;
});
