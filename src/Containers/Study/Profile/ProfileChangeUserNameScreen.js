import React, {useCallback, useEffect, useState} from 'react'
import {Alert} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {useDispatch} from 'react-redux'

// Components
import {TextInputIcon, HeaderButtonText} from '../../../Components'

// Actions
import * as userActions from '../../../Store/Actions/User'

const ProfileChangeUserNameScreen = (props) => {
  const [userName, setUserName] = useState('')
  const [error, setError] = useState(null)
  const inputHandler = (newValue) => setUserName(newValue)
  const dispatch = useDispatch()

  const onSetUserName = useCallback(async () => {
    setError(null)
    try {
      await dispatch(userActions.changeUserName(userName))
      props.navigation.pop()
    } catch (error) {
      setError(error.message || error)
    }
  }, [userName])

  useEffect(() => {
    props.navigation.setParams({
      onSetUserName: onSetUserName
    })
  }, [onSetUserName])

  useEffect(() => {
    if (error) {
      Alert.alert(error.message, [{text: 'Okay'}])
    }
  }, [error])

  return (
    <SafeAreaView style={{flex: 1}}>
      <TextInputIcon
        initialValue={userName}
        inputHandler={inputHandler}
        onPress={() => setUserName('')}
      />
    </SafeAreaView>
  )
}

ProfileChangeUserNameScreen.navigationOptions = (navigationData) => {
  const onSetUserName = navigationData.navigation.getParam('onSetUserName')
  return {
    headerTitle: 'Đổi tên người dùng',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerLeft: (
      <HeaderButtonText title={'Huỷ'} onPress={() => navigationData.navigation.pop()}/>
    ),
    headerRight: (
      <HeaderButtonText title={'Xong'} onPress={onSetUserName}/>
    )
  }
}

export default ProfileChangeUserNameScreen
