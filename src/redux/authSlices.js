import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "../apis/axios";
import decode from "jwt-decode";
// end of imports

const name = "auth";
const initialState = {
  user: {},
  me: {},
  notice: [],
  requestedUser: {
    userfetching: false,
    userFetched: false,
    user: {},
  },
  isLoggingIn: false,
  isLoggedIn: false,
  meRefresh: false,
};

// combination of normal actions and reducers
const reducers = {
  // 1) Action
  addUser: (state, action) => ({
    ...state,
    user: action.payload,
    isLoggedIn: true,
  }),
  // 2) Action
  cleanAuth: (state) => ({
    ...state,
    user: {},
    isLoggingIn: false,
    isLoggedIn: false,
  }),
  // 3) refresh
  refreshMe: (state) => ({
    ...state,
    meRefresh: !state?.meRefresh,
  }),
};

// asynchronous actions right here
const extraActions = {
  // 1) Login action
  login: createAsyncThunk(`${name}/login`, async (data) => {
    return await AxiosInstance.post("/auth/login", data);
  }),
  // 2) get single user
  getUser: createAsyncThunk(`${name}/getUser`, async (id) => {
    return await AxiosInstance.get(`/users/${id}`);
  }),
  // 2) get single user
  getMe: createAsyncThunk(`${name}/getMe`, async (id) => {
    return await AxiosInstance.get(`/users/${id}`);
  }),
  // 3) get notice for me
  getNotice: createAsyncThunk(`${name}/notice`, async () => {
    return await AxiosInstance.get("/notice");
  }),
};

// extracting states from actions
const { pending, fulfilled, rejected } = extraActions.login;
const {
  pending: gettingUser,
  fulfilled: gotUser,
  rejected: failedUser,
} = extraActions.getUser;
const {
  pending: gettingMe,
  fulfilled: gotMe,
  rejected: failedME,
} = extraActions.getMe;

const {
  pending: noticePending,
  fulfilled: noticeFulfilled,
  rejected: noticeRejected,
} = extraActions.getNotice;

// hooking up extra reducers
const extraReducers = {
  // auth reducer here -----------------------------------------------
  [pending]: (state) => ({ ...state, isLoggingIn: true }),
  [fulfilled]: (state, action) => {
    const token = action.payload?.data?.token?.split(" ")[1];
    localStorage.setItem("ks-user-token", token);

    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: true,
      user: decode(token)?.user,
    };
  },

  [rejected]: (state) => {
    toast.error("Invalid Credentials");
    return { ...state, isLoggingIn: false };
  },
  [gettingUser]: (state) => {
    return {
      ...state,
      requestedUser: {
        ...state.requestedUser,
        userfetching: true,
        userFetched: false,
      },
    };
  },

  // single user reducer here---------------------------------------
  [gotUser]: (state, action) => {
    return {
      ...state,
      requestedUser: {
        ...state.requestedUser,
        userfetching: false,
        userFetched: true,
        user: action?.payload?.data?.user,
      },
    };
  },
  [failedUser]: (state) => {
    toast.error("failed getting user");
    return {
      ...state,
      requestedUser: {
        ...state.requestedUser,
        userFetching: false,
        userFetched: false,
      },
    };
  },
  // -----------------------------------------

  [gotMe]: (state, action) => {
    return { ...state, me: action.payload.data?.user };
  },
  [noticeFulfilled]: (state, action) => {
    return { ...state, notice: action.payload.data?.notice };
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
  login,
  addUser,
  cleanAuth,
  getUser,
  getMe,
  refreshMe,
  getNotice,
} = {
  ...postSlice.actions,
  ...extraActions,
};

// reducer to be hooked in the store
export default postSlice.reducer;
