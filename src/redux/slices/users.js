import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const { data } = await axios.get("/users");
  return data;
});


export const fetchEditUserData = createAsyncThunk(
  "users/fetchEditUserData",
  async (data) => {
    return data;
  }
);


export const fetchDeleteUser = createAsyncThunk(
  "users/fetchDeleteUser",
  async (id) => {
    const { data } = await axios.delete(`/users/delete/${id}`);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {

    [fetchEditUserData.pending]: (state, action) => {
      state.editbleUserData = action.payload;
      state.status = "loading";
    },
    [fetchEditUserData.rejected]: (state, action) => {
      state.editbleUserData = [];
      state.status = "error";
    },
    [fetchEditUserData.fulfilled]: (state, action) => {
      state.editbleUserData = action.payload;
      state.status = "loaded";
    },


    [fetchUsers.pending]: (state, action) => {
      state.data = action.payload;
      state.status = "loading";
    },
    [fetchUsers.rejected]: (state) => {
      state.data = [];
      state.status = "error";
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },


    [fetchDeleteUser.fulfilled]: (state, action) => {
      if (action.payload.success)
        state.data = state.data.filter((obj) => obj._id !== action.meta.arg);
    },
    [fetchDeleteUser.rejected]: (state) => {
      state.status = "error";
    },
  },
});

export const usersReducer = usersSlice.reducer;
