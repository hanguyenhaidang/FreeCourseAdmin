import queryString from "query-string";
import { GET } from "../../constants/services-constant";
import axiosClient from "./client";

const request = (
  method = GET,
  url = "/",
  data = { params: {}, body: null, form: null },
  config = {}
) => {
  return axiosClient({
    url,
    method,
    data: data.body || data.form,
    params: data.params,
    paramsSerializer: (params) => {
      return queryString.stringify(params);
    },
    config,
  });
};

export default request;
