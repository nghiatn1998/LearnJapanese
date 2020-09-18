import React, {useEffect} from 'react'
import styled from 'styled-components'
import {
  TouchableOpacity,
  StatusBar,
  ScrollView
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {PlayIcon} from '../../../Components/Icons/Icons'

const SectionScreen = (props) => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true)

    return () => {
      StatusBar.setBarStyle('dark-content', true)
    }
  }, [])

  const {navigation} = props
  const section = navigation.getParam('section')

  return (
    <ScrollView>
      <Container>
        <StatusBar hidden/>
        <Cover>
          <Image source={{uri: section.avatar}}/>
          <PlayWrapper>
            <TouchableOpacity
              underlayColor="transparent"
              onPress={() => {
                props.navigation.navigate('Video', {
                  video: section.video
                })
              }}
            >
              <PlayView>
                <PlayIcon style={{marginLeft: -10}}/>
              </PlayView>
            </TouchableOpacity>
          </PlayWrapper>
          <Wrapper>
            <Logo source={section.logo}/>
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack()
          }}
          style={{position: 'absolute', top: 20, right: 20}}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={36}
              color="#4775f2"
              style={{marginTop: -2}}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
        </Content>
      </Container>
    </ScrollView>
  )

}

SectionScreen.navigationOptions = {
  header: null
}

export default SectionScreen

const Content = styled.View`
  height: 1000px;
  padding: 20px;
`

const Container = styled.View`
  flex: 1;
`

const Cover = styled.View`
  height: 375px;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`

const Title = styled.Text`
  font-size: 24px;
  color: white;
  font-weight: bold;
  width: 170px;
  position: absolute;
  top: 78px;
  left: 20px;
`

const Caption = styled.Text`
  color: white;
  font-size: 17px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
`

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
`

const Wrapper = styled.View`
  flex-direction: row;
  position: absolute;
  top: 40px;
  left: 20px;
  align-items: center;
`

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 5px;
  text-transform: uppercase;
`

const PlayWrapper = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -40px;
  margin-left: -40px;
`

const PlayView = styled.View`
  width: 80px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 40px;
  justify-content: center;
  align-items: center;
`
