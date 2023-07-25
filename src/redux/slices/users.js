import axios from 'configs/axios/axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/users');
      return data.users;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.get(`/users/${params.id}`);
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  'users/fetchDeleteUser',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/users/${id}`);
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchUpdateByCondition = createAsyncThunk(
  'auth/fetchUpdateByCondition',
  async (params, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/users/${params.id}`, params);
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
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
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },

    [fetchUserById.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchUserById.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [fetchUserById.fulfilled]: (state, action) => {
      state.user.data = action.payload?.user;
      state.isLoading = false;
      state.error = null;
    },

    [fetchDeleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchDeleteUser.fulfilled]: (state, action) => {
      state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
      state.isLoading = false;
      state.error = null;
    },
    [fetchDeleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [fetchUpdateByCondition.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUpdateByCondition.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    [fetchUpdateByCondition.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const usersReducer = usersSlice.reducer;
