import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import AxiosInstance from "../apis/axios";
import decode from "jwt-decode";
// end of imports

const name = "auth";
const initialState = {
  user: {},
  isLoggingIn: false,
  isLoggedIn: false,
  requestedUser: {
    userfetching: false,
    userFetched: false,
    user: {},
  },
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
};

// extracting states from actions
const { pending, fulfilled, rejected } = extraActions.login;
const {
  pending: gettingUser,
  fulfilled: gotUser,
  rejected: failedUser,
} = extraActions.getUser;

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
    console.log("ap -->", action.payload?.data);
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
};

export const postSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

// exporting actions for dispatch
export const { login, addUser, cleanAuth, getUser } = {
  ...postSlice.actions,
  ...extraActions,
};

// reducer to be hooked in the store
export default postSlice.reducer;
