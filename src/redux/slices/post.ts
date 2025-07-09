import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "@/types/post";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../../lib/axios";

export interface postsState {
  posts: Array<Post>;
  loading: boolean;
  error: string | null;
}

const initialState: postsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk<
  Post[], 
  void,
  { rejectValue: string } 
>("post/fetchPosts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/posts`);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch posts"
    );
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Array<Post>>) => {
      state.posts = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Array<Post>>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setPosts, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
