// -- Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// -- Запрос на авторизацию
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  try {
    const { data } = await axios.post("/auth/login", params);
    return data;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

// -- Запрос на регистрацию
export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    try {
      const { data } = await axios.post("/auth/register", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

// -- Запрос на проверку авторизованности
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

// -- Запрос на обновление логина пользователя
export const fetchUpdateUserLogin = createAsyncThunk(
  "auth/updateUserLogin",
  async (params) => {
    try {
      const { data } = await axios.patch("/auth/updateUserLogin", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

// -- Запрос на обновление логина пользователя
export const fetchUpdateUserRank = createAsyncThunk(
  "auth/fetchUpdateUserRank",
  async (params) => {
    try {
      const { data } = await axios.patch("/auth/updateUserRank", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

// -- Запрос на обновление почты пользователя
export const fetchUpdateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (params) => {
    try {
      const { data } = await axios.patch("/auth/updateUserEmail", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

// -- Запрос на обновление пароля пользователя
export const fetchUpdateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (params) => {
    try {
      const { data } = await axios.patch("/auth/updateUserPassword", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

// -- Запрос на обновление аватар пользователя
export const fetchUpdateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (params) => {
    try {
      const { data } = await axios.patch("/auth/updateUserAvatar", params);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }
  }
);

const initialState = {
  data: null,
  status: "loading",
  authorization: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.authorization = false;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.data = null;
      state.status = "loading";
      state.authorization = false;
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.authorization = action.payload.isError ? false : true;
    },
    [fetchAuth.rejected]: (state) => {
      state.data = null;
      state.status = "error";
      state.authorization = false;
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null;
      state.status = "loading";
      state.authorization = false;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.authorization = action.payload.isError ? false : true;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
      state.authorization = false;
    },
    [fetchRegister.pending]: (state) => {
      state.data = null;
      state.status = "loading";
      state.authorization = false;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
      state.authorization = action.payload.isError ? false : true;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = action.data;
      state.status = "error";
      state.authorization = false;
    },
  },
});

export const selectIsAuth = (state) => state.auth.authorization;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
