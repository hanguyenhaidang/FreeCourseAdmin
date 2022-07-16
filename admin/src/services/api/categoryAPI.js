import { GET, POST } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getAllCategories = () => {
  return request(GET, apiPath.getCategories);
};

export const getAllTags = () => {
  return request(GET, apiPath.getAllTags);
};

export const getAllLevels = () => {
  return request(GET, apiPath.getAllLevels);
};
