import axios from 'axios';
import iaxios from 'configs/axios/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params) => {
    try {
      const { data } = await iaxios.post('/auth/login', params);
      return {
        userData: data.userData,
        token: data.accessToken,
      };
    } catch (error) {
      console.log('error', error);
      throw new Error(error.response.data.message);
    }
  },
);

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async () => {
  try {
    const { data } = await iaxios.get('/auth/logout');
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    try {
      const { data } = await iaxios.post('/auth/register', params);
      return {
        userData: data.userData,
        token: data.accessToken,
      };
    } catch (error) {
      console.log('error', error);
      throw new Error(error.response.data.message);
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

    return {
      userData: data.userData,
    };
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  data: {
    userData: {},
    token: null,
  },
  isLoading: true,
  authorization: false,
  error: '',
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
    },
    [fetchLogin.rejected]: (state, action) => {
      state.data = action.error.message;
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
      state.data = action.payload;
      state.isLoading = false;
      state.authorization = true;
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
    },
    [fetchLogout.pending]: (state) => {
      state.isLoading = false;
      state.authorization = true;
    },
  },
});

export const selectIsAuth = (state) => state.auth.authorization;

export const authReducer = authSlice.reducer;
