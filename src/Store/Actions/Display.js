import * as actionTypes from '../ActionTypes'

/* ===================================== Setup Reducer ===================================== */
export const openMenu = () => {
  return dispatch => {
    dispatch({type: actionTypes.OPEN_MENU})
  }
}

export const closeMenu = () => {
  return dispatch => {
    dispatch({type: actionTypes.CLOSE_MENU})
  }
}

export const openCard = () => {
  return dispatch => {
    dispatch({ type: actionTypes.OPEN_CARD })
  }
}

export const closeCard = () => {
  return dispatch => {
    dispatch({type: actionTypes.CLOSE_CARD})
  }
}

export const openLogin = () => {
  return dispatch => {
    dispatch({type: actionTypes.OPEN_LOGIN})
  }
}

export const closeLogin = () => {
  return dispatch => {
    dispatch({ type: actionTypes.CLOSE_LOGIN })
  }
}

export const openNotification = () => {
  return dispatch => {
    dispatch({type: actionTypes.OPEN_NOTIFICATION})
  }
}

export const closeNotification = () => {
  return dispatch => {
    dispatch({ type: actionTypes.CLOSE_NOTIFICATION })
  }
}

export const updateName = () => {
  return dispatch => {
    dispatch({type: actionTypes.UPDATE_NAME})
  }
}

export const updateAvatar = () => {
  return dispatch => {
    dispatch({ type: actionTypes.UPDATE_AVATAR })
  }
}