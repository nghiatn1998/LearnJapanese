import * as actionTypes from '../ActionTypes'

/* ===================================== Setup Reducer ===================================== */
export const set = (courses) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_DIRECTORIES, courses})
  }
}

export const addDirectory = (course) => {
  return dispatch => {
    dispatch({type: actionTypes.ADD_DIRECTORY, course})
  }
}