import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { ifIphoneX } from 'react-native-iphone-x-helper'

// Styles
import { ImagesStudy, Metrics, Normalize, Colors } from '../../Themes'

const styles = StyleSheet.create({
  wrapHeader: {
    flexDirection: 'row',
    height: Metrics.heightHeader,
    alignItems: 'center',
    backgroundColor: '#000068',
    ...ifIphoneX({}, {
      marginTop: Metrics.baseMargin
    })
  },
  wrapLeftButton: {
    padding: Metrics.spaceMargin,
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
    marginRight: Metrics.spaceMargin,
    tintColor: 'white'
  },
  iconRight: {
    width: Normalize(15),
    height: Normalize(16),
    marginRight: Metrics.spaceMargin
  },
  textLeft: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    fontWeight: '600',
    color: 'white'
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

const DHeader = ({ isBackIcon = true, uriImage, titleLeft, titleRight, onPressLeft, onPressRight, iconRight }) => {
  return (
    <View style={styles.wrapHeader}>
      <TouchableOpacity style={styles.wrapLeftButton} onPress={onPressLeft}>
        {
          isBackIcon &&
          <Image
            style={styles.iconBack}
            source={ImagesStudy.back}
            resizeMode={'contain'}
          />
        }
        {
          uriImage &&
          <Image
            style={styles.image}
            source={{ uri: uriImage }}
          />
        }
        {
          titleLeft &&
          <Text style={styles.textLeft} numberOfLines={1}>{titleLeft.toUpperCase()}</Text>
        }
      </TouchableOpacity>
      <View style={styles.spaceView} />
      <TouchableOpacity style={styles.wrapRightButton} onPress={onPressRight}>
        {
          titleRight &&
          <Text style={styles.textRight} numberOfLines={1}>{titleRight.toUpperCase()}</Text>
        }
        {
          iconRight &&
          <Image
            style={styles.iconRight}
            source={iconRight}
            resizeMode={'contain'}
          />
        }
      </TouchableOpacity>
    </View>
  )
}

DHeader.propTypes = {
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  titleLeft: PropTypes.string,
  titleRight: PropTypes.string,
  isBackIcon: PropTypes.bool
}

export default DHeader
