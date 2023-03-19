import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const { data } = await axios.get("/users"),
      users = data.details?.users;
    return users;
  } catch (error) {
    return { ...error.response.data, isError: true };
  }
});

export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (id) => {
    try {
      const { data } = await axios.delete(`/users/delete/${id}`);
      return data;
    } catch (error) {
      return { ...error.response.data, isError: true };
    }

  }
);

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
  data: [],
  status: "loading",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {

    [fetchUsers.fulfilled]: (state, action) => {
      if (!action.payload.isError) {
        state.data = action.payload;
        state.status = "loaded";
      }
    },

    [fetchDeleteUser.fulfilled]: (state, action) => {
      if (!action.payload.isError)
        state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
    },
  },
});

export const usersReducer = usersSlice.reducer;
