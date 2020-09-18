import React from 'react'
import { View, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

// Style
import { Colors } from '../../Themes'

const ImageFast = (props) => {
  const { style } = props
  return (
    <View style={[styles.bgColor, style]}>
      <FastImage
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: Colors.silver
  }
})

export default ImageFast