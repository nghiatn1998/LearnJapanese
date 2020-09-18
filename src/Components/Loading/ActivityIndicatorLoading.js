import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const ActivityIndicatorLoading = (props) => {
  const { stylesContainer } = props
  return (
    <View style={[styles.mainContainer, stylesContainer]}>
      <ActivityIndicator color={'black'} size={'large'} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default ActivityIndicatorLoading