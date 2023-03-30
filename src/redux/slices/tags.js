import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";

export const fetchPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async (name) => {
    const { data } = await axios.get("/posts");

    if (!name) return data;

    return data.posts?.filter((post) => post.tags?.includes(name)).reverse();
  }
);


export const fetchSortedPostsLikeTag = createAsyncThunk(
  "posts/fetchSortedPostsLikeTag",
  async ({ value, tagName }) => {
    const { data } = await axios.get("/posts"),
      tag = tagName.name;

    if (value === 1) {
      return data.posts?.filter((post) => post.tags.includes(tag))
        .sort((a, b) => b.viewsCount - a.viewsCount);

    }

    return data.posts?.filter((post) => post.tags.includes(tag)).reverse();
  }
);


export const fetchTags = createAsyncThunk("posts/fetchLastsTags", async () => {
  const { data } = await axios.get("/tags/lasts");
  return data.lastTags;
});
