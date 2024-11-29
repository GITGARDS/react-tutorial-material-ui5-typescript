import axios from "axios";
import { errorIterceptor, responseIterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: "http://localhost:3001",
});

Api.interceptors.response.use(
  (response) => responseIterceptor(response),
  (error) => errorIterceptor(error)
);

export { Api };

