import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { getItem } from "utils/storeData";
import { LOCAL_STORAGE } from "constants/storage-constants";

// The Soft UI Dashboard PRO Material main context
const MessageContext = createContext(null);

// Setting custom name for the context which is visible on react dev tools
MessageContext.displayName = "MessageContext";

export const SET_MESSAGE = "SET_MESSAGE";
export const SHOW_MESSAGE = "SHOW_MESSAGE";
export const RESET_MESSAGE = "RESET_MESSAGE";
export const RESET_ERROR = "RESET_ERROR";
const initialState = {
  message: null,
  show: false,
  reset: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_ERROR:
      return {
        ...state,
        error: null,
      };
    case SET_MESSAGE:
      return {
        message: payload.message,
        show: false,
        reset: false,
      };
    case SHOW_MESSAGE:
      return {
        ...state,
        show: true,
        reset: false,
      };
    case RESET_MESSAGE:
      return {
        message: null,
        show: false,
        reset: true,
      };
    default:
      return state;
  }
};

export function MessageProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MessageContext.Provider value={value}>{children}</MessageContext.Provider>;
}
// Typechecking props for the SoftUIControllerProvider
MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Soft UI Dashboard React custom hook for using context
export function useMessageController() {
  const context = useContext(MessageContext);

  if (!context) {
    throw new Error("useMessageController should be used inside the MessageProvider.");
  }

  return context;
}
