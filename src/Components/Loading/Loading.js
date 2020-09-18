import React from 'react'
import {View, StyleSheet} from 'react-native'
import {MaterialIndicator} from 'react-native-indicators'

// Style
import {Normalize} from '../../Themes'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <MaterialIndicator color={'black'} size={Normalize(40)}/>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default Loading
