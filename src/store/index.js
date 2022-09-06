import { configureStore } from "@reduxjs/toolkit";
import authSlices from "../redux/authSlices";
import commentSlice from "../redux/commentSlices";
import postSlices from "../redux/postSlices";

export default configureStore({
  reducer: {
    auth: authSlices,
    post: postSlices,
    comment: commentSlice,
  },
});
