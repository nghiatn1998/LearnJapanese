import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

// Component
import SocialSignUpForm from './SocialSignUpForm'
import SignUpForm from './SignUpForm'

const AuthenticateSignUpForm = (props) => {
  const {
    title, signUpWithGoogle, signUpWithFacebook,
    isLoading, inputChangeHandler, signUpHandler, formState
  } = props
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.spacingContainer}/>
      <SocialSignUpForm
        signUpWithGoogle={signUpWithGoogle}
        signUpWithFacebook={signUpWithFacebook}
      />
      <SignUpForm
        isLoading={isLoading}
        formState={formState}
        inputChangeHandler={inputChangeHandler}
        signUpHandler={signUpHandler}
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

export default AuthenticateSignUpForm