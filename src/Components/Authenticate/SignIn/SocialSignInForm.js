import React from 'react'
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import {AntDesign, EvilIcons} from '@expo/vector-icons'

// Style
import {Normalize} from '../../../Themes'

const SocialSignInForm = (props) => {
  const {signInWithFacebook, signInWithGoogle} = props
  return (
    <View style={styles.formContainer}>
      <TouchableOpacity onPress={signInWithFacebook} style={styles.facebookContainer}>
        <EvilIcons name="sc-facebook" size={Normalize(30)} color='blue'/>
        <Text style={styles.textFacebook}>Facebook</Text>
      </TouchableOpacity>

      <View style={styles.horizontalContainer}/>

      <TouchableOpacity onPress={signInWithGoogle} style={styles.googleContainer}>
        <AntDesign name="google" size={Normalize(21)} color='red'/>
        <View style={styles.googleHorizontalContainer}/>
        <Text style={styles.textGoogle}>Google</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  facebookContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    padding: 15
  },
  googleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    padding: 15
  },
  googleHorizontalContainer: {
    marginHorizontal: 5
  },
  textFacebook: {
    fontFamily: 'open-sans',
    fontSize: Normalize(14)
  },
  textGoogle: {
    fontFamily: 'open-sans',
    fontSize: Normalize(14)
  },
  horizontalContainer: {
    marginHorizontal: 10
  }
})

export default SocialSignInForm