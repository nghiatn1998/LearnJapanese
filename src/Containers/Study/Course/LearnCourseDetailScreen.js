import React, {useEffect, useRef, useState} from 'react'
import {StatusBar, StyleSheet, Text, View} from 'react-native'
import {ifIphoneX} from 'react-native-iphone-x-helper'
import * as Speech from 'expo-speech'

// Components
import {ActivityIndicatorLoading, BlockAnswers, HeaderTopicGame} from '../../../Components'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import * as topicsActions from '../../../Store/Actions/Topics'
import * as historyActions from '../../../Store/Actions/History'

// Styles
import {Normalize} from '../../../Themes'

// Functions
import {alertError} from '../../../Functions/alertFunction'
import {useDidUpdate} from '../../../Functions/customHook'

// let isHistory = false

const LearnCourseDetailScreen = (props) => {
  const topicId = props.navigation.getParam('id')

  const [numberQuestion, setNumberQuestion] = useState(0)
  const [timer, setTimer] = useState(360)
  const [shield, setShield] = useState(3)
  const [answers, setAnswers] = useState([])
  const topicLearned = useSelector(state => state.topics.topicLearned)
  const {fetchingTopicLearned, errorFetchingTopicLearned} = useSelector(state => ({
    fetchingTopicLearned: state.topics.fetchingTopicLearned,
    errorFetchingTopicLearned: state.topics.errorFetchingTopicLearned
  }))
  const {fetchingHistories, errorFetchingHistories} = useSelector(state => ({
    fetchingHistories: state.histories.fetchingHistories,
    errorFetchingTopicLearned: state.histories.errorFetchingTopicLearned
  }))
  const dispatch = useDispatch()

  const prevVocabulary = usePrevious({ numberQuestion })

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  useEffect(() => {
    const getTopicLearned = async () => await dispatch(topicsActions.getTopicLearned(topicId))

    if (topicId) {
      getTopicLearned().then(() => {})
    }
  }, [])

  const speechVocabulary = (vocabulary) => {
    Speech.speak(vocabulary, {
      language: 'ja'
    })
  }

  useDidUpdate(() => {
    if (!fetchingTopicLearned && errorFetchingTopicLearned) {
      alertError(null, errorFetchingTopicLearned)
    }
    if (topicLearned && (numberQuestion === 0 || prevVocabulary.numberQuestion !== numberQuestion)) {
      speechVocabulary(topicLearned[numberQuestion].question)
    }
  }, [numberQuestion, fetchingTopicLearned, errorFetchingTopicLearned])

  const checkAnswer = (answerCorrect, question) => {
    if (answerCorrect) {
      if (numberQuestion + 1 === topicLearned.length) {
        const answersArray = [...answers]
        answersArray.push({
          question,
          correct: true
        })
        dispatch(historyActions.setHistory(topicId, answers))
        // isHistory = true
        props.navigation.replace('GameOverScreen')
      } else {
        setTimeout(() => {
          const answersArray = [...answers]
          answersArray.push({
            question,
            correct: true
          })
          setAnswers(answersArray)
          setNumberQuestion(numberQuestion + 1)
        }, 1000)
      }
    } else {
      if (shield === 0) {
        const answersArray = [...answers]
        answersArray.push({
          question,
          correct: false
        })
        dispatch(historyActions.setHistory(topicId, answers))
        // isHistory = true
        props.navigation.replace('GameOverScreen')
      } else {
        setShield(shield - 1)
      }
    }
  }

  const groupAnswerByQuantity = (answers, quantityAnswer) => {
    const size = quantityAnswer
    return answers.reduce((accumulator, curr, i) => {
      if (!(i % size)) {    // if index is 0 or can be divided by the `size`...
        // ..push a chunk of the original array to the accumulator
        accumulator.push(answers.slice(i, i + size))
      }
      return accumulator
    }, [])
  }

  const renderAnswers = () => {
    const { answers, answer_id } = topicLearned[numberQuestion]
    const quantityAnswer = topicLearned[numberQuestion].answers.length

    const answersFormat = answers.map((answer, index) => {
      return {
        ...answer,
        index: index,
        answerCorrect: answer_id === index,
        numberQuestion: numberQuestion
      }
    })
    if (quantityAnswer === 4 || quantityAnswer === 6 || quantityAnswer === 8) {
      const group2Answer = groupAnswerByQuantity(answersFormat, 2)
      return group2Answer.map((answers, index) => {
        return (
          <BlockAnswers
            key={'Answer' + index.toString()}
            answersEachRow={2}
            answers={answers}
            onPress={checkAnswer}
          />
        )
      })
    } else {
      const group3Answer = groupAnswerByQuantity(answersFormat, 3)
      return group3Answer.map((answers, index) => {
        return (
          <BlockAnswers
            key={'Answer' + index.toString()}
            answersEachRow={3}
            answers={answers}
            onPress={checkAnswer}
          />
        )
      })
    }
  }

  const updateText = (elapsedSecs, totalSecs) => {
    return (totalSecs - elapsedSecs).toString()
  }

  const onPressCloseHandler = () => props.navigation.pop()

  // useEffect(() => {
  //  if (errorFetchingHistories && !fetchingHistories) {
  //    alertError(null, errorFetchingHistories)
  //  }
  //  if (isHistory && !errorFetchingHistories && !fetchingHistories) {
  //    props.navigation.replace('GameOverScreen')
  //    isHistory = false
  //  }
  // }, [isHistory, fetchingHistories, errorFetchingHistories])

  return (
    <View style={styles.rootContainer}>
      <StatusBar backgroundColor={'#860502'} hidden/>
      {fetchingTopicLearned && <ActivityIndicatorLoading/>}
      {
        (!fetchingTopicLearned && topicLearned) &&
        <React.Fragment>
          <HeaderTopicGame
            shield={shield}
            timer={timer}
            updateText={updateText}
            onPressCloseHandler={onPressCloseHandler}
            {...props}
          />
          <View style={styles.bodyContainer}>
            <View style={styles.vocabularyContainer}>
              <Text style={styles.vocabularyText}>
                {topicLearned[numberQuestion].question}
              </Text>
            </View>
            <View style={styles.separator}/>
            {renderAnswers()}
            <View style={styles.bottomSeparator}/>
          </View>
        </React.Fragment>
      }
    </View>
  )
}

LearnCourseDetailScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    ...ifIphoneX({
      paddingTop: 40,
      backgroundColor: '#860502'
    }, {
      paddingTop: 0
    })
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: '#150B7B',
    marginTop: 5,
    paddingHorizontal: 20
  },
  vocabularyContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  vocabularyText: {
    fontSize: Normalize(24),
    fontFamily: 'source-code-pro-bold'
  },
  separator: {
    marginVertical: 10
  },
  bottomSeparator: {
    marginBottom: 10
  }
})

export default LearnCourseDetailScreen
