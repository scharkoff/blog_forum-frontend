// -- Imports
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";

// -- Запрос на получение статей по конкретному тегу
export const fetchPostsLikeTag = createAsyncThunk(
  "posts/fetchPostsLikeTags",
  async (name) => {
    try {
      const { data } = await axios.get("/posts");

      if (!name) return data;

      return data.filter((post) => post.tags?.includes(name)).reverse();
    } catch (error) {
      return { ...error.response?.data, isError: true };
    }
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
  "posts/fetchSortedPostsLikeTag",
  async ({ value, name }) => {
    try {
      const { data } = await axios.get("/posts");
      const tagName = name.name;

      if (value === 1) {
        return data
          .filter((post) => post.tags.includes(tagName).reverse())
      }

      return data.filter((post) => post.tags.includes(tagName)).reverse();
    } catch (error) {
      return { ...error.response?.data, isError: true };
    }
  }
);

// -- Запрос на  получение тегов
export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  try {
    const { data } = await axios.get("/tags");
    return data;
  } catch (error) {
    return { ...error.response?.data, isError: true };
  }
});
