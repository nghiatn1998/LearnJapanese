import React, { useEffect } from 'react'
import {View, Text, StyleSheet, Image, FlatList, TouchableOpacity, StatusBar} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import styled from 'styled-components'
import {Normalize, Colors} from '../../../Themes'
import { useSelector, useDispatch } from 'react-redux'
import * as topicsActions from '../../../Store/Actions/Topics'
import {alertError} from '../../../Functions/alertFunction'
import {emitQuizJoin, onQuizJoinSuccess, removeListener} from '../../../Store/Services/SocketAPI'
import {ActivityIndicatorLoading} from '../../../Components'
import DHeaderQuiz from './Components/DHeaderQuiz'
import {saveRoomId} from '../../../Store/Actions/Topics'

const styles = StyleSheet.create({
  title: {
    fontFamily: 'SFProText-Regular',
    fontSize: Normalize(21),
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20
  },
  wrapImage: {
    width: Normalize(60),
    height: Normalize(60),
    borderRadius: Normalize(60 / 2),
    overflow: 'hidden'
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
  roundButton: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#A30000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
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

const QuizGameScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const topics = useSelector(state => state.topics.topics)
  const userId = useSelector(state => state.authenticate.userId)
  const { fetchingTopics, errorFetchingTopics} = useSelector(state => ({
    fetchingTopics: state.topics.fetchingTopics,
    errorFetchingTopics: state.topics.errorFetchingTopics
  }));

  useEffect(() => {
    const getTopics = async () => await dispatch(topicsActions.getTopics())
    getTopics().then(() => () => {})

    onQuizJoinSuccess((response) => {
      if (response && response._id) {
        dispatch(saveRoomId(response._id))
      }
    })

    return () => removeListener(onQuizJoinSuccess)
  }, [])

  useEffect(() => {
    if (!fetchingTopics && errorFetchingTopics) {
      alertError(null, errorFetchingTopics)
    }
  }, [fetchingTopics, errorFetchingTopics])

  const onPressPlay = (item) => {
    if (item._id && userId) {
      emitQuizJoin(userId, item._id)
      navigation.navigate('QuizGameWaitingUserScreen')
    }
  }

  const renderTopicQuiz = ({ item, index }) => {
    return (
      <View key={'keyItem' + index.toString()} style={styles.topicRow}>
        <View style={styles.topicRow1}>
          <View style={styles.wrapImage}>
            <Image
              style={{ flex: 1 }}
              source={{ uri: item.avatar }}
              resizeMode={'contain'}
            />
          </View>
          <Text numberOfLines={1} style={styles.textTopic}>{item.title}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressPlay(item)} style={styles.roundButton}>
          <Text style={styles.play}>Play</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DHeaderQuiz title={'Quiz Game'}/>
      <StatusBar barStyle={'dark-content'} />
      <QuizContainer>
        <Text style={styles.title}>Choose the topic</Text>
        {
          (!fetchingTopics && topics)
            ? (
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={topics}
                style={styles.flatList}
                renderItem={renderTopicQuiz}
                showsVerticalScrollIndicator={false}
              />
            ) : <ActivityIndicatorLoading />
        }
      </QuizContainer>
    </SafeAreaView>
  )
}

const QuizContainer = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0 0 10px gray;
`

QuizGameScreen.navigationOptions = {
  header: null
}

export default QuizGameScreen
