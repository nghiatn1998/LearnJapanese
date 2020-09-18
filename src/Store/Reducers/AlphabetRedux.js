import * as actionTypes from "../ActionTypes";

const initialState = {
  listAlphabetHiraganaData: null,
  listAlphabetKatakanaData: null,

  fetchingAlphabet: false,
  errorFetchingAlphabet: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALPHABET_REQUEST:
      return {
        ...state,
        fetchingAlphabet: true,
        errorFetchingAlphabet: null
      };
    case actionTypes.SET_ALPHABET_HIRAGANA_SUCCESS:
      return {
        ...state,
        fetchingAlphabet: false,
        listAlphabetHiraganaData: action.listAlphabetData
      };
    case actionTypes.SET_ALPHABET_KATAKANA_SUCCESS:
      return {
        ...state,
        fetchingAlphabet: false,
        listAlphabetKatakanaData: action.listAlphabetData
      };
    case actionTypes.SET_ALPHABET_FAILURE:
      return {
        ...state,
        fetchingAlphabet: false,
        errorFetchingAlphabet: action.errorFetchingAlphabet
      };
    default:
      return state;
  }
};
