import * as actionTypes from '../ActionTypes'
import axios from '../Services/BaseAPI'

/* ===================================== Setup Action ===================================== */

/* ===================================== Setup Reducer ===================================== */
export const setDirectories = (courses) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_DIRECTORIES, courses})
  }
}

export const addDirectory = (course) => {
  return dispatch => {
    dispatch({type: actionTypes.ADD_DIRECTORY, course})
  }
}


