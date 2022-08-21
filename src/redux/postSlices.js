import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "../apis/axios";
import { addToPostApi } from "../apis/posts";
const name = "post";
const reducers = { name: () => ({}) };
const initialState = {
  create: {
    loading: false,
    created: false,
  },
};
// this one is for async requests
const extraActions = {
  addPost: createAsyncThunk(`${name}/addPost`, async (data) => {
    return await AxiosInstance.post("/posts/create", data);
  }),
};
const { pending, fulfilled, rejected } = extraActions.addPost;
const extraReducers = {
  [pending]: (state) => ({ ...state, create: { loading: true } }),
  [fulfilled]: (state) => {
    toast.success("Successfully created post");
    return {
      ...state,
      create: { loading: false, created: true },
    };
  },
  [rejected]: (state, action) => {
    toast.error(action.error?.message);
    return { ...state, create: { loading: false } };
  },
};

export const postSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

// this is for dispatch
export const { addPost } = { ...postSlice.actions, ...extraActions };

// this is for configureStore
export default postSlice.reducer;
