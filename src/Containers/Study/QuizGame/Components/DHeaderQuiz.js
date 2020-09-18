import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// Styles
import { ImagesStudy, Metrics, Normalize, Colors } from '../../../../Themes'

const styles = StyleSheet.create({
  wrapHeader: {
    paddingHorizontal: Metrics.spaceMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: '#000068',
    ...ifIphoneX({}, {
      marginTop: Metrics.baseMargin
    }),
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapLeftButton: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  wrapRightButton: {
    padding: Metrics.spaceMargin,
    flexDirection: 'row'
  },
  iconBack: {
    width: Normalize(15),
    height: Normalize(16),
    tintColor: 'white',
    // position: 'absolute',
    //  left: 0
  },
  iconRight: {
    width: Normalize(15),
    height: Normalize(16),
    marginRight: Metrics.spaceMargin
  },
  textLeft: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(24),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  textRight: {
    fontFamily: 'source-code-pro',
    fontWeight: 'bold',
    color: Colors.wildWatermelon
  },
  spaceView: {
    flex: 1
  },
  image: {
    width: Normalize(30),
    height: Normalize(30),
    borderRadius: Normalize(15),
    marginRight: Metrics.baseMargin
  }
})

const DHeaderQuiz = ({ isBackIcon = true, title }) => {
  return (
    <View style={styles.wrapHeader}>
      {title &&
        <View style={{ flex: 1 }}>
          <Text style={styles.textLeft} numberOfLines={1}>{title.toUpperCase()}</Text>
        </View>
      }
    </View>
  )
}

DHeaderQuiz.propTypes = {
  title: PropTypes.string,
}

export default DHeaderQuiz
