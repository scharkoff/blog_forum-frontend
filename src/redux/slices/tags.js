import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'configs/axios/axios';

export const fetchTags = createAsyncThunk('posts/fetchLastsTags', async () => {
  const { data } = await axios.get('/tags/lasts');
  return data.lastTags;
});
