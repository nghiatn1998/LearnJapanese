import * as actionTypes from '../ActionTypes'
import axios from '../Services/BaseAPI'

// Functions
import { fetchingStatusBarOff, fetchingStatusBarOn } from '../../Functions/statusBarNetwork'

/* ===================================== Setup Action ===================================== */
export const getTopics = () => {
  return async (dispatch, getState) => {
    dispatch(setTopicsRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/topics`, {headers: {Authorization: `Bearer ${token}`}})
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        dispatch(setTopicsSuccess(response.data))
      } else {
        dispatch(setTopicsFailure('Get topics failure, please try again.'))
      }
    } catch (error) {
      dispatch(setTopicsFailure(error.message || error))
    }
  }
}
export const getTopicDetail = (id) => {
  return async (dispatch, getState) => {
    dispatch(setTopicDetailRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/topics/${id}`,{headers: {Authorization: `Bearer ${token}`}})
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        dispatch(setTopicDetailSuccess(response.data))
      } else {
        dispatch(setTopicDetailFailure('Get topic detail failure, please try again.'))
      }
    } catch (error) {
      dispatch(setTopicDetailFailure(error.message || error))
    }
  }
}
export const getTopicLearned = (id) => {
  return async (dispatch, getState) => {
    dispatch(setTopicLearnedRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/topics/${id}/learn`,{headers: {Authorization: `Bearer ${token}`}})
      fetchingStatusBarOff()
      if (response && response.status === 200) {
         dispatch(setTopicLearnedSuccess(response.data))
      } else {
        dispatch(setTopicLearnedFailure('Get topic learned failure, please try again.'))
      }
    } catch (error) {
      dispatch(setTopicLearnedFailure(error.message || error))
    }
  }
}

/* ===================================== Setup Reducer ===================================== */
// Get Topics
export const setTopicsRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPICS_REQUEST })
  }
}
export const setTopicsSuccess = (topics) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_TOPICS_SUCCESS, topics})
  }
}
export const setTopicsFailure = (errorFetchingTopics) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_TOPICS_FAILURE, errorFetchingTopics})
  }
}

// Get Topic Detail
export const setTopicDetailRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_DETAIL_REQUEST })
  }
}
export const setTopicDetailSuccess = (topicDetail) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_DETAIL_SUCCESS, topicDetail })
  }
}
export const setTopicDetailFailure = (errorFetchingTopicDetail) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_DETAIL_FAILURE, errorFetchingTopicDetail })
  }
}

// Learn Topic Detail
export const setTopicLearnedRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_LEARNED_REQUEST })
  }
}
export const setTopicLearnedSuccess = (topicLearned) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_LEARNED_SUCCESS, topicLearned })
  }
}
export const setTopicLearnedFailure = (errorFetchingTopicLearned) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_TOPIC_LEARNED_FAILURE, errorFetchingTopicLearned })
  }
}

// Save Question Topic Game
export const saveElapsedSecond = (elapsedSeconds) => {
  return dispatch => {
    dispatch({ type: actionTypes.SAVE_ELAPSED_SECONDS, elapsedSeconds })
  }
}
export const saveRoomId = (roomId) => {
  return dispatch => {
    dispatch({ type: actionTypes.SAVE_ROOM_ID, roomId })
  }
}
export const saveQuestionTopic = (questionData) => {
  return dispatch => {
    dispatch({ type: actionTypes.SAVE_QUESTION_TOPIC, questionData })
  }
}
export const saveDataRanking = (dataRanking) => {
  return dispatch => {
    dispatch({ type: actionTypes.SAVE_DATA_RANKING, dataRanking })
  }
}

