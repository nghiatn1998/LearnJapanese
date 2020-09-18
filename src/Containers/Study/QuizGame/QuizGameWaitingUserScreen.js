import React, { useState, useEffect } from 'react'
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import styled from 'styled-components'
import {Normalize, Metrics, Colors} from '../../../Themes'
import {useDispatch, useSelector} from 'react-redux'

import {
  emitQuizJoin,
  onQuizJoinError, onQuizJoinSuccess,
  onQuizNewUser,
  onQuizReturnQuestion,
  removeListener
} from '../../../Store/Services/SocketAPI'
import {ActivityIndicatorLoading, DHeader} from '../../../Components'
import {saveQuestionTopic} from '../../../Store/Actions/Topics'
import {saveRoomId} from '../../../Store/Actions/Topics'

const styles = StyleSheet.create({
  countDown: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth
  },
  marginPending: {
    marginLeft: 10
  },
  loadPlayer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10
  },
  title: {
    fontFamily: 'SFProText-Regular',
    fontSize: Normalize(21),
    color: Colors.black,
    textAlign: 'center',
  },
  topicRow: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  topicRow1: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  textTopic: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(18),
    color: Colors.black
  },
  titleScreen: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(26),
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10
  },
  stt: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(14),
    color: Colors.black,
    textAlign: 'right',
    marginLeft: 20,
    marginRight: 20
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
  wrapImage: {
    width: Normalize(60),
    height: Normalize(60),
    borderRadius: Normalize(60 / 2),
    marginRight: 20,
    overflow: 'hidden'
  },
  play: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: 'white'
  }
})

const QuizGameWaitingUserScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const questionTopic = useSelector(state => state.topics.questionTopic)

  const [dataPlayers, setDataPlayers] = useState([])

  useEffect(() => {
    onQuizJoinSuccess((response) => {
      if (response && response._id) {
        dispatch(saveRoomId(response._id))
      }
    })
    onQuizNewUser((dataPlayer) => {
      setDataPlayers(prevDataPlayers => [...prevDataPlayers, dataPlayer])
    })
    onQuizReturnQuestion((response) => {
      dispatch(saveQuestionTopic(response))
    })
    onQuizJoinError((response) => {
      console.log('response onQuizJoinError ==> ', response)
    })

    return () => {
      removeListener(onQuizJoinSuccess)
      removeListener(onQuizNewUser)
      removeListener(onQuizReturnQuestion)
      removeListener(onQuizJoinError)
    }
  })

  useEffect(() => {
    if (questionTopic && questionTopic.length && dataPlayers && dataPlayers.length === 8) {
      // const timeout = setTimeout(() => {
        // clearTimeout(timeout)
        navigation.navigate('QuizGamePlayingScreen')
      // }, 2000)
    }
  }, [dataPlayers, questionTopic])


  const renderPlayer = ({ item, index }) => {
    return (
      <View key={'keyItem' + index.toString()} style={styles.topicRow}>
        <View style={styles.topicRow1}>
          <View style={styles.wrapImage}>
            <Image
              source={{ uri: item.avatar }}
              style={{ flex: 1 }}
              resizeMode={'contain'}
            />
          </View>
          <Text numberOfLines={1} style={styles.textTopic}>{item && item.username}</Text>
          <Text style={styles.stt}>{'(Player ' + (index + 1).toString() + ')'}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DHeader
        titleLeft={'Quiz Game Player'}
        onPressLeft={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        <QuizContainer>
          {
            dataPlayers.length < 8
              ? (
                <View style={styles.loadPlayer}>
                  <ActivityIndicator color={'black'} size={'small'} />
                  <Text style={[styles.title, styles.marginPending]}>{'WAITING PLAYERS'}</Text>
                </View>
              ) :  <Text style={[styles.title, { marginTop: 10 }]}>{'READY FOR GAME'}</Text>
          }
          {
            dataPlayers.length
              ? (
                <FlatList
                  keyExtractor={(item, index) => index.toString()}
                  data={dataPlayers}
                  renderItem={renderPlayer}
                />
              ) : <ActivityIndicatorLoading/>
          }
        </QuizContainer>
      </View>
    </SafeAreaView>
  )
}

const QuizContainer = styled.View`
  flex: 1;
  background: #f5f5f5;
  box-shadow: 0 0 10px gray;
`

QuizGameWaitingUserScreen.navigationOptions = {
  header: null
}

export default QuizGameWaitingUserScreen
