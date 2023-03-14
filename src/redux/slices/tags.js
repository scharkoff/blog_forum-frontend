import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";

export const fetchPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async (name) => {
    const { data } = await axios.get("/posts");

    if (!name) return data;

    return data.filter((post) => post.tags?.includes(name)).reverse();
  }
);


export const fetchSortedPostsLikeTag = createAsyncThunk(
  "posts/fetchSortedPostsLikeTag",
  async ({ value, tagName }) => {
    console.log(value, tagName)
    const { data } = await axios.get("/posts");
    const tag = tagName.name;

    if (value === 1) {
      return data
        .filter((post) => post.tags.includes(tag))
        .sort((a, b) => b.viewsCount - a.viewsCount);

    }

    return data.filter((post) => post.tags.includes(tag)).reverse();
  }
);


export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
