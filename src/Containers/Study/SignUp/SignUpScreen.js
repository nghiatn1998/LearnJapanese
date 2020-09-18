import React, {useState} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-navigation'

// Config
// import AppConfig from '../../Config/AppConfig'

// Components
import {DLogo, ModalLogin} from '../../../Components'
import DSignUpButton from './Components/DSignUpButton'
import * as displayActions from '../../../Store/Actions/Display'

// Redux
import { useDispatch } from 'react-redux'

// Functions
import { authenticateFacebook } from '../../../Functions/facebookFunction'
import * as Facebook from 'expo-facebook'
import * as authActions from '../../../Store/Actions/Authenticate'
import {resetTo} from '../../../Navigation/NavigationActions'

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch()

  const [error, setError] = useState()

  const onPressSignUp = () => navigation.navigate('SignUpEmailScreen')
  const onPressSignIn = () => {
    dispatch(displayActions.openLogin())
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
        props.navigation.dispatch(resetTo('Study'))
      } else {
        // Not Accept Login Facebook
      }
    } catch (error) {
      setError(error.message || error)
    }
  }

  const onPressConnectFB = () => {
    authenticateFacebook((error, response) => {
      if (error) {
        // console.log(error);
      } else if (response) {
        // console.log(response);
        // dispatch(AuthActions.signUpFacebookRequest(data))
      }
    })
  }
  const onPressTermsAndConditions = () => {}
  const onPressPrivacyPolicy = () => {}

  return (
    <>
    <SafeAreaView style={styles.mainContainer}>
      <DLogo />
      <DSignUpButton
        onPressSignIn={onPressSignIn}
        onPressSignUp={onPressSignUp}
        onPressConnectFB={signUpWithFacebook}
        onPressTermsAndConditions={onPressTermsAndConditions}
        onPressPrivacyPolicy={onPressPrivacyPolicy}
      />
    </SafeAreaView>
    <ModalLogin navigation={navigation}/>
    </>
  )
}

export default SignUpScreen
