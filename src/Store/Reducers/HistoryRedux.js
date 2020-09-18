import * as actionTypes from "../ActionTypes";

const initialState = {
  fetchingHistories: false,
  errorFetchingHistories: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HISTORIES_REQUEST:
      return {
        ...state,
        fetchingHistories: true,
        errorFetchingHistories: null
      }
    case actionTypes.SET_HISTORIES_SUCCESS:
      return {
        ...state,
        fetchingHistories: false
      }
    case actionTypes.SET_HISTORIES_FAILURE:
      return {
        ...state,
        fetchingHistories: false,
        errorFetchingHistories: action.errorFetchingHistories
      }
    default:
      return state;
  }
};
