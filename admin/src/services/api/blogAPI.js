import { GET, POST, PUT, DELETE } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getNewFeeds = async (time, page_size) => {
  return request(GET, apiPath.getNewFeeds(time, page_size));
};

export const postBlog = async (
  title,
  description,
  content,
  url,
  backgroundUrl
) => {
  const body = { title, description, content, url, backgroundUrl };
  const data = await request(POST, apiPath.postBlog, { body });
  return data;
};

export const getBlog = async (id) => {
  return request(GET, apiPath.getBlog(id));
};

export const updateBlog = async (
  id,
  title,
  description,
  content,
  url,
  backgroundUrl
) => {
  const body = { title, description, content, url, backgroundUrl };
  return request(PUT, apiPath.updateBlog(id), { body });
};

export const deleteBlog = async (id) => {
  return request(DELETE, apiPath.deleteBlog(id));
};

export const likeBlog = async (id) => {
  return request(POST, apiPath.likePost(id));
};

export const likeComment = async (postId, commentId) => {
  return request(POST, apiPath.likeComment(postId, commentId));
};

export const postComment = async (id, content, url) => {
  const body = { content, url };
  const data = await request(POST, apiPath.postComment(id), { body });
  return data;
};
