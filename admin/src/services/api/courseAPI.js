import { DELETE, GET, POST, PUT } from "constants/services-constant";
import request from "services/axios-client/request";
import apiPath from "services/sevices.config";

export const getCoursesWithCategory = (
  category,
  params = { page: 1, page_size: 12 }
) => {
  return request(GET, apiPath.getCoursesWithCategory(category), { params });
};

export const getCourseDetail = (id) =>
  request(GET, apiPath.getCourseDetail(id));

export const getAllMyCourse = () => {
  return request(GET, apiPath.getAllMyCourse);
};

export const sendLessonComment = (moduleId, stepId, comment) => {
  return request(POST, apiPath.getLessonComment(moduleId, stepId), {
    body: { content: comment },
  });
};

export const sendCourseComment = (courseId, comment) => {
  return request(POST, apiPath.addCourseComment(courseId), {
    body: { content: comment },
  });
};

export const ratingCourse = (courseId, point) => {
  return request(POST, apiPath.ratingCourse(courseId), {
    body: { point },
  });
};

export const getCourseComments = (courseId) => {
  return request(GET, apiPath.getCourseComment(courseId));
};

export const getLessonComment = (moduleId, stepId) => {
  return request(GET, apiPath.getLessonComment(moduleId, stepId));
};

export const joinCourse = (id) => {
  return request(POST, apiPath.joinCourse(id));
};

export const getAllStudent = (id) => {
  return request(GET, apiPath.allStudent(id));
};

export const getNewStudent = (id) => {
  return request(GET, apiPath.newStudent(id));
};

export const getLearningProcess = (id) => {
  return request(GET, apiPath.getLearningProcess(id));
};

export const getStep = (module, step) => {
  return request(GET, apiPath.getStep(module, step), {}, {}, "get-step");
};

export const completeLesson = (module, step) => {
  return request(POST, apiPath.completeLesson(module, step));
};

export const createCourse = (body) => {
  return request(POST, apiPath.createCourse, { body });
};

export const removeModule = (courseId, moduleId) => {
  return request(DELETE, apiPath.getModule(courseId, moduleId));
};

export const createLesson = (moduleId, body) => {
  return request(POST, apiPath.createLesson(moduleId), { body });
};

export const deleteStep = (moduleId, stepId) => {
  return request(DELETE, apiPath.deleteLesson(moduleId, stepId));
};

export const updateStep = (moduleId, stepId, body) => {
  return request(PUT, apiPath.updateLesson(moduleId, stepId), { body });
};

export const editModule = (moduleId, body) => {
  return request(PUT, apiPath.updateModule(moduleId), { body });
};

export const updateCourse = (courseId, body) => {
  return request(PUT, apiPath.getCourse(courseId), { body });
};

export const createModule = (courseId, body) => {
  return request(POST, apiPath.createModule(courseId), { body });
};

export const getMyCreatedCourses = () => {
  return request(GET, apiPath.getMyCreatedCourses);
};

export const getCourse = (id) => {
  return request(GET, apiPath.getCourse(id));
};

export const getAllModules = (id) => {
  return request(GET, apiPath.allModules(id));
};
