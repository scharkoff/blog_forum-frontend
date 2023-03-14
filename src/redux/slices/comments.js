import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "configs/axios/axios";


export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/posts/comments");
    return data;
  }
);


export const fetchSortedComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
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
  }
);


export const fetchRemoveComment = createAsyncThunk(
  "posts/fetchRemoveComment",
  async (data) => {
    const fields = {
      commentId: data.commentId,
      postId: data.id.id,
    };
    axios.post(`/posts/${data.id}/removeComment`, fields);
  }
);

