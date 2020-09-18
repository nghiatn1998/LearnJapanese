import * as actionTypes from "../ActionTypes";

const initialState = {
  topics: [],
  questionTopic: [],
  dataRanking: [],

  roomId: null,
  topicDetail: null,
  topicLearned: null,

  elapsedSeconds: 0,

  fetchingTopics: false,
  errorFetchingTopics: null,

  fetchingTopicDetail: false,
  errorFetchingTopicDetail: null,

  fetchingTopicLearned: false,
  errorFetchingTopicLearned: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // Fetching Topics
    case actionTypes.SET_TOPICS_REQUEST:
      return {
        ...state,
        fetchingTopics: true,
        topics: [],
        errorFetchingTopics: null
      }
    case actionTypes.SET_TOPICS_SUCCESS:
      return {
        ...state,
        fetchingTopics: false,
        topics: action.topics
      }
    case actionTypes.SET_TOPICS_FAILURE:
      return {
        ...state,
        fetchingTopics: false,
        errorFetchingTopics: action.errorFetchingTopics
      }
    case actionTypes.SAVE_QUESTION_TOPIC:
      return {
        ...state,
        questionTopic: action.questionData
      }

    // Fetching Topic Detail
    case actionTypes.SET_TOPIC_DETAIL_REQUEST:
      return {
        ...state,
        fetchingTopicDetail: true,
        topicDetail: null,
        errorFetchingTopicDetail: null
      }
    case actionTypes.SET_TOPIC_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingTopicDetail: false,
        topicDetail: action.topicDetail
      }
    case actionTypes.SET_TOPIC_DETAIL_FAILURE:
      return {
        ...state,
        fetchingTopicDetail: false,
        errorFetchingTopicDetail: action.errorFetchingTopicDetail
      }
    case actionTypes.SAVE_ROOM_ID:
      return {
        ...state,
        roomId: action.roomId
      }
    case actionTypes.SAVE_DATA_RANKING:
      return {
        ...state,
        dataRanking: action.dataRanking
      }
    case actionTypes.SAVE_ELAPSED_SECONDS:
      return {
        ...state,
        elapsedSeconds: action.elapsedSeconds
      }

    //Fetching Topic Learned
    case actionTypes.SET_TOPIC_LEARNED_REQUEST:
      return {
        ...state,
        fetchingTopicLearned: true,
        topicLearned: null,
        errorFetchingTopicLearned: null
      }
    case actionTypes.SET_TOPIC_LEARNED_SUCCESS:
      return {
        ...state,
        fetchingTopicLearned: false,
        topicLearned: action.topicLearned
      }
    case actionTypes.SET_TOPIC_LEARNED_FAILURE:
      return {
        ...state,
        fetchingTopicLearned: false,
        errorFetchingTopicLearned: action.errorFetchingTopicLearned
      }
    default:
      return state;
  }
};
