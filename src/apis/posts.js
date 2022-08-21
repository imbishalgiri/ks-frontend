import AxiosInstance from "./axios";

// endpoint to create post to the server
export const addToPostApi = (data) => {
  return AxiosInstance.post("/posts/create", data);
};
