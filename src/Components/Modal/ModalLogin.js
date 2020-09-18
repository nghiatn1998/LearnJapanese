import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {BlurView} from 'expo-blur'
import {useDispatch, useSelector} from 'react-redux'
import LoginSuccess from './LoginSuccess'
import LoadingAnimation from './LoadingAnimation'
import {Alert, Animated} from 'react-native'

// Action Type
import * as actionTypes from '../../Store/ActionTypes'

// Actions
import * as displayActions from '../../Store/Actions/Display'

// Navigation Actions
import { resetTo } from '../../Navigation/NavigationActions'

// Styles
import {Metrics, ImagesStudy} from '../../Themes'

// Functions
import { useDidUpdate } from '../../Functions/customHook'
import { isValidEmail, isValidPassword } from '../../Utils/validator'
import * as authActions from '../../Store/Actions/Authenticate'
import {alertError} from '../../Functions/alertFunction'
import {AnimationLottie} from '../index'

const ModalLogin = ({ navigation }) => {
  const { fetchingUserInformation, fetchingUserInformationSuccess, errorFetchingUserInformation} = useSelector(state => ({
    fetchingUserInformation: state.authenticate.fetchingUserInformation,
    fetchingUserInformationSuccess: state.authenticate.fetchingUserInformationSuccess,
    errorFetchingUserInformation: state.authenticate.errorFetchingUserInformation
  }));
  const [email, setEmail] = useState('')
  const [emailValidated, setEmailValidated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordValidated, setPasswordValidated] = useState(false)
  const [iconEmail, setIconEmail] = useState(ImagesStudy.iconEmail)
  const [iconPassword, setIconPassword] = useState(ImagesStudy.iconPassword)
  const [error, setError] = useState(null)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [top] = useState(new Animated.Value(Metrics.screenHeight))
  const [scale] = useState(new Animated.Value(1.3))
  const [translateY] = useState(new Animated.Value(0))

  const action = useSelector(state => state.display.action)

  const dispatch = useDispatch()

  useDidUpdate(() => {
    if (action === actionTypes.OPEN_LOGIN) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0
      }).start()
      Animated.spring(scale, {toValue: 1}).start()
      Animated.timing(translateY, {
        toValue: 0,
        duration: 0
      }).start()
    }

    if (action === actionTypes.CLOSE_LOGIN) {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: Metrics.screenHeight,
          duration: 0
        }).start()
        Animated.spring(scale, {toValue: 1.3}).start()
      }, 500)

      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500
      }).start()
    }
  })

  const onPressSignIn = async () => {
    Keyboard.dismiss()
    try {
      const action = authActions.login(email, password)
      await dispatch(action)
      setTimeout(() => {
        dispatch(displayActions.closeLogin())
      }, 300)
      navigation.dispatch(resetTo('Study'))
    } catch (error) {
      setError(error.message || error)
    }
  }

  const handleLoginController = async () => {
    Keyboard.dismiss()
    const action = authActions.login(email, password)
    await dispatch(action)
    setTimeout(() => {
      dispatch(displayActions.closeLogin())
    }, 300)
  }

  useEffect(() => {
    if (!fetchingUserInformation && errorFetchingUserInformation) {
      alertError(null, errorFetchingUserInformation)
    }
  }, [fetchingUserInformation, errorFetchingUserInformation])

  const focusEmail = () => {
    setIconEmail(ImagesStudy.iconEmailAnimated)
    setIconPassword(ImagesStudy.iconPassword)
  }

  const focusPassword = () => {
    setIconEmail(ImagesStudy.iconEmail)
    setIconPassword(ImagesStudy.iconPasswordAnimated)
  }

  const tapBackground = () => {
    Keyboard.dismiss()
    dispatch(displayActions.closeLogin())
  }

  const onChangeEmail = email => {
    setEmail(email)
  }

  const onChangePassword = password => {
    setPassword(password)
  }

  // useEffect(() => {
  //  !isValidEmail(email) ? setEmailValidated(false) : setEmailValidated(true)
  //  !isValidPassword(password) ? setPasswordValidated(false) : setPasswordValidated(true)
  // }, [email, password])

  return (
    <AnimatedContainer style={{top: top}}>
      <TouchableWithoutFeedback onPress={() => tapBackground()}>
        <BlurView
          tint="default"
          intensity={100}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%'
          }}
        />
      </TouchableWithoutFeedback>
      <AnimatedModal
        style={{
          transform: [
            {scale: scale},
            {translateY: translateY}
          ]
        }}
      >
        <Logo source={ImagesStudy.logoJapanese}/>
        <Text>Đăng nhập để được học nhiều hơn</Text>
        <TextInput
          autoCapitalize={'none'}
          onChangeText={onChangeEmail}
          placeholder="Email"
          keyboardType="email-address"
          onFocus={focusEmail}
        />
        <TextInput
          autoCapitalize={'none'}
          onChangeText={onChangePassword}
          placeholder="********"
          secureTextEntry={true}
          onFocus={focusPassword}
        />
        <IconEmail source={iconEmail}/>
        <IconPassword source={iconPassword}/>
        <TouchableOpacity onPress={onPressSignIn}>
          <Button>
            <ButtonText>Log In</ButtonText>
          </Button>
        </TouchableOpacity>
      </AnimatedModal>
      {
        fetchingUserInformationSuccess &&
        <AnimationLottie
          source={ImagesStudy.animationCheckDone}
          style={styles.animation}
          stylesContainer={styles.animationContainer}
        />
      }
      {/*<LoginSuccess isActive={fetchingUserInformationSuccess} />*/}
      <LoadingAnimation isActive={fetchingUserInformation} />
    </AnimatedContainer>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  animation: {
    width: '100%',
    height: '100%'
  },
})

export default ModalLogin

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  justify-content: center;
  align-items: center;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Modal = styled.View`
  width: 335px;
  height: 370px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  align-items: center;
`
const AnimatedModal = Animated.createAnimatedComponent(Modal)

const Logo = styled.Image`
  width: 44px;
  height: 44px;
  margin-top: 50px;
`

const Text = styled.Text`
  margin-top: 20px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  width: 160px;
  text-align: center;
  color: #b8bece;
`

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 295px;
  height: 44px;
  border-radius: 10px;
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  padding-left: 44px;
`

const Button = styled.View`
  background: #5263ff;
  width: 295px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px #c2cbff;
  margin-top: 20px;
`

const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
`

const IconEmail = styled.Image`
  width: 24px;
  height: 16px;
  position: absolute;
  top: 179px;
  left: 31px;
`

const IconPassword = styled.Image`
  width: 18px;
  height: 24px;
  position: absolute;
  top: 239px;
  left: 35px;
`
