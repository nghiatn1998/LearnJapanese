import React, {useEffect, useState} from 'react'
import {Alert, Keyboard, StyleSheet, View} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Redux
import { useDispatch } from 'react-redux'
import * as authActions from '../../../Store/Actions/Authenticate'

// Components
import {DHeader, DHeaderForm, DRectangleButton, DTextInput, Loading} from '../../../Components'

// Functions
import { isEmail, isValidPassword, isEmpty, isValidateFullName } from '../../../Functions/validatorFunctions'

// Navigation Actions
import { resetTo } from '../../../Navigation/NavigationActions'

// Style
import { Colors, Metrics } from '../../../Themes'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.ghostWhite
  },
  contentContainerStyle: {
    paddingHorizontal: Metrics.spaceMarginFeed,
    flexGrow: 1
  },
  buttonBottomPositionStyle: {
    position: 'absolute',
    left: Metrics.spaceMarginFeed * 2,
    right: Metrics.spaceMarginFeed * 2,
    bottom: Metrics.spaceMarginFeed * 2 + Metrics.smallMargin
  },
  textInputContainer: {
    marginBottom: Metrics.doubleBaseMargin
  }
})

const SignUpEmailScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState({})
  const [errorResponse, setErrorResponse] = useState(null)

  const goBack = () => navigation.goBack(null)
  const refEmail = React.createRef()
  const refPassword = React.createRef()

  const focusEmail = () => refEmail.current.focus()
  const focusPassword = () => refPassword.current.focus()

  const onChangeTextUserName = (userName) => {
    error.errorFullName = null
    setUserName(userName)
  }
  const onChangeTextEmail = (email) => {
    error.errorEmail = null
    setEmail(email.replace(/\s/g, ''))
  }
  const onChangeTextPassword = (password) => {
    error.errorPassword = null
    setPassword(password.replace(/\s/g, ''))
  }

  useEffect(() => {
    if (errorResponse) {
      Alert.alert('Email or password went wrong!', errorResponse, [{text: 'Okay'}])
    }
  }, [errorResponse])

  const onPressNext = async () => {
    Keyboard.dismiss()
    const errorFullName = isEmpty(username, 'User name not empty')
    const errorEmail = isEmpty(email, 'Email not empty')
    const errorPassword = isEmpty(password, 'Password not empty')
    setError({
      errorFullName,
      errorEmail,
      errorPassword
    })
    setErrorResponse(null)
    if (!errorFullName && !errorEmail && !errorPassword && !isValidateFullName(username) && !isEmail(email) && !isValidPassword(password)) {
      setIsLoading(true)
      const action = authActions.signUpAndLogin(
        email,
        password,
        username,
        false
      )
      try {
        await dispatch(action)
        props.navigation.dispatch(resetTo('HomeScreen'))
        setIsLoading(false)
      } catch (error) {
        setErrorResponse(error.message || error)
        setIsLoading(false)
      }
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DHeader
        titleLeft={'Sign up'}
        onPressLeft={goBack}
      />
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 25 }}/>
        <DTextInput
          title={'Username'}
          contentContainerStyle={styles.textInputContainer}
          placeholder={'Please type username'}
          returnKeyType={'next'}
          onSubmitEditing={focusEmail}
          value={username}
          blurOnSubmit={false}
          onChangeTextCallback={onChangeTextUserName}
          error={isValidateFullName(username) || error.errorFullName}
        />
        <DTextInput
          ref={refEmail}
          title={'Email'}
          contentContainerStyle={styles.textInputContainer}
          placeholder={'Please type your email'}
          blurOnSubmit={false}
          returnKeyType={'next'}
          keyboardType={'email-address'}
          onSubmitEditing={focusPassword}
          value={email}
          onChangeTextCallback={onChangeTextEmail}
          error={isEmail(email) || error.errorEmail}
        />
        <DTextInput
          ref={refPassword}
          title={'Password'}
          placeholder={'Please type your password'}
          secureTextEntry
          blurOnSubmit={false}
          returnKeyType={'done'}
          onSubmitEditing={onPressNext}
          value={password}
          onChangeTextCallback={onChangeTextPassword}
          error={isValidPassword(password) || error.errorPassword}
        />
        <DRectangleButton
          title={'Done'}
          buttonStyle={styles.buttonBottomPositionStyle}
          onPress={onPressNext}
        />
      </KeyboardAwareScrollView>
      {isLoading && <Loading/>}
    </SafeAreaView>
  )
}

export default SignUpEmailScreen
