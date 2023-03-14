import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";


export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);
  return data;
});


export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);


export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});


export const fetchUpdateUserLogin = createAsyncThunk(
  "auth/updateUserLogin",
  async (params) => {
    const { data } = await axios.patch("/auth/updateUserLogin", params);
    return data;
  }
);


export const fetchUpdateUserRank = createAsyncThunk(
  "auth/fetchUpdateUserRank",
  async (params) => {
    const { data } = await axios.patch("/auth/updateUserRank", params);
    return data;
  }
);


export const fetchUpdateUserEmail = createAsyncThunk(
  "auth/updateUserEmail",
  async (params) => {
    const { data } = await axios.patch("/auth/updateUserEmail", params);
    return data;
  }
);


export const fetchUpdateUserPassword = createAsyncThunk(
  "auth/updateUserPassword",
  async (params) => {
    const { data } = await axios.patch("/auth/updateUserPassword", params);
    return data;
  }
);


export const fetchUpdateUserAvatar = createAsyncThunk(
  "auth/updateUserAvatar",
  async (params) => {
    const { data } = await axios.patch("/auth/updateUserAvatar", params);
    return data;
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
      state.authorization = action.payload?.isError ? false : true;
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
      state.authorization = action.payload?.isError ? false : true;
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
      state.authorization = action.payload?.isError ? false : true;
    },
    [fetchRegister.rejected]: (state, action) => {
      state.data = action.data;
      state.status = "error";
      state.authorization = false;
    },
  },
});

export const selectIsAuth = (state) => state.auth?.authorization;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
