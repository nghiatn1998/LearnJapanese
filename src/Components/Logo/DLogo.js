import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

// Style
import { Normalize, Colors, Metrics, ImagesStudy } from '../../Themes'
const styles = StyleSheet.create({
  content: {
    flex: 3 / 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'SFProText-Regular',
    fontSize: Normalize(17),
    color: Colors.madison,
    textAlign: 'center',
    opacity: 0.5
  },
  logoText: {
    width: Metrics.screenWidth - Metrics.tripleBaseMargin * 2,
    height: Metrics.screenHeight / 2
  }
})

const DLogo = () => {
  return (
    <View style={styles.content}>
      <Image
        style={styles.logoText}
        source={ImagesStudy.iconSunyata}
        resizeMode={'contain'}
      />
    </View>
  )
}

export default DLogo
