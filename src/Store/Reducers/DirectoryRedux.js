import * as actionTypes from "../ActionTypes";

const initialState = {
  directories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DIRECTORIES:
      return {
        ...state,
        directories: action.directories
      }
    case actionTypes.ADD_DIRECTORY:
      return {
        ...state,
        directories: [...state.directories, action.directory]
      };
    default:
      return state;
  }
};
