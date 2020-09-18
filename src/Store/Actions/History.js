import * as actionTypes from '../ActionTypes'
import axios from '../Services/BaseAPI'

// Functions
import { fetchingStatusBarOn, fetchingStatusBarOff } from '../../Functions/statusBarNetwork'

/* ===================================== Setup Action ===================================== */
export const setHistory = (topicId, answers) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setHistoryRequest())
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.post(`/histories/set-history`,
        { topicId, answers },
        { headers: {Authorization: `Bearer ${token}`} })
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        dispatch(setHistorySuccess())
      } else {
        dispatch(setHistoryFailure('Set history failure, please try again.'))
      }
    } catch (error) {
      dispatch(setHistoryFailure(error.message || error))
    }
  }
}

/* ===================================== Setup Reducer ===================================== */
export const setHistoryRequest = () => {
  return dispatch => {
    dispatch({type: actionTypes.SET_HISTORIES_REQUEST})
  }
}

export const setHistorySuccess = () => {
  return dispatch => {
    dispatch({type: actionTypes.SET_HISTORIES_SUCCESS})
  }
}

export const setHistoryFailure = () => {
  return dispatch => {
    dispatch({type: actionTypes.SET_HISTORIES_FAILURE})
  }
}
