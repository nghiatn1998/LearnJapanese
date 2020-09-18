import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

// Style
import {Normalize} from '../../Themes'

const HeaderBack = (props) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={() => {
        props.navigation.navigate('AuthenticateScreen')
      }} style={styles.buttonContainer}>
        <AntDesign name="arrowleft" size={Normalize(24)} color="green"/>
      </TouchableOpacity>
      <View style={styles.spacingContainer}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 15,
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    flex: 1
  },
  spacingContainer: {
    flex: 6
  }
})

export default HeaderBack