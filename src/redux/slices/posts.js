import axios from 'configs/axios/axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments, fetchLastsComments } from './comments';
import { fetchTags } from './tags';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (
    {
      pageOptions = [1, 5],
      activeTabs = { activeId: 0, activeType: 'new' },
      tagName = null,
      searchText = null,
    } = {},
    thunkAPI,
  ) => {
    try {
      const { data } = await axios.get(
        `/posts?tag=${tagName}&page=${pageOptions[0]}&pageSize=${pageOptions[1]}&sortType=${activeTabs.activeType}&searchText=${searchText}`,
      );

      return { posts: data.posts, postsCount: data.postsCount };
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

export const fetchRemovePost = createAsyncThunk(
  'posts/fetchRemovePost',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      return data;
    } catch (error) {
      return error.response.data
        ? thunkAPI.rejectWithValue(error.response.data)
        : thunkAPI.rejectWithValue(null);
    }
  },
);

const initialState = {
  posts: {
    items: [],
    isLoading: false,
    isPostRemoved: false,
    error: null,
  },
  tags: {
    items: [],
    isLoading: false,
    activeTag: null,
    error: null,
  },
  comments: {
    items: [],
    isLoading: false,
    editMode: false,
    error: null,
  },
  lastComments: {
    items: [],
    isLoading: false,
    error: null,
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
      state.posts.error = null;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.isLoading = false;
      state.posts.error = action.payload;
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
      state.posts.error = null;
    },
    [fetchRemovePost.rejected]: (state, action) => {
      state.posts.isLoading = false;
      state.posts.error = action.payload;
    },

    [fetchTags.pending]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.isLoading = true;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.isLoading = false;
      state.tags.error = null;
    },
    [fetchTags.rejected]: (state, action) => {
      state.tags.isLoading = false;
      state.tags.error = action.payload;
    },

    [fetchComments.pending]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.isLoading = true;
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.isLoading = false;
      state.comments.error = null;
    },
    [fetchComments.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },

    [fetchLastsComments.pending]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.isLoading = true;
    },
    [fetchLastsComments.fulfilled]: (state, action) => {
      state.lastComments.items = action.payload;
      state.lastComments.isLoading = false;
      state.lastComments.error = null;
    },
    [fetchLastsComments.rejected]: (state, action) => {
      state.lastComments.isLoading = false;
      state.lastComments.error = action.payload;
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
