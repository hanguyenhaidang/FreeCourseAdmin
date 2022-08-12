import { GET, POST, PUT, DELETE } from "constants/services-constant";
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

export const addCategory = (body) => {
  return request(POST, apiPath.addCategory, { body });
};

export const addTag = (body) => {
  return request(POST, apiPath.addTag, { body });
};

export const editCategory = (id, body) => {
  return request(PUT, apiPath.editCategory(id), { body });
};

export const editTag = (id, body) => {
  return request(PUT, apiPath.editTag(id), { body });
};

export const deleteCategory = (id) => {
  return request(DELETE, apiPath.deleteCategory(id));
};

export const deleteTag = (id) => {
  return request(DELETE, apiPath.deleteTag(id));
};
