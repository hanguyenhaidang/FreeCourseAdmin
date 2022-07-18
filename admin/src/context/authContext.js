import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { getItem } from "utils/storeData";
import { LOCAL_STORAGE } from "constants/storage-constants";

// The Soft UI Dashboard PRO Material main context
const Auth = createContext(null);

// Setting custom name for the context which is visible on react dev tools
Auth.displayName = "AuthContext";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const RESET_AUTH_PENDING = "RESET_AUTH_PENDING";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";
export const AUTH_ERROR = "AUTH_ERROR";

const initialState = {
  user: null,
  isLogin: false,
  accessToken: getItem(LOCAL_STORAGE, "token"),
  accountType: null,
  refreshToken: getItem(LOCAL_STORAGE, "refreshToken"),
  error: null,
  loadingLogin: false,
  loadingRegister: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loadingLogin: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload.accessToken || state.accessToken,
        isLogin: true,
        user: payload?.user || state.user,
        refreshToken: payload.refreshToken || state.refreshToken,
        loadingLogin: false,
      };
    case LOGIN_ERROR:
      return {
        user: null,
        isLogin: false,
        accountType: null,
        refreshToken: null,
        loadingLogin: false,
        loadingRegister: false,
        error: payload,
      };
    case RESET_AUTH_PENDING:
      return {
        ...state,
        loadingLogin: false,
        loadingRegister: false,
      };
    case LOGOUT:
      return {
        user: null,
        isLogin: false,
        accountType: null,
        refreshToken: null,
        loadingLogin: false,
        loadingRegister: false,
        error: null,
      };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
}
// Typechecking props for the SoftUIControllerProvider
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Soft UI Dashboard React custom hook for using context
export function useAuthController() {
  const context = useContext(Auth);

  if (!context) {
    throw new Error("useAuthController should be used inside the AuthProvider.");
  }

  return context;
}
