import React from 'react'
import styled from 'styled-components'
import {Video} from 'expo-av'
import {Ionicons} from '@expo/vector-icons'
import {TouchableOpacity} from 'react-native'

import {Metrics} from '../../../Themes'

const VideoScreen = (props) => {
  const {navigation} = props
  const video = navigation.getParam('video')
  return (
    <Container>
      <Video
        source={{
          uri: video
        }}
        shouldPlay
        useNativeControls={true}
        resizeMode="cover"
        style={{width: Metrics.screenWidth, height: 210}}
      />
      <CloseView>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack()
          }}
          style={{padding: 20}}
        >
          <Ionicons name="ios-close" size={44} color="white"/>
        </TouchableOpacity>
      </CloseView>
    </Container>
  )
}

VideoScreen.navigationOptions = {
  header: null
}

export default VideoScreen

const Container = styled.View`
  flex: 1;
  background: black;
  align-items: center;
  justify-content: center;
`

const CloseView = styled.View`
  position: absolute;
  top: 0px;
  right: 12px;
`
