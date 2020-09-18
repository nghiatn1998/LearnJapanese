import React, {useEffect} from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
} from 'react-native'
import {useDispatch} from 'react-redux'

// Actions
import * as authActions from '../Store/Actions/Authenticate'

const StartupScreen = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      try {
        await dispatch(authActions.startup())
        props.navigation.navigate('Home')
      } catch (error) {
        await AsyncStorage.removeItem('userInformation')
        props.navigation.navigate('Authenticate')
      }
    }
    tryLogin().then(() => {})
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={'black'}/>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default StartupScreen
