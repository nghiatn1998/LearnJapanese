import {Alert} from 'react-native'
import * as actionTypes from '../ActionTypes'
import axios from '../Services/BaseAPI'
import {fetchingStatusBarOff, fetchingStatusBarOn} from '../../Functions/statusBarNetwork'

// const errorCreateCourseString = 'Invalid input, please check correct input!'
/* ===================================== Setup Action ===================================== */
export const createCourse = (title, content) => {
  return async (dispatch, getState) => {
    dispatch(setCreateCourseRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token ? getState().authenticate.userInformation.token : getState().authenticate.token
      const response = await axios.post('/courses',
        {
          title: title,
          content: content
        },
        {
          headers: {Authorization: `Bearer ${token}`}
        })
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        dispatch(setCreateCourseSuccess(response.data))
      } else if (response.status === 422) {
        dispatch(setCreateCourseFailure('Invalid input, please check input again!'))
      } else if (response.status === 401) {
        dispatch(setCreateCourseFailure('Un-Authorization token, please try again!'))
      } else if (response.status === 400) {
        dispatch(setCreateCourseFailure('Course can\'t created, please try later!'))
      }
    } catch (error) {
      dispatch(setCreateCourseFailure(error.message || error))
    }
  }
}

export const getCourseDetail = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/courses/${id}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      if (response && response.status === 200) {
        dispatch(setCourseDetail(response.data))
      } else {
        return new Error('Check networking')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const getCoursesLatest = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get('/users/get-courses-latest',
        {headers: {Authorization: `Bearer ${token}`}}
      )
      if (response && response.status === 200) {
        dispatch(setCourses(response.data.courses))
      } else {
        return new Error('Something went wrong. Please try again.')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const getCourseLearned = (id) => {
  return async (dispatch, getState) => {
    dispatch(setCourseLearnedRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/courses/${id}/learn`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        dispatch(setCourseLearnedSuccess(response.data))
      } else {
        dispatch(setCourseLearnedFailure('Not get coursed. Please check again.'))
      }
    } catch (error) {
      dispatch(setCourseLearnedFailure(error.message || error))
    }
  }
}

export const deleteCourse = (id) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.delete(`/courses/${id}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      if (response && response.status === 200) {
        dispatch(getCoursesLatest())
      } else {
        return new Error('Check networking')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

/* ===================================== Setup Reducer ===================================== */
export const setCourseDetail = (courseSelected) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_COURSE_DETAIL, courseSelected})
  }
}

export const setCourses = (courses) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_COURSES, courses})
  }
}

export const setCourseLearnedRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_COURSE_LEARNED_REQUEST })
  }
}
export const setCourseLearnedSuccess = (courseLearned) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_COURSE_LEARNED_SUCCESS, courseLearned })
  }
}
export const setCourseLearnedFailure = (errorFetchingCourseLearned) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_COURSE_LEARNED_FAILURE, errorFetchingCourseLearned })
  }
}

export const setCreateCourseRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_CREATE_COURSE_REQUEST })
  }
}
export const setCreateCourseSuccess = (course) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_CREATE_COURSE_SUCCESS, course })
  }
}
export const setCreateCourseFailure = (errorFetchingCreateCourse) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_CREATE_COURSE_FAILURE, errorFetchingCreateCourse })
  }
}


