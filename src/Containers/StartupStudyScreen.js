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

// Navigation Actions
import { resetTo } from '../Navigation/NavigationActions'

const StartupStudyScreen = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    const tryLoginStudy = async () => {
      try {
        await dispatch(authActions.startup())
        props.navigation.dispatch(resetTo('Study'))
      } catch (error) {
        await AsyncStorage.removeItem('userInformation')
        props.navigation.dispatch(resetTo('Auth'))
      }
    }
    tryLoginStudy().then(() => {})
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

export default StartupStudyScreen
