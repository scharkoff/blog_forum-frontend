import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import iaxios from 'configs/axios/axios';
import axios from 'axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  try {
    const { data } = await iaxios.post('/auth/login', params);

    return { userData: data.userData, token: data.accessToken };
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  try {
    const { data } = await iaxios.get('/auth/logout');

    return data;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    try {
      const { data } = await iaxios.post('/auth/register', params);

      return { userData: data.userData, token: data.accessToken };
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  },
);

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
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

    return { userData: data.userData };
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

const initialState = {
  data: {
    userData: {},
    token: null,
  },
  status: 'loading',
  authorization: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
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

    [fetchLogout.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchLogout.fulfilled]: (state) => {
      state.status = 'loaded';
      state.data = {
        userData: {},
        token: null,
      };
      state.authorization = false;
    },
    [fetchLogout.rejected]: (state, action) => {
      state.status = 'error';
    },
  },
});

export const selectIsAuth = (state) => state.auth.authorization;

export const authReducer = authSlice.reducer;
