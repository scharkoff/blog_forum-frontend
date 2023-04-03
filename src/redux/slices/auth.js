import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'configs/axios/axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  try {
    const { data } = await axios.post('/auth/login', params);

    return data.userData;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    try {
      const { data } = await axios.post('/auth/register', params);

      return data.userData;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data.userData;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

const initialState = {
  data: null,
  status: 'loading',
  authorization: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.authorization = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.authorization = false;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.authorization = action.payload?.isError ? false : true;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error';
      state.authorization = false;
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.authorization = false;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.authorization = action.payload?.isError ? false : true;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.authorization = false;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.authorization = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = 'loaded';
      state.authorization = action.payload?.isError ? false : true;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = action.data;
      state.status = 'error';
      state.authorization = false;
    },
  },
});

export const selectIsAuth = (state) => state.auth?.authorization;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
