import {Alert, AsyncStorage} from 'react-native'
import * as actionTypes from '../ActionTypes'
import axios from '../Services/BaseAPI'

//
import {isValidEmail} from '../../Utils/validator'
import {setTopicLearnedRequest} from './Topics'
import {fetchingStatusBarOff, fetchingStatusBarOn} from '../../Functions/statusBarNetwork'

let timer

export const startup = () => {
  return async dispatch => {
    try {
      const userData = await AsyncStorage.getItem('userInformation')
      if (!userData) {
        throw new Error('Not authenticated')
      }
      const transformedData = JSON.parse(userData)
      const {token, userId} = transformedData
      const response = await axios.get('/users/me',
        {
          headers: {Authorization: `Bearer ${token}`}
        })

      if (response && response.status === 200) {
        const responseData = response.data
        const userInformation = {
          email: responseData.email,
          experience: responseData.experience,
          username: responseData.username,
          avatar: responseData.avatar
        }
        dispatch(authenticate(userId, token, userInformation))
      } else {
        throw new Error('Something went wrong!')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    dispatch(setLoginRequest())
    try {
      fetchingStatusBarOn()
      const response = await axios.post('/users/login', {
        ...(isValidEmail(username) ? {email: username} : {username}),
        password
      })
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        const responseData = response.data
        const userInformation = {
          email: responseData.email,
          experience: responseData.experience,
          username: responseData.username,
          avatar: responseData.avatar
        }
        dispatch(setLoginSuccess(userInformation))
        addDataToStorage(responseData._id, responseData.token)
        dispatch(authenticate(responseData._id, responseData.token, userInformation))
      } else {
        dispatch(setLoginFailure('Login failed. Please try again.'))
      }
    } catch (error) {
      dispatch(setLoginFailure(error.message || error))
      throw new Error('Login failed')
    }
  }
}

export const loginFacebook = (data) => {
  return async dispatch => {
    try {
      fetchingStatusBarOn()
      const response = await axios.post('/users/login-fb', data)
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        const responseData = response.data
        const userInformation = {
          email: responseData.email,
          experience: responseData.experience,
          username: responseData.username,
          avatar: responseData.avatar,
          userId: responseData._id
        }
        addDataToStorage(responseData._id, responseData.token)
        dispatch(authenticate(responseData._id, responseData.token, userInformation))
      } else {
        dispatch(setLoginFailure('Login failed. Please try again.'))
        throw new Error('Login failed. Please try again.')
      }
    } catch (error) {
      dispatch(setLoginFailure(error.message || error))
      throw new Error(error.message || error)
    }
  }
}

export const signUpAndLogin = (email, password, username) => {
  return async dispatch => {
    try {
      fetchingStatusBarOn()
      const response = await axios.post('/users/', {
        email,
        password,
        username,
      })
      fetchingStatusBarOff()
      if (response && response.status === 200) {
        const responseData = response.data
        const userInformation = {
          email: responseData.email,
          experience: responseData.experience,
          username: responseData.username,
          avatar: responseData.avatar
        }
        addDataToStorage(responseData._id, responseData.token)
        dispatch(authenticate(responseData._id, responseData.token, userInformation))
      } else {
        throw new Error('Something went wrong. Please try again.')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const signup = (email, password, username) => {
  return async dispatch => {
    try {
      const response = await axios.post('/users/', {
        email,
        password,
        username,
      })
      if (response && response.status === 200) {
        Alert.alert('Tạo thành công tài khoản. Vui lòng đăng nhập để vào hệ thống!')
      } else {
        throw new Error('Something went wrong. Please try again.')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export const logout = () => {
  AsyncStorage.removeItem('userInformation').then(() => {})
  return {type: actionTypes.LOGOUT}
}

export const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer)
  }
}

export const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

export const addDataToStorage = (userId, token) => {
  AsyncStorage.setItem(
    'userInformation',
    JSON.stringify({
      userId: userId,
      token: token
    })
  )
}

/* ===================================== Setup Reducer ===================================== */
export const setLoginRequest = () => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_LOGIN_REQUEST })
  }
}
export const setLoginSuccess = (userInformation) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_LOGIN_SUCCESS, userInformation})
  }
}
export const setLoginFailure = (errorFetchingUserInformation) => {
  return dispatch => {
    dispatch({type: actionTypes.SET_LOGIN_FAILURE, errorFetchingUserInformation})
  }
}

export const authenticate = (userId, token, userInformation) => {
  return dispatch => {
    dispatch({type: actionTypes.AUTHENTICATE, userId, token, userInformation})
  }
}
