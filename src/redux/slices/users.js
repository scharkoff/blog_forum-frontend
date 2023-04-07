import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'configs/axios/axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const { data } = await axios.get('/users');

    return data.users;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async (id) => {
    try {
      const { data } = await axios.delete(`/users/${id}`);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  },
);

export const fetchUpdateByCondition = createAsyncThunk(
  'auth/fetchUpdateByCondition',
  async (params) => {
    try {
      const { data } = await axios.patch(`/users/${params.id}`, params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  },
);

const initialState = {
  data: [],
  status: 'loading',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      if (!action.payload.isError) {
        state.data = action.payload;
        state.status = 'loaded';
      }
    },

    [fetchDeleteUser.fulfilled]: (state, action) => {
      if (!action.payload.isError)
        state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const usersReducer = usersSlice.reducer;
