import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

// Component
import SocialSignInForm from './SocialSignInForm'
import SignInForm from './SignInForm'

const AuthenticateSignInForm = (props) => {
  const {
    title, signInWithGoogle, signInWithFacebook,
    isLoading, inputChangeHandler, signInHandler, formState
  } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.spacingContainer}/>
      <SocialSignInForm
        signInWithGoogle={signInWithGoogle}
        signInWithFacebook={signInWithFacebook}
      />
      <SignInForm
        isLoading={isLoading}
        inputChangeHandler={inputChangeHandler}
        signInHandler={signInHandler}
        formState={formState}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  spacingContainer: {
    marginVertical: 10
  },
})

export default AuthenticateSignInForm