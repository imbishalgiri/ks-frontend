import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "../apis/axios";
// end of imports

const name = "post";

const initialState = {
  create: {
    loading: false,
    created: false,
  },
  get: {
    singlePost: {
      loading: false,
      data: [],
    },
    allPosts: {
      loading: false,
      data: [],
    },
  },
};

const reducers = {
  addCommentStatic: (state, action) => ({
    ...state,
    get: {
      ...state.get,
      singlePost: {
        ...state.get.singlePost,
        data: {
          ...state.get.singlePost?.data,
          comments: [...state.get.singlePost?.data?.comments, action.payload],
        },
      },
    },
  }),
  addReplyStatic: (state, action) => {
    const comments = state.get.singlePost?.data?.comments;
    const index = comments.findIndex(
      (singleComment) => singleComment?._id === action.payload?._id
    );
    const previousElement = comments?.slice(0, index);
    const afterElements = comments?.slice(index + 1);
    const currentElement = action.payload;
    const finalData = [...previousElement, currentElement, ...afterElements];
    state.get.singlePost.data.comments = finalData;
  },

  removePostStatic: (state, action) => {
    const filteredPost = state?.get?.allPosts?.data?.filter(
      (singleData) => singleData?._id !== action.payload
    );
    state.get.allPosts.data = filteredPost;
  },
  addPostStatic: (state, action) => {
    state.get.allPosts.data.push(...action.payload);
  },

  removeCommentStatic: (state, action) => {
    const comments = state?.get?.singlePost?.data?.comments?.filter(
      (el) => el?._id !== action.payload
    );
    state.get.singlePost.data.comments = comments;
  },
};
// asynchronous actions right here
const extraActions = {
  // 1) create single post
  addPost: createAsyncThunk(`${name}/addPost`, async (data) => {
    return await AxiosInstance.post("/posts/create", data);
  }),
  // 2) get single post
  getSinglePost: createAsyncThunk(`${name}/getSinglePost`, async (id) => {
    return await AxiosInstance.get(`/posts/${id}`);
  }),
  // 3) get all posts
  getAllPosts: createAsyncThunk(`${name}/getAllPosts`, async (data) => {
    return await AxiosInstance.get("/posts", { params: data });
  }),
};

// extracting states from actions
const { pending, fulfilled, rejected } = extraActions.addPost;
const {
  pending: spPending,
  fulfilled: spFulfilled,
  rejected: spRejected,
} = extraActions.getSinglePost;

const {
  pending: apPending,
  fulfilled: apFulfilled,
  rejected: apRejected,
} = extraActions.getAllPosts;

// hooking up extra reducers
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
  //--------------------------------------------------
  // for single post
  [spPending]: (state) => ({
    ...state,
    get: {
      ...state.get,
      singlePost: { ...state.get.singlePost, loading: true },
    },
  }),
  [spFulfilled]: (state, action) => ({
    ...state,
    get: {
      ...state.get,
      singlePost: {
        ...state.get.singlePost,
        loading: false,
        data: action.payload?.data?.data,
      },
    },
  }),
  [spRejected]: (state, action) => {
    toast.error(action?.error?.message);
    return {
      ...state,
      get: {
        ...state.get,
        singlePost: { ...state.get.singlePost, loading: false },
      },
    };
  },
  // -----------------------------------------------------------
  // for all posts
  [apPending]: (state) => ({
    ...state,
    get: {
      ...state.get,
      allPosts: {
        ...state.get.allPosts,
        loading: true,
      },
    },
  }),
  [apFulfilled]: (state, action) => ({
    ...state,
    get: {
      ...state.get,
      allPosts: {
        ...state.get.allPosts,
        loading: false,
        data: action.payload?.data?.data,
      },
    },
  }),
  [apRejected]: (state, action) => {
    toast.error(action?.error?.message);
    return {
      ...state,
      get: state.get,
      allPosts: {
        ...state.get.allPosts,
        loading: false,
      },
    };
  },
};

export const postSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

// exporting actions for dispatch
export const {
  addPost,
  getSinglePost,
  getAllPosts,
  addCommentStatic,
  addReplyStatic,
  removePostStatic,
  removeCommentStatic,
  addPostStatic,
} = {
  ...postSlice.actions,
  ...extraActions,
};

// reducer to be hooked in the store
export default postSlice.reducer;
