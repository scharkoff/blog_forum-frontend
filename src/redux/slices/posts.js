import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'configs/axios/axios';

import {
  fetchComments,
  fetchLastsComments,
  fetchRemoveComment,
} from './comments';

import { fetchTags } from './tags';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({
    pageOptions = [1, 5],
    activeTabs = { activeId: 0, activeType: 'new' },
    tagName = null,
    searchText = null,
  } = {}) => {
    const { data } = await axios.get(
      `/posts?tag=${tagName}&page=${pageOptions[0]}&pageSize=${pageOptions[1]}&sortType=${activeTabs.activeType}&searchText=${searchText}`,
    );

    return { posts: data.posts, postsCount: data.postsCount };
  },
);

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id) => {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  },
);

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
    activeTag: null,
  },
  comments: {
    items: [],
    status: 'loading',
    editMode: false,
  },
  lastComments: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setCommentEditMode: (state) => {
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
      state.comments.status = 'loaded';
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload?.posts;
      state.posts.postsCount = action.payload?.postsCount;
      state.posts.status = 'loaded';
      state.posts.home = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.status = 'error';
    },

    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg,
      );
      state.posts.status = 'removed';
    },
    [fetchRemovePost.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.status = 'error';
    },

    [fetchTags.pending]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.status = 'error';
    },

    [fetchComments.pending]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.status = 'error';
    },

    [fetchLastsComments.pending]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.status = 'loading';
    },
    [fetchLastsComments.fulfilled]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.status = 'loaded';
    },
    [fetchLastsComments.rejected]: (state, action) => {
      state.lastComments.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
export const { setCommentEditMode, setActiveTag, setEditCommentValues } =
  postsSlice.actions;
