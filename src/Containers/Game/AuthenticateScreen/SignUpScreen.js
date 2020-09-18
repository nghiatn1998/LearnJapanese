import React, {useState, useCallback, useReducer, useEffect} from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Alert,
  AsyncStorage
} from 'react-native'
import {useDispatch} from 'react-redux'

// Components
import {DismissKeyboard, HeaderBack, AuthenticateSignUpForm, Loading} from '../../../Components'

// Actions
import * as authActions from '../../../Store/Actions/Authenticate'
import * as Facebook from 'expo-facebook'
import * as Google from 'expo-google-app-auth'

// Functions
import { formReducer } from '../../../Functions/inputFunction'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const SignUpScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      username: ''
    },
    inputValidities: {
      email: false,
      password: false,
      username: false
    },
    formIsValid: false
  })

  useEffect(() => {
    if (error) {
      Alert.alert('Email or password went wrong!', error, [{text: 'Okay'}])
    }
  }, [error])

  const signUpHandler = async () => {
    setError(null)
    setIsLoading(true)
    const action = authActions.signup(
      formState.inputValues.email,
      formState.inputValues.password,
      formState.inputValues.username,
      false
    )
    try {
      await dispatch(action)
      props.navigation.navigate('SignInScreen')
      setIsLoading(false)
    } catch (error) {
      setError(error.message || error)
      setIsLoading(false)
    }
  }

  const signUpWithFacebook = async () => {
    setError(null)
    try {
      const {
        type,
        token
        // expires,
        // permissions,
        // declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync('959670457736521', {
        permissions: ['public_profile']
      })

      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture.type(large)`)
        const responseData = await response.json()
        const userInformation = {
          id: responseData.id,
          email: 'Sign-up with facebook',
          username: responseData.name,
          name: responseData.name,
          avatar: responseData.picture.data.url
        }
        await AsyncStorage.setItem('userInformation', JSON.stringify({userId: userInformation.id, token: token}))
        await dispatch(authActions.authenticate(userInformation.id, token, userInformation))
        props.navigation.navigate('HomeScreen')
      } else {
        // Not Accept Login Facebook
      }
    } catch (error) {
      setError(error.message || error)
    }
  }

  const signUpWithGoogle = async () => {
    setError(null)
    try {
      const result = await Google.logInAsync({
        iosClientId: '854026862311-vg3m6nr5vcblgao68gaoi5j4oc3pohj2.apps.googleusercontent.com',
        androidClientId: '854026862311-2o6o4cd469rcoplpfj8epkhlovs0q9ud.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const {user} = result
        const userInformation = {
          email: user.email,
          username: user.name,
          name: user.name,
          avatar: user.photoUrl
        }
        AsyncStorage.setItem('userInformation', JSON.stringify({userId: user.id, token: user.idToken}))
        await dispatch(authActions.authenticate(user.id, user.idToken, userInformation))
        props.navigation.navigate('HomeScreen')
      } else {
        // Not Accept Login Gmail
      }
    } catch (error) {
      setError(error.message || error)
    }
  }

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      })
    },
    [dispatchFormState]
  )

  return (
    <SafeAreaView style={styles.mainContainer}>
      <DismissKeyboard>
        <HeaderBack {...props} />
        <AuthenticateSignUpForm
          isLoading={isLoading}
          title={'ĐĂNG KÝ NHANH BẰNG'}
          formState={formState}
          inputChangeHandler={inputChangeHandler}
          signUpHandler={signUpHandler}
          signUpWithGoogle={signUpWithGoogle}
          signUpWithFacebook={signUpWithFacebook}
        />
      </DismissKeyboard>
      {isLoading && <Loading/>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})

export default SignUpScreen
