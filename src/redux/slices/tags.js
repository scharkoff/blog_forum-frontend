import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";

export const fetchPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async (name) => {
    const { data } = await axios.get("/posts"),
      posts = data.details?.posts;

    if (!name) return data;

    return posts.filter((post) => post.tags?.includes(name)).reverse();
  }
);


export const fetchSortedPostsLikeTag = createAsyncThunk(
  "posts/fetchSortedPostsLikeTag",
  async ({ value, tagName }) => {
    const { data } = await axios.get("/posts"),
      posts = data.details?.posts,
      tag = tagName.name;

    if (value === 1) {
      return posts
        .filter((post) => post.tags.includes(tag))
        .sort((a, b) => b.viewsCount - a.viewsCount);

    }

    return posts.filter((post) => post.tags.includes(tag)).reverse();
  }
);


export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data.details?.fiveTags;
});
