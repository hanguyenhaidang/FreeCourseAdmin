import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The Soft UI Dashboard PRO Material main context
const Course = createContext(null);

// Setting custom name for the context which is visible on react dev tools
Course.displayName = "CourseContext";

export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_TAGS_SUCCESS = "GET_TAGS_SUCCESS";
export const GET_LEVELS_SUCCESS = "GET_LEVELS_SUCCESS";
export const GET_TEACHER_INFOR_SUCCESS = "GET_TEACHER_INFOR_SUCCESS";
export const GET_COURSE_DETAIL_SUCCESS = "GET_COURSE_DETAIL_SUCCESS";
export const GET_COURSE_DETAIL_REQUEST = "GET_COURSE_DETAIL_REQUEST";
export const COURSE_ERROR = "COURSE_ERROR";
export const GET_ALL_MODULES_SUCCESS = "GET_ALL_MODULES_SUCCESS";

const initialState = {
  teacher: null,
  courseDetail: null,
  categories: [],
  tags: [],
  levels: [],
  error: null,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COURSE_DETAIL_REQUEST:
      return {
        teacher: null,
        courseDetail: null,
        categories: [],
        tags: [],
        levels: [],
        modules: [],
        error: null,
      };
    case GET_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: payload,
      };
    case GET_ALL_MODULES_SUCCESS:
      return {
        ...state,
        modules: payload,
      };
    case COURSE_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_TEACHER_INFOR_SUCCESS:
      return {
        ...state,
        teacher: payload,
      };
    case GET_LEVELS_SUCCESS:
      return {
        ...state,
        levels: payload.levels,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload.categories,
      };

    case GET_TAGS_SUCCESS:
      return {
        ...state,
        tags: payload.tags,
      };
    default:
      return state;
  }
};

export function CourseProvider({ children }) {
  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <Course.Provider value={value}>{children}</Course.Provider>;
}

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCourseController() {
  const context = useContext(Course);

  if (!context) {
    throw new Error("useCourseController should be used inside the CourseProvider.");
  }

  return context;
}
