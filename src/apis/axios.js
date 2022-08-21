import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://ks-api.vercel.app/api/v1",
  timeout: 10000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default AxiosInstance;
