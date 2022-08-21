import { configureStore } from "@reduxjs/toolkit";
import postSlices from "../redux/postSlices";

export default configureStore({
  reducer: {
    post: postSlices,
  },
});
