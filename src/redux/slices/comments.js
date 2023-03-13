// -- Imports
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";

// -- Запрос на получение всех комментариев
export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    try {
      const { data } = await axios.get("/posts/comments");
      return data;
    } catch (error) {
      return { ...error.response?.data, isError: true };

    }
  }
);

// -- Запрос на получение 5 отсортированных комментариев
export const fetchSortedComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    try {
      const { data } = await axios.get("/posts/comments");
      return data.reverse()
        .slice(0, 5)
        .map((item) => {
          return {
            user: {
              fullName: item.user?.fullName,
              avatarUrl: item.user?.avatarUrl,
              rank: item.user?.rank,
            },
            text: item.text,
            commentId: item._id,
          };
        });
    } catch (error) {
      return { ...error.response?.data, isError: true };
    }
  }
);

// -- Запрос на удаление комментария по его индентификатору
export const fetchRemoveComment = createAsyncThunk(
  "posts/fetchRemoveComment",
  async (data) => {
    try {
      const fields = {
        commentId: data.commentId,
        postId: data.id.id,
      };
      axios.post(`/posts/${data.id}/removeComment`, fields);
    } catch (error) {
      return { ...error.response?.data, isError: true };
    }
  }
);

// -- Запрос на изменение комментария по его индентификатору
export const fetchEditComment = createAsyncThunk(
  "posts/fetchEditComment",
  async (res) => {
    const comment = {
      commentId: res.commentId,
      postId: res.id?.id,
      text: res.text,
    };

    return comment;
  }
);

// -- Запрос на сброс режима редактирования комментария
export const fetchCancelEditMode = createAsyncThunk(
  "posts/fetchCancelEditMode",
  async () => { }
);
