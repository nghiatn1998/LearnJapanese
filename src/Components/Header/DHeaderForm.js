import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Styles
import { Metrics, Normalize, Colors } from '../../Themes'
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Metrics.spaceMargin
  },
  title: {
    fontFamily: 'source-code-pro',
    fontWeight: 'bold',
    fontSize: Normalize(12),
    color: Colors.madison
  },
  line: {
    flex: 1,
    marginLeft: Metrics.spaceMargin,
    backgroundColor: Colors.spindleRGBA,
    height: 1
  }
})

const DHeaderForm = ({ title, style }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title} numberOfLines={1}>{title.toUpperCase()}</Text>
      <View style={styles.line} />
    </View>
  )
}

DHeaderForm.propTypes = {
  title: PropTypes.string
}

export default DHeaderForm
