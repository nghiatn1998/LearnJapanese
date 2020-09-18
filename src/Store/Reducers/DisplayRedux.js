import * as actionTypes from "../ActionTypes";

const initialState = {
  action: '',
  name: "Stranger",
  avatar: "https://cl.ly/55da82beb939/download/avatar-default.jpg"
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Menu
    case actionTypes.OPEN_MENU:
      return {
        ...state,
        action: actionTypes.OPEN_MENU
      }
    case actionTypes.CLOSE_MENU:
      return {
        ...state,
        action: actionTypes.CLOSE_MENU
      }

    // Card
    case actionTypes.OPEN_CARD:
      return {
        ...state,
        action: actionTypes.OPEN_CARD
      }
    case actionTypes.CLOSE_CARD:
      return {
        ...state,
        action: actionTypes.CLOSE_CARD
      }

    // Login
    case actionTypes.OPEN_LOGIN:
      return {
        ...state,
        action: actionTypes.OPEN_LOGIN
      }
    case actionTypes.CLOSE_LOGIN:
      return {
        ...state,
        action: actionTypes.CLOSE_LOGIN
      }

    // Notification
    case actionTypes.OPEN_NOTIFICATION:
      return {
        ...state,
        action: actionTypes.OPEN_NOTIFICATION
      }
    case actionTypes.CLOSE_NOTIFICATION:
      return {
        ...state,
        action: actionTypes.CLOSE_NOTIFICATION
      }

    // Authenticate
    case actionTypes.UPDATE_NAME:
      return {
        ...state,
        name: action.name
      }
    case actionTypes.UPDATE_AVATAR: {
      return {
        ...state,
        avatar: action.avatar
      }
    }
    default:
      return state;
  }
};
