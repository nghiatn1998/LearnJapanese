import React, {useEffect, useRef, useState} from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import styled from 'styled-components'
import {Normalize, Colors} from '../../../Themes'
import { useSelector } from 'react-redux'
import * as Speech from 'expo-speech'
import {
  emitQuizAnswer,
  emitQuizAutoAnswer,
  emitQuizClosed,
  onQuizAnswerResponse,
  onQuizJoinError,
  removeListener
} from '../../../Store/Services/SocketAPI'
import {ActivityIndicatorLoading} from '../../../Components'
import CountDownTimer from './Components/CountDownTimer'
import DHeaderQuiz from './Components/DHeaderQuiz'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SFProText-Regular',
    fontSize: Normalize(21),
    color: Colors.black,
    marginTop: 20,
    textAlign: 'center'
  },
  countDownTime: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  questionContainerCorrect: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: 'green',
    marginHorizontal: 20,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionContainerSelected: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
    paddingVertical: 10,
    backgroundColor: '#860502',
    marginHorizontal: 20,
    marginVertical: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleQuestion: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(18),
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20
  },
  answerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  topicRow: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  topicRow1: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 50
  },
  textTopic: {
    fontFamily: 'SFProText-Regular',
    fontSize: Normalize(14),
    color: Colors.black,
    marginLeft: 10
  },
  titleScreen: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(26),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10
  },
  question: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(18),
    color: Colors.black,
  },
  questionSelected: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(18),
    color: Colors.white,
  },
  questionCorrect: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(18),
    color: Colors.white,
  },
  roundButton: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#A30000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  playQuiz: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: 'black'
  },
  play: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: 'white'
  },
  flatList: {
    marginTop: 10
  }
})

let intElapsedSeconds = 0

