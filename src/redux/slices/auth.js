import axios from 'axios';
import iaxios from 'configs/axios/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params, thunkAPI) => {
    try {
      const { data } = await iaxios.post('/auth/login', params);
      return {
        userData: data.userData,
        token: data.accessToken,
      };
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchLogout = createAsyncThunk(
  'auth/fetchLogout',
  async (_, thunkAPI) => {
    try {
      const { data } = await iaxios.get('/auth/logout');
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params, thunkAPI) => {
    try {
      const { data } = await iaxios.post('/auth/register', params);
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/me`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      return {
        userData: data.userData,
      };
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

const initialState = {
  data: {
    userData: {},
    token: null,
  },
  isLoading: false,
  authorization: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [fetchLogin.pending]: (state) => {
      state.isLoading = true;
      state.authorization = false;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.authorization = true;
      state.error = null;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.authorization = false;
    },

    [fetchAuthMe.pending]: (state) => {
      state.isLoading = true;
      state.authorization = false;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.authorization = true;
      state.error = null;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.isLoading = false;
      state.authorization = false;
    },

    [fetchRegister.pending]: (state) => {
      state.isLoading = true;
      state.authorization = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.authorization = false;
      state.error = null;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = action.error.message;
      state.isLoading = false;
      state.authorization = false;
    },

    [fetchLogout.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchLogout.fulfilled]: (state) => {
      state.isLoading = false;
      state.data = {
        userData: {},
        token: null,
      };
      state.authorization = false;
      state.error = null;
    },
    [fetchLogout.pending]: (state) => {
      state.isLoading = false;
      state.authorization = true;
    },
  },
});

export const selectIsAuth = (state) => state.auth.authorization;

export const authReducer = authSlice.reducer;
