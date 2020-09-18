import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-navigation"
import styled from 'styled-components'
import { Normalize, Colors} from '../../../Themes'
import { onQuizRank, removeListener } from '../../../Store/Services/SocketAPI'
import { saveDataRanking } from '../../../Store/Actions/Topics'
import { useSelector, useDispatch } from 'react-redux'
import { AntDesign } from '@expo/vector-icons'

// Styles
const styles = StyleSheet.create({
  stt: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(17),
    color: Colors.black,
    marginRight: 25
  },
  learnVocabulary: {
    marginRight: 20
  },
  win: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(21),
    textAlign: 'center',
    paddingVertical: 15
  },
  name: {
    fontFamily: 'source-code-pro-bold',
    fontSize: Normalize(17),
    color: Colors.black
  },
  wrapPlayer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imagePlayer : {
    flex: 1
  },
  wrapImagePlayerRealUser: {
    width: Normalize(55),
    height: Normalize(55),
    borderRadius: Normalize(55 / 2),
    marginRight: 10,
    borderWidth: 4,
    borderColor: Colors.selectiveYellow,
    overflow: 'hidden'
  },
  wrapImagePlayer: {
    width: Normalize(55),
    height: Normalize(55),
    borderRadius: Normalize(55 / 2),
    marginRight: 10,
    overflow: 'hidden'
  },
  wrapRankingTop1: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 20,
    alignItems: 'center'
  },
  wrapRankingTop2: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#9A9A9A',
    marginBottom: 20,
    alignItems: 'center'
  },
  wrapRankingTop3: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#783F04',
    marginBottom: 20,
    alignItems: 'center'
  },
  wrapRanking: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    alignItems: 'center'
  },
  wrapRankingName: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  score: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(21),
    color: Colors.black
  }
})

const QuizGameRankingScreen = () => {
  const dispatch = useDispatch()

  const dataRanking = useSelector(state => state.topics.dataRanking)

  useEffect(() => {
    onQuizRank((response) => {
      dispatch(saveDataRanking(response))
    })

    return () => removeListener(onQuizRank)
  }, [])

  const renderRanking = ({ item, index }) => {
    return (
      <View style={(item.rank === 1 && styles.wrapRankingTop1) || (item.rank === 2 && styles.wrapRankingTop2) || (item.rank === 3 && styles.wrapRankingTop3) || styles.wrapRanking} key={'keyItem' + index.toString()}>
        <View style={styles.wrapRankingName}>
          <Text style={styles.stt}>{item.rank}</Text>
          <View style={styles.wrapPlayer}>
            <View style={item.isRealUser ? styles.wrapImagePlayerRealUser: styles.wrapImagePlayer}>
              <Image source={{ uri: item.avatar }} resizeMode={'contain'} style={styles.imagePlayer}/>
            </View>
            <Text style={styles.name}>{item.username}</Text>
          </View>
        </View>
        <Text style={styles.score}>{Math.floor(item.score)}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={'light-content'} />
      <QuizContainer>
        <Text style={styles.win}>PLAYER WIN</Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={dataRanking.users || []}
          renderItem={renderRanking}
        />
      </QuizContainer>
    </SafeAreaView>
  )
}

QuizGameRankingScreen.navigationOptions = (navigationData) => {
  const onPressGameDone = () => {
    navigationData.navigation.pop(3)
  }

  return {
    headerTitle: 'RANKING',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000068',
    },
    headerTitleStyle: {
      fontFamily: 'SFProText-Bold'
    },
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        onPress={onPressGameDone}
        style={styles.learnVocabulary}>
        <AntDesign
          name="checkcircleo"
          size={Normalize(25)}
          color={'white'}
        />
      </TouchableOpacity>
    )
  }
}

const QuizContainer = styled.View`
  flex: 1;
  background: #f5f5f5;
  margin-top: 15px;
  margin-vertical: 15px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 25px;
  box-shadow: 0 0 10px gray;
`

export default QuizGameRankingScreen
