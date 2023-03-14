import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";


import {
  fetchComments,
  fetchRemoveComment,
} from "./comments";


import {
  fetchPostsLikeTag,
  fetchSortedPostsLikeTag,
  fetchTags,
} from "./tags";


export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data.reverse();
});


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

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  }
);


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
  reducers: {
    closeCommentEditMode: (state) => {
      state.comments.editMode = false;
    },

    setActiveTag: (state, action) => {
      state.tags.activeTag = action.payload;
    },

    setEditCommentValues: (state, action) => {
      state.comments.editbleComment = {
        commentId: action.payload.commentId,
        postId: action.payload.id?.id,
        text: action.payload.text,
      };
      state.comments.editMode = true;
      state.comments.status = "loaded";
    },

  },
  extraReducers: {

    [fetchPosts.pending]: (state, action) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      state.posts.home = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.status = "error";
    },

    [fetchSortedPosts.pending]: (state, action) => {
      state.posts.status = "loading";
    },
    [fetchSortedPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchSortedPosts.rejected]: (state, action) => {
      state.posts.status = "error";
    },

    [fetchPostsLikeTag.pending]: (state, action) => {
      state.posts.status = "loading";
    },
    [fetchPostsLikeTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      state.posts.home = false;
    },
    [fetchPostsLikeTag.rejected]: (state, action) => {
      state.posts.status = "error";
    },

    [fetchSortedPostsLikeTag.pending]: (state, action) => {
      state.posts.status = "loading";
    },
    [fetchSortedPostsLikeTag.fulfilled]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded";
      state.posts.home = false;
    },
    [fetchSortedPostsLikeTag.rejected]: (state, action) => {
      state.posts.status = "error";
    },

    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
      state.posts.status = "removed";
    },
    [fetchRemovePost.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = "error";
    },

    [fetchTags.pending]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.status = "error";
    },

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
      state.comments.status = "error";
      state.comments.editMode = false;
    },

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
  },
});

export const postsReducer = postsSlice.reducer;
export const { closeCommentEditMode, setActiveTag, setEditCommentValues } = postsSlice.actions;
