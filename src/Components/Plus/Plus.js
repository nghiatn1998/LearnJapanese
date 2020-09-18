import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Normalize} from '../../Themes'

const Plus = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.plusContainer}>
        <Text style={styles.plusText}>
          PLUS
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginLeft: 15
  },
  plusContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    marginRight: 20
  },
  plusText: {
    fontFamily: 'open-sans',
    fontSize: Normalize(13),
    color: 'green'
  }
})

export default Plus