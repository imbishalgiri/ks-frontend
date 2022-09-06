import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "../apis/axios";

const name = "comment";
const reducers = { name: () => ({}) };

const initialState = {
  isCommenting: false,
  isCommented: false,
  isReplying: false,
  isReplied: false,
};

const extraActions = {
  // 1) comment to the post
  addComment: createAsyncThunk(`${name}/addComment`, async (data) => {
    return await AxiosInstance.post("/comments/create", data);
  }),

  addReply: createAsyncThunk(`${name}/addReply`, async (data) => {
    return await AxiosInstance.put("/comments/reply/create", data);
  }),
};

const {
  pending: commenting,
  fulfilled: commented,
  rejected: commentFailed,
} = extraActions.addComment;

const {
  pending: replying,
  fulfilled: replied,
  rejected: replyFailed,
} = extraActions.addReply;

const extraReducers = {
  [commenting]: (state) => ({
    ...state,
    isCommenting: true,
    isCommented: false,
  }),
  [commented]: (state, action) => {
    toast.success("successfully commented");
    console.log("response", action.payload, action);
    return {
      ...state,
      isCommenting: false,
      isCommented: action?.payload?.data?.comment,
    };
  },
  [commentFailed]: (state) => {
    toast.error("could not add comment");
    return { ...state, isCommenting: false, isCommented: false };
  },
  [replying]: (state) => ({
    ...state,
    isReplying: true,
    isReplied: false,
  }),
  [replied]: (state, action) => {
    return {
      ...state,
      isReplying: false,
      isReplied: action?.payload?.data?.comment,
    };
  },
  [replyFailed]: (state) => {
    toast.error("could not add reply");
    return { ...state, isReplying: false, isReplied: false };
  },
};

export const commentSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

export const { addComment, addReply } = {
  ...commentSlice.actions,
  ...extraActions,
};
export default commentSlice.reducer;
