import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "https://fridgieapi.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  },
  timeout: 10000,
  timeoutErrorMessage: "Server timed out"
});

export default axiosAPI