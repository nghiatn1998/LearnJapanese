import React, {useState, useCallback, useReducer, useEffect} from 'react'
import {
  Alert,
  AsyncStorage,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import {useDispatch} from 'react-redux'

// Components
import {DismissKeyboard, AnimationLottie, HeaderBack, AuthenticateSignInForm} from '../../../Components'

// Actions
import * as authActions from '../../../Store/Actions/Authenticate'

// Styles
import { ImagesStudy } from '../../../Themes'

// Functions
import {alertError} from '../../../Functions/alertFunction'
import {authenticateFacebook} from '../../../Functions/facebookFunction'
import {authenticateGoogle} from '../../../Functions/googleFunction'
import {formReducer} from '../../../Functions/inputFunction'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const SignInScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      username: '',
      password: ''
    },
    inputValidities: {
      username: false,
      password: false
    },
    formIsValid: false
  })

  useEffect(() => {
    if (error) {
      Alert.alert('Username or password went wrong!', error, [{text: 'Okay'}])
    }
  }, [error])

  const signInHandler = async () => {
    setError(null)
    setIsLoading(true)
    const action = authActions.login(formState.inputValues.username, formState.inputValues.password)
    try {
      await dispatch(action)
      props.navigation.navigate('HomeScreen')
      setIsLoading(false)
    } catch (error) {
      setError(error.message || error)
      setIsLoading(false)
    }
  }

  const signInWithFacebook = () => {
     authenticateFacebook((error, response) => {
      if (error) {
        alertError(null, error.message)
      }
      if (response && !response.isCancelled) {
        const userInformation = {
          id: response.id,
          email: 'nghia.trungnguyen1998@gmail.com',
          username: response.name,
          name: response.name,
          avatar: response.picture.data.url
        }
        dispatch(authActions.loginFacebook(userInformation))
        // dispatch(authActions.authenticate(userInformation.id, response.token, userInformation))
        props.navigation.navigate('HomeScreen')
      }
    }).then(() => () => {})
  }

  const signInWithGoogle = async () => {
    await authenticateGoogle((error, result) => {
      if (error) {
        alertError(null, error.message)
      }
      if (result && !result.isCancelled) {
        const {user} = result
        const userInformation = {
          email: user.email,
          username: user.name,
          name: user.name,
          avatar: user.photoUrl
        }
        AsyncStorage.setItem('userInformation', JSON.stringify({userId: user.id, token: user.idToken}))
        dispatch(authActions.authenticate(user.id, user.idToken, userInformation))
        props.navigation.navigate('HomeScreen')
      }
    })
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
        <AuthenticateSignInForm
          title={'ĐĂNG NHẬP NHANH BẰNG'}
          formState={formState}
          isLoading={isLoading}
          inputChangeHandler={inputChangeHandler}
          signInHandler={signInHandler}
          signInWithGoogle={signInWithGoogle}
          signInWithFacebook={signInWithFacebook}
        />
      </DismissKeyboard>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})

export default SignInScreen
