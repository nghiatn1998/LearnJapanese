import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {Colors, Normalize} from '../../Themes'

const HeaderButtonText = (props) => {
  const { title, onPress } = props
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  buttonText: {
    fontFamily: 'open-sans-bold',
    color: Colors.snow,
    fontSize: Normalize(14)
  }
})

export default HeaderButtonText