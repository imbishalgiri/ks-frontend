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
};

// extracting states from actions
const { pending, fulfilled, rejected } = extraActions.login;

// hooking up extra reducers
const extraReducers = {
  [pending]: (state) => ({ ...state, isLoggingIn: true }),
  [fulfilled]: (state, action) => {
    toast.success("Login is successful");
    const token = action.payload?.data?.token?.split(" ")[1];
    localStorage.setItem("ks-user-token", token);

    return {
      ...state,
      isLoggingIn: false,
      isLoggedIn: true,
      user: decode(token)?.user,
    };
  },
  [rejected]: (state, action) => {
    console.log(action.payload);
    toast.error("Invalid Credentials");
    return { ...state, isLoggingIn: false };
  },
};

export const postSlice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers,
});

// exporting actions for dispatch
export const { login, addUser, cleanAuth } = {
  ...postSlice.actions,
  ...extraActions,
};

// reducer to be hooked in the store
export default postSlice.reducer;
