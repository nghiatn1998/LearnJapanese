import * as actionTypes from "../ActionTypes";

const initialState = {
  courses: [],
  courseSelected: null,

  fetchingCreateCourse: false,
  fetchingCreateCourseSuccess: false,
  errorFetchingCreateCourse: null,

  fetchingCourseLearned: false,
  courseLearned: null,
  errorFetchingCourseLearned: null,
}; 

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COURSES:
      return {
        ...state,
        courses: action.courses
      }
    case actionTypes.SET_COURSE_DETAIL:
      return {
        ...state,
        courseSelected: action.courseSelected
      }

    case actionTypes.SET_CREATE_COURSE_REQUEST:
      return {
        ...state,
        fetchingCreateCourse: true,
        fetchingCreateCourseSuccess: false,
        errorFetchingCreateCourse: null
      }
    case actionTypes.SET_CREATE_COURSE_SUCCESS:
      return {
        ...state,
        fetchingCreateCourse: false,
        fetchingCreateCourseSuccess: true,
        courses: [...state.courses, action.course],
      }
    case actionTypes.SET_CREATE_COURSE_FAILURE:
      return {
        ...state,
        fetchingCreateCourse: false,
        errorFetchingCreateCourse: action.errorFetchingCreateCourse
      }

    case actionTypes.SET_COURSE_LEARNED_REQUEST:
      return {
        ...state,
        fetchingCourseLearned: true,
        courseLearned: null,
        errorFetchingCourseLearned: null
      }
    case actionTypes.SET_COURSE_LEARNED_SUCCESS:
      return {
        ...state,
        fetchingCourseLearned: false,
        courseLearned: action.courseLearned,
      }
    case actionTypes.SET_COURSE_LEARNED_FAILURE:
      return {
        ...state,
        fetchingCourseLearned: false,
        errorFetchingCourseLearned: action.errorFetchingCourseLearned
      }
    default:
      return state;
  }
};
