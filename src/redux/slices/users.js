import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";

// -- Получить всех пользователей
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const { data } = await axios.get("/users");
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

// -- Получить данные редактируемого пользователя
export const fetchEditUserData = createAsyncThunk(
  "users/fetchEditUserData",
  async (data) => {
    console.log(data);
    return data;
  }
);

// -- Удаление пользователя
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

const initialState = {
  data: null,
  status: "loading",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    // -- Получение данных редактируемого пользователя
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

    // -- Получить данные всех пользователей
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

    // -- Удаление пользователя
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
