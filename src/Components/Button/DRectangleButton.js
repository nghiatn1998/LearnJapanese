import React from 'react'
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Style
import { Colors, Normalize, Metrics } from '../../Themes'
const styles = StyleSheet.create({
  wrapButton: {
    backgroundColor: Colors.windsor,
    paddingVertical: Normalize(Metrics.spaceMargin),
    borderRadius: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapIconContainer: {
    flexDirection: 'row'
  },
  title: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
    color: Colors.white,
    textAlign: 'center'
  }
})

const DRectangleButton = (props) => {
  const {
    icon, title, onPress, children, buttonStyle,
    wrapIconContainerStyle, textStyle, iconStyle
  } = props

  return (
    <TouchableOpacity
      style={[styles.wrapButton, buttonStyle]}
      onPress={onPress}
    >
      <View style={[styles.wrapIconContainer, wrapIconContainerStyle]}>
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
          <Text style={[styles.title, textStyle]} numberOfLines={1}>
            {title.toUpperCase()}
          </Text>
        }
      </View>
      { children }
    </TouchableOpacity>
  )
}

DRectangleButton.propTypes = {
  title: PropTypes.string,
  buttonStyle: PropTypes.any,
  onPress: PropTypes.func,
  wrapIconContainerStyle: PropTypes.object,
  textStyle: PropTypes.object,
  iconStyle: PropTypes.object
}

export default DRectangleButton
