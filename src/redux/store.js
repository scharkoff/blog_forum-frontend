import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { usersReducer } from "./slices/users";
import { utilsReducer } from "./slices/utils";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    users: usersReducer,
    utils: utilsReducer,
  },
});

export default store;
