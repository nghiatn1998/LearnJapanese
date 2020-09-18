import axios from '../Services/BaseAPI'
import * as actionTypes from '../ActionTypes'

export const changeUserName = (username) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios.put('/users/set-username',
        {
          "password": "12345678",
          "newName": username
        },
        {
          headers: {Authorization: `Bearer ${token}`}
        })
      if (response && response.status === 200) {
         const username = response.data.username
         dispatch({ type: actionTypes.SET_USER_NAME, username });
      } else {
        return new Error('Something went wrong!')
      }
    } catch (error) {
      throw new Error(error.message || error)
    }
  }
}

export const getMe = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
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
        dispatch({ type: actionTypes.GET_ME, token, userInformation });
      } else {
        return new Error('Something went wrong!')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

export const changeAvatar = (data) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().authenticate.userInformation.token || getState().authenticate.token
      const response = await axios({
        method: 'PUT',
        url: '/avatars',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        data: data,
      })
      if (response && response.status === 200) {
        dispatch(getMe())
      } else if (response.status === 413) {
        return new Error('File image too large.')
      } else {
        return new Error('Check networking')
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

