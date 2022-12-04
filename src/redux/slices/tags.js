// -- Imports
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

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

// -- Запрос на  получение тегов
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});
