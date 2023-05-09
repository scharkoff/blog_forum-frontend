import axios from 'configs/axios/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const { data } = await axios.get('/users');
    return data.users;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async (id) => {
    try {
      const { data } = await axios.delete(`/users/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
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
      throw new Error(error.response.data.message);
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
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'error';
    },

    [fetchDeleteUser.fulfilled]: (state, action) => {
      state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
      state.status = 'loaded';
    },
    [fetchDeleteUser.rejected]: (state, action) => {
      state.status = 'error';
    },

    [fetchUpdateByCondition.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
    [fetchUpdateByCondition.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export const usersReducer = usersSlice.reducer;