const QuizGamePlayingScreen = ({ navigation }) => {
  const userId = useSelector(state => state.authenticate.userId)
  const questionTopic = useSelector(state => state.topics.questionTopic)
  const roomId = useSelector(state => state.topics.roomId)

  const [numberQuestion, setNumberQuestion] = useState(0)
  const [timer, setTimer] = useState(5)
  const [listUserAnswer, setListUserAnswer] = useState([])
  const [indexSelected, setIndexSelected] = useState(-1)
  const [indexAnswer, setIndexAnswer] = useState(-1)

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevNumberQuestion = usePrevious({ numberQuestion })

  useEffect(() => {
    onQuizAnswerResponse((response) => {
      setListUserAnswer(prevState => [...prevState, response])
    })
    onQuizJoinError((response) => {
      // console.log('response ==> ', response)
    })
    return () => {
      removeListener(onQuizJoinError)
      removeListener(onQuizAnswerResponse)
    }
  })

  const speechVocabulary = (vocabulary) => {
    Speech.speak(vocabulary, {
      language: 'ja'
    })
  }

  useEffect(() => {
    if (prevNumberQuestion !== numberQuestion) {
      speechVocabulary(questionTopic[numberQuestion].question)
      emitQuizAutoAnswer(roomId, questionTopic[numberQuestion]._id)
    }
  }, [numberQuestion])

  const onPressQuestion = (idAnswer, userAnswer) => {
    emitQuizAnswer(roomId, questionTopic[numberQuestion]._id, 2, userAnswer, userId)
    setIndexSelected(userAnswer)
  }

  const renderListAnswerQuiz = () => {
    const { answers, answer_id } = questionTopic[numberQuestion]
    if (indexAnswer !== -1) {
      if (indexAnswer === indexSelected) {
        return answers.map((item, indexUserAnswer) => {
          let indexListPlayerAnswer = -1
          return (
            <View key={'keyItem1' + indexUserAnswer.toString()} style={indexAnswer === indexUserAnswer ? styles.questionContainerCorrect : styles.questionContainer}>
              <Text style={indexAnswer === indexUserAnswer ? styles.questionCorrect : styles.question}>{item}</Text>
              {listUserAnswer.map((itemUserAnswer, index) => {
                if (itemUserAnswer.answerId === indexUserAnswer) {
                  indexListPlayerAnswer++
                  return (
                    <Image
                      key={'keyUserAnswer1' + index.toString()}
                      source={{ uri: itemUserAnswer.avatar }}
                      style={{ marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                    />
                  )
                }
              })}
            </View>
          )
        })
      } else {
        return answers.map((item, indexUserAnswer) => {
          let indexListPlayerAnswer = -1
          if (indexAnswer === indexUserAnswer) {
            return(
              <View
                key={'keyItem123' + indexUserAnswer.toString()}
                style={styles.questionContainerCorrect}>
                <Text style={styles.questionCorrect}>{item}</Text>
                {listUserAnswer.map((itemUserAnswer, index) => {
                  if (itemUserAnswer.answerId === indexUserAnswer) {
                    indexListPlayerAnswer++
                    return (
                      <Image
                        key={'keyUserAnswer444' + index.toString()}
                        source={{ uri: itemUserAnswer.avatar }}
                        style={{ marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                      />
                    )
                  }
                })}
              </View>
            )
          } else if (indexSelected === indexUserAnswer) {
            return (
              <View
                key={'keyItem2' + indexUserAnswer.toString()}
                style={styles.questionContainerSelected}>
                <Text style={styles.questionSelected}>{item}</Text>
                {listUserAnswer.map((itemUserAnswer, index) => {
                  if (itemUserAnswer.answerId === indexUserAnswer) {
                    indexListPlayerAnswer++
                    return (
                      <Image
                        key={'keyUserAnswer2' + index.toString()}
                        source={{ uri: itemUserAnswer.avatar }}
                        style={{ marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                      />
                    )
                  }
                })}
              </View>
            )
          } else {
            return (
              <View
                key={'keyItem3' + indexUserAnswer.toString()}
                style={styles.questionContainer}>
                <Text style={styles.question}>{item}</Text>
                {listUserAnswer.map((itemUserAnswer, index) => {
                  if (itemUserAnswer.answerId === indexUserAnswer) {
                    indexListPlayerAnswer++
                    return (
                      <Image
                        key={'keyUserAnswer3' + index.toString()}
                        source={{ uri: itemUserAnswer.avatar }}
                        style={{ marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                      />
                    )
                  }
                })}
              </View>
            )
          }
        })
      }
    } else if (indexSelected !== -1) {
      return answers.map((item, indexUserAnswer) => {
        let indexListPlayerAnswer = -1
        return (
          <View key={'keyQuiz4' + indexUserAnswer.toString()} style={indexSelected === indexUserAnswer ? styles.questionContainerSelected : styles.questionContainer}>
            <Text style={indexSelected === indexUserAnswer ? styles.questionSelected : styles.question}>{item}</Text>
            {listUserAnswer.map((itemUserAnswer, index) => {
              if (itemUserAnswer.answerId === indexUserAnswer) {
                indexListPlayerAnswer++
                return (
                  <Image
                    key={'keyUserAnswer4' + index.toString()}
                    source={{ uri: itemUserAnswer.avatar }}
                    style={{  marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                  />
                )
              }
            })}
          </View>
        )
      })
    } else {
      return answers.map((item, indexUserAnswer) => {
        let indexListPlayerAnswer = -1
        return (
          <TouchableOpacity
            key={'keyQuiz5' + indexUserAnswer.toString()}
            style={indexSelected === indexUserAnswer ? styles.questionContainerSelected : styles.questionContainer}
            onPress={() => onPressQuestion(answer_id, indexUserAnswer)}
          >
            <Text style={indexSelected === indexUserAnswer ? styles.questionSelected : styles.question}>{item}</Text>
            {listUserAnswer.map((itemUserAnswer, index) => {
              if (itemUserAnswer.answerId === indexUserAnswer) {
                indexListPlayerAnswer++
                return (
                  <Image
                    key={'keyUserAnswer5' + index.toString()}
                    source={{ uri: itemUserAnswer.avatar }}
                    style={{ marginRight: 5, width: 30, height: 30, borderRadius: 15, position: 'absolute', right: 12 * indexListPlayerAnswer}}
                  />
                )
              }
            })}
          </TouchableOpacity>
        )
      })
    }
  }

  const updateText = (elapsedSeconds, totalSeconds) => {
    intElapsedSeconds = elapsedSeconds
    return (totalSeconds - elapsedSeconds).toString()
  }

  const onPressNextQuestion = () => {
    setIndexAnswer(questionTopic[numberQuestion].answer_id)
    if (indexSelected === -1) {
      emitQuizAnswer(roomId, questionTopic[numberQuestion]._id, 0, indexSelected, userId)
    }
    const timeout = setTimeout(() => {
      if (numberQuestion + 1 === questionTopic.length) {
        emitQuizClosed(roomId)
        navigation.navigate('QuizGameRankingScreen')
      } else {
        setNumberQuestion(prevState => prevState + 1)
        setIndexAnswer(-1)
        setIndexSelected(-1)
        setListUserAnswer([])
        if (timer === 5) {
          setTimer(prevState => prevState + 1)
        } else {
          setTimer(prevState => prevState - 1)
        }
      }
      clearTimeout(timeout)
    }, 2000)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DHeaderQuiz
        title={'Quiz Game Playing'}
      />
      <QuizContainer>
        <Text style={styles.title}>Guess the answer</Text>
        <Text style={styles.titleQuestion}>Question: {questionTopic[numberQuestion].question}</Text>
        {
          questionTopic.length
            ? renderListAnswerQuiz()
            : <ActivityIndicatorLoading />
        }
        <View style={styles.countDownTime}>
          <CountDownTimer timer={timer} updateText={updateText} onPressNextQuestion={onPressNextQuestion}/>
        </View>
      </QuizContainer>
    </SafeAreaView>
  )
}

const QuizContainer = styled.View`
  flex: 1;
  background: #f5f5f5;
  box-shadow: 0 0 10px gray;
`

QuizGamePlayingScreen.navigationOptions = {
  header: null
}

export default QuizGamePlayingScreen
