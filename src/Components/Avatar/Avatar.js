import React, {useEffect} from 'react'
import styled from 'styled-components'
import {AsyncStorage} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import * as displayActions from '../../Store/Actions/Display'

const Avatar = () => {
  const dispatch = useDispatch()
  const userInformation = useSelector(state => state.authenticate.userInformation)
  const avatar = useSelector(state => state.display.avatar)

  //useEffect(() => {
  //  loadState()
  //}, [])
  //
  //const loadState = () => {
  //  AsyncStorage.getItem('state').then(serializedState => {
  //    const state = JSON.parse(serializedState)
  //
  //    if (state) {
  //      dispatch(displayActions.updateName(state.name))
  //      dispatch(displayActions.updateAvatar(state.avatar))
  //    }
  //  })
  //}

  return <Image source={{uri: userInformation ? userInformation.avatar : 'https://cl.ly/55da82beb939/download/avatar-default.jpg'}}/>
}

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
`

export default Avatar
