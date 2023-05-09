import axios from 'configs/axios/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments, fetchLastsComments } from './comments';
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
    isLoading: true,
    isPostRemoved: false,
  },
  tags: {
    items: [],
    isLoading: true,
    activeTag: null,
  },
  comments: {
    items: [],
    isLoading: true,
    editMode: false,
  },
  lastComments: {
    items: [],
    isLoading: true,
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
      state.comments.isLoading = false;
    },

    resetIsPostRemoved: (state) => {
      state.posts.isPostRemoved = false;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.isLoading = true;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload?.posts;
      state.posts.postsCount = action.payload?.postsCount;
      state.posts.isLoading = false;
      state.posts.home = true;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.isLoading = false;
    },

    [fetchRemovePost.pending]: (state) => {
      state.posts.isLoading = true;
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg,
      );
      state.posts.isPostRemoved = true;
      state.posts.isLoading = false;
    },
    [fetchRemovePost.rejected]: (state) => {
      state.posts.isLoading = false;
    },

    [fetchTags.pending]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.isLoading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.isLoading = false;
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.isLoading = false;
    },

    [fetchComments.pending]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.isLoading = false;
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.isLoading = false;
    },

    [fetchLastsComments.pending]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.isLoading = true;
    },
    [fetchLastsComments.fulfilled]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.isLoading = false;
    },
    [fetchLastsComments.rejected]: (state, action) => {
      state.lastComments.isLoading = false;
    },
  },
});

export const postsReducer = postsSlice.reducer;
export const {
  setCommentEditMode,
  setActiveTag,
  setEditCommentValues,
  resetIsPostRemoved,
} = postsSlice.actions;
