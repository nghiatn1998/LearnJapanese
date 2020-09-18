import * as actionTypes from "../ActionTypes";

const initialState = {
  fetchingUserInformation: false,
  fetchingUserInformationSuccess: false,
  userInformation: null,
  errorFetchingUserInformation: null,

  token: null,
  userId: null,
  error: null,
  loading: false
}; 

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        userInformation: action.userInformation
      };
    case actionTypes.SET_LOGIN_REQUEST:
      return {
        ...state,
        fetchingUserInformation: true,
        fetchingUserInformationSuccess: false,
        errorFetchingUserInformation: null
      };
    case actionTypes.SET_LOGIN_SUCCESS:
      return {
        ...state,
        fetchingUserInformation: false,
        fetchingUserInformationSuccess: true,
        userInformation: action.userInformation
      };
    case actionTypes.SET_LOGIN_FAILURE:
      return {
        ...state,
        fetchingUserInformation: false,
        fetchingUserInformationSuccess: false,
        errorFetchingUserInformation: action.errorFetchingUserInformation
      };
    case actionTypes.GET_ME:
      return {
        ...state,
        token: action.token,
        userInformation: action.userInformation
      };
    case actionTypes.SET_USER_NAME:
      return {
        ...state,
        userInformation: {
          ...state.userInformation,
          username: action.username
        }
      }
    case actionTypes.AUTH_START: 
      return {
        ...state,
        error: null,
        loading: true
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
