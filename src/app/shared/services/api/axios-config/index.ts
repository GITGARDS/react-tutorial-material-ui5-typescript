import axios from "axios";
import { Environment } from "../../../environment";
import { errorIterceptor, responseIterceptor } from "./interceptors";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  // headers: {
  //   Authorization: `Bearer ${JSON.parse(
  //     localStorage.getItem("APP_ACCESS_TOKEN") || ""
  //   )}`,
  // },
});

Api.interceptors.response.use(
  (response) => responseIterceptor(response),
  (error) => errorIterceptor(error)
);

export { Api };

