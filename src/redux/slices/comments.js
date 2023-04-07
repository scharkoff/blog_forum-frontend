import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'configs/axios/axios';

export const fetchComments = createAsyncThunk(
  'posts/fetchComments',
  async () => {
    const { data } = await axios.get('/comments');

    return data.comments;
  },
);

export const fetchLastsComments = createAsyncThunk(
  'posts/fetchLastsComments',
  async () => {
    const { data } = await axios.get('/comments/lasts');

    return data.comments;
  },
);

export const fetchRemoveComment = createAsyncThunk(
  'posts/fetchRemoveComment',
  async (data) => {
    axios.delete(`/comments/${data.commentId}`);
  },
);
