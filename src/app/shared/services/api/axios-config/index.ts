import axios from "axios";
import { Environment } from "../../../environment";
import { errorIterceptor, responseIterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
});

Api.interceptors.response.use(
  (response) => responseIterceptor(response),
  (error) => errorIterceptor(error)
);

export { Api };

