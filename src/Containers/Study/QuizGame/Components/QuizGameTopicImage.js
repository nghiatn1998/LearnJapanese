import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors, ImagesGame, Normalize} from '../../../../Themes'

// Components
import { ProgressiveImage } from '../../../../Components'

const QuizGameTopicImage = ({ item, index, onPressPlay }) => {
  return (
    <View key={'keyItem' + index.toString()} style={styles.topicRow}>
      <View style={styles.topicRow1}>
        <View style={styles.wrapImage}>
          <ProgressiveImage
            thumbnailSource={ImagesGame.loadingNormal}
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

export default QuizGameTopicImage
