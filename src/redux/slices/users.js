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

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (params) => {
    try {
      const { data } = await axios.get(`/users/${params.id}`);
      return data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
);

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
  user: {
    data: {},
    message: '',
  },
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },

    [fetchUserById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.user.data = action.payload?.user;
      state.isLoading = false;
    },

    [fetchDeleteUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchDeleteUser.fulfilled]: (state, action) => {
      state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
      state.isLoading = false;
    },
    [fetchDeleteUser.rejected]: (state, action) => {
      state.isLoading = false;
    },

    [fetchUpdateByCondition.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUpdateByCondition.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [fetchUpdateByCondition.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const usersReducer = usersSlice.reducer;
