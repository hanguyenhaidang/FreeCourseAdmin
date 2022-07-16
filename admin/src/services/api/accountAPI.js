import { GET, POST } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getAccountInfor = (id) =>
  request(GET, apiPath.getAccountInfor(id));
