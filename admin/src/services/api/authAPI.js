import { GET, POST, PUT } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const login = async (email, password) => {
  const body = { email, password };
  const data = await request(POST, apiPath.login, { body });
  return {
    user: data.user,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const getMyAccount = async (token) => {
  const data = await request(GET, apiPath.getMyAccount);
  return {
    user: data,
  };
};

export const register = async (body) => {
  return request(POST, apiPath.register, { body });
};

export const changePass = async (body) => {
  return request(PUT, apiPath.changePassword, { body });
};
