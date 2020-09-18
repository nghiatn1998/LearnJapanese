import React from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Style
import { Metrics, Normalize, Colors } from '../../Themes'
const styles = StyleSheet.create({
  wrapButton: {
    backgroundColor: Colors.wildWatermelon,
    paddingHorizontal: Normalize(Metrics.doubleBaseMargin),
    paddingVertical: Normalize(Metrics.spaceMargin),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrics.spaceMargin * 3
  },
  title: {
    fontSize: Normalize(12),
    color: Colors.white,
    fontFamily: 'source-code-pro-bold'
  },
  flexRow: {
    flexDirection: 'row'
  }
})

const DRoundedButton = (props) => {
  const {
    icon, title, iconStyle,
    onPress, children, buttonStyle,
    iconContainerStyle, textStyle
  } = props

  return (
    <TouchableOpacity
      style={[styles.wrapButton, buttonStyle]}
      onPress={onPress}
    >
      <View style={[styles.flexRow, iconContainerStyle]}>
        {
          icon &&
          <Image
            style={iconStyle}
            source={icon}
            resizeMode={'contain'}
          />
        }
        {
          title &&
          <Text style={[styles.title, textStyle]} numberOfLines={1}>{title.toUpperCase()}</Text>
        }
      </View>
      { children }
    </TouchableOpacity>
  )
}

DRoundedButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  iconContainerStyle: PropTypes.object
}

export default DRoundedButton
