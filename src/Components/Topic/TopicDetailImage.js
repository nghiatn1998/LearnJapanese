import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {ImagesGame, Normalize} from '../../Themes'

// Components
import ProgressiveImage from '../ProgressiveImage/ProgressiveImage'

const TopicDetailImage = (props) => {
  const { text, meaning, avatar, pronounceHandler } = props
  return (
    <View style={styles.buttonContainer}>
      <ProgressiveImage
        thumbnailSource={ImagesGame.loadingNormal}
        source={{ uri: avatar }}
        resizeMode={'contain'}
        style={styles.image}
      />
      <View style={styles.textVocabulary}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.meaning}>{meaning}</Text>
      </View>
      <TouchableOpacity onPress={() => pronounceHandler(text)}>
        <AntDesign
          name={'playcircleo'}
          size={Normalize(20)}
          color={'blue'}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dedede'
  },
  image: {
    width: Normalize(60),
    height: Normalize(60)
  },
  textVocabulary: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: Normalize(16),
    fontFamily: 'source-code-pro-bold'
  },
  meaning: {
    fontSize: Normalize(14),
    fontFamily: 'source-code-pro'
  },
})

export default TopicDetailImage