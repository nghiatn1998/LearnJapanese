import {fetchingStatusBarOff, fetchingStatusBarOn} from '../../Functions/statusBarNetwork'
import axios from '../Services/BaseAPI'
import AlphabetConfig from '../../Config/AlphabetConfig'
import * as actionTypes from '../ActionTypes'

export const getAlphabet = (type) => {
  return async (dispatch, getState) => {
    dispatch(setAlphabetRequest())
    try {
      fetchingStatusBarOn()
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.get(`/alphabet/${type}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        if (type === AlphabetConfig.HIRAGANA) {
          dispatch(setAlphabetHiraganaSuccess(response.data))
        } else if (type === AlphabetConfig.KATAKANA) {
          dispatch(setAlphabetKatakanaSuccess(response.data))
        }
      } else {
        dispatch(set('Cannot get alphabet. Please check again.'))
      }
    } catch (error) {
      dispatch(setAlphabetFailure(error.message || error))
    }
  }
}

export const setAlphabetRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_ALPHABET_REQUEST })
  }
}
export const setAlphabetHiraganaSuccess = (listAlphabetData) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_ALPHABET_HIRAGANA_SUCCESS, listAlphabetData })
  }
}
export const setAlphabetKatakanaSuccess = (listAlphabetData) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_ALPHABET_KATAKANA_SUCCESS, listAlphabetData })
  }
}
export const setAlphabetFailure = (errorFetchingAlphabet) => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_ALPHABET_FAILURE, errorFetchingAlphabet })
  }
}
