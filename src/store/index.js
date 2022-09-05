import { configureStore } from "@reduxjs/toolkit";
import authSlices from "../redux/authSlices";
import postSlices from "../redux/postSlices";

export default configureStore({
  reducer: {
    auth: authSlices,
    post: postSlices,
  },
});
