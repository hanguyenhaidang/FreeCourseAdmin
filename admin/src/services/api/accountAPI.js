import { GET, POST, PUT } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getAccountInfor = (id) => request(GET, apiPath.getAccountInfor(id), {}, {}, "common");

export const getAllAccount = (params) => request(GET, apiPath.allAccount, { params });

export const editAccount = (id, body) => request(PUT, apiPath.editUserAccount(id), { body });
