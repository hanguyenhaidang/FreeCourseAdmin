import queryString from "query-string";
import { GET } from "../../constants/services-constant";
import axiosClient from "./client";
import { trackPromise } from "react-promise-tracker";

const request = (
  method = GET,
  url = "/",
  data = { params: {}, body: null, form: null },
  config = {},
  area = "general"
) => {
  const http = axiosClient({
    url,
    method,
    data: data.body || data.form,
    params: data.params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
    config,
  });
  return trackPromise(http, area);
};

export default request;
