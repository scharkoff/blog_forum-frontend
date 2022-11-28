// -- Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import {
  fetchComments,
  fetchRemoveComment,
  fetchEditComment,
  fetchCancelEditMode,
} from "./comments";

// -- Запрос на получение всех статей
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data.reverse();
});

// -- Запрос на получение отсортированных статей
export const fetchSortedPosts = createAsyncThunk(
  "posts/fetchSortedPosts",
  async (value) => {
    const { data } = await axios.get("/posts");

    if (value === 1) {
      return data.sort((a, b) => b.viewsCount - a.viewsCount);
    }

    return data.reverse();
  }
);

// -- Запрос на получение статей по конкретному тегу
export const fetchPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async (name) => {
    const { data } = await axios.get("/posts");

    if (!name) return data;

    return data.filter((post) => post.tags.includes(name)).reverse();
  }
);

// -- Запрос на получение статей по конкретному тегу
export const fetchActiveTag = createAsyncThunk(
  "posts/fetchActiveTag",
  async (name) => {
    return name;
  }
);

// -- Запрос на получение отсортированных статей по конкретному тегу
export const fetchSortedPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async ({ value, name }) => {
    const { data } = await axios.get("/posts");

    if (value === 1) {
      return data
        .filter((post) => post.tags.includes(name))
        .sort((a, b) => b.viewsCount - a.viewsCount);
    }

    return data.filter((post) => post.tags.includes(name)).reverse();
  }
);

// -- Запрос на удаление статьи по ее индентификатору
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);

// -- Запрос на  получение тегов
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

// -- Конфиг для стейта
const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // -- Получение статей
    [fetchPosts.pending]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      state.posts.home = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // -- Получение отсортированных статей
    [fetchSortedPosts.pending]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loading";
    },
    [fetchSortedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchSortedPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // -- Получение статей по тегу
    [fetchPostsLikeTag.pending]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loading";
    },
    [fetchPostsLikeTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      state.posts.home = false;
    },
    [fetchPostsLikeTag.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // -- Получение отсортированных статей по тегу
    [fetchSortedPostsLikeTag.pending]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loading";
    },
    [fetchSortedPostsLikeTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      state.posts.home = false;
    },
    [fetchSortedPostsLikeTag.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // -- Получение тегов
    [fetchTags.pending]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // -- Установить активный тег
    [fetchActiveTag.fulfilled]: (state, action) => {
      state.tags.activeTag = action.payload;
    },
    // -- Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = "error";
    },
    // -- Получение комментариев
    [fetchComments.pending]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loading";
      state.comments.editMode = false;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
      state.comments.editMode = false;
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.items = [];
      state.comments.status = "error";
      state.comments.editMode = false;
    },
    // -- Удаление комментария
    [fetchRemoveComment.pending]: (state, action) => {
      state.comments.items = state.comments.items.filter(
        (obj) => obj._id !== action.meta.arg.commentId
      );
      state.posts.status = "loading";
      state.comments.editMode = false;
    },
    [fetchRemoveComment.rejected]: (state) => {
      state.comments.status = "error";
      state.comments.editMode = false;
    },

    // -- Изменение комментария
    [fetchEditComment.fulfilled]: (state, action) => {
      state.comments.editbleComment = action.payload;
      state.comments.editMode = true;
      state.comments.status = "loaded";
    },
    [fetchEditComment.rejected]: (state, action) => {
      state.comments.status = "error";
    },

    // -- Выключение режима редактирования
    [fetchCancelEditMode.fulfilled]: (state, action) => {
      state.comments.editMode = false;
    },
    [fetchCancelEditMode.rejected]: (state, action) => {
      state.comments.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
