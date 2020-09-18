import React from 'react'
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native'

// Styles
import {Normalize, ImagesGame} from '../../../Themes'
import {useSelector} from 'react-redux'

const GameOverScreen = (props) => {
  const topicDetail = useSelector(state => state.topics.topicDetail)
  const id = topicDetail._id

  const restartGame = () => props.navigation.replace('LearnTopicDetailScreen', { id: id })

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={ImagesGame.gameOver}
        />
        <View style={styles.separator} />
        <Text style={styles.textGameOver}>Let try again</Text>
      </View>
      <View style={styles.toolContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={() => props.navigation.pop(1)}>
            <Image
              style={styles.imageHome}
              source={ImagesGame.homeGame}
            />
          </TouchableOpacity>
          <View style={styles.separatorTool} />
          <TouchableOpacity onPress={restartGame}>
            <Image
              style={styles.imageRestart}
              source={ImagesGame.restartGame}
            />
          </TouchableOpacity>
          {/*<View style={styles.separatorTool} />*/}
          {/*<TouchableOpacity onPress={() => props.navigation.navigate('SettingGameScreen')}>*/}
          {/*  <Image*/}
          {/*    style={styles.imageSettings}*/}
          {/*    source={ImagesGame.settingsGame}*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
        </View>
      </View>
    </View>
  )
}

GameOverScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#150B7B'
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  toolContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20
  },
  image: {
    width: Normalize(300),
    height: Normalize(300)
  },
  imageSettings: {
    width: 80,
    height: 80
  },
  imageHome: {
    width: 95,
    height: 95
  },
  imageRestart: {
    width: 80,
    height: 80
  },
  textGameOver: {
    fontSize: Normalize(24),
    fontFamily: 'source-code-pro',
    fontWeight: '400',
    color: 'white'
  },
  separator: {
    marginVertical: 10
  },
  separatorTool: {
    marginHorizontal: 20
  }
})

export default GameOverScreen