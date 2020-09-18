import React, { useState } from 'react'
import styled from 'styled-components'
import {
  ScrollView,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'

// Action Type
import * as actionTypes from '../../Store/ActionTypes'

// Actions
import * as displayActions from '../../Store/Actions/Display'

// Custom Hook
import { useDidUpdate } from '../../Functions/customHook'

let screenWidth = Dimensions.get('window').width
let cardWith = screenWidth - 40
if (screenWidth > 500) {
  cardWith = 460
}

const items = [
  {
    logo: 'https://cl.ly/5c470805a500/download/logo-invision.png',
    title: '一生懸命練.',
    text: 'Học phần mới vừa được cập nhật',
    date: '23 Jan'
  },
  {
    logo: 'https://cl.ly/5c470805a500/download/logo-invision.png',
    title: 'わたしは元気です',
    text:
      'わたしは元気です。ありがとう',
    date: '27 Nov'
  },
  {
    logo: 'https://cl.ly/5c470805a500/download/logo-invision.png',
    title: 'どういたしましてく\t',
    text: 'どういたしましてく\t',
    date: '26 SEP'
  },
  {
    logo: 'https://cl.ly/5c470805a500/download/logo-invision.png',
    title: 'いつか日本を訪れたい\t',
    text: 'あけましておめでとうございます\t',
    date: '4 SEP'
  }
]

const Notification = () => {
  const [translateY] = useState(new Animated.Value(30))
  const [opacity] = useState(new Animated.Value(0))
  const [top] = useState(new Animated.Value(3000))
  const dispatch = useDispatch()

  const action = useSelector(state => state.display.action)

  useDidUpdate(() => {
    toggleNotification()
  })

  const toggleNotification = () => {
    if (action === actionTypes.OPEN_NOTIFICATION) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500
        }),
        Animated.timing(top, {
          toValue: 0,
          duration: 0
        })
      ]).start()
    }

    if (action === actionTypes.CLOSE_NOTIFICATION) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 30
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500
        }),
        Animated.timing(top, {
          toValue: 3000,
          duration: 0
        })
      ]).start()
    }
  }
  return (
    <AnimatedContainer style={{ top: top }}>
      <TouchableOpacity
        onPress={() => dispatch(displayActions.closeNotification())}
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          marginLeft: -22,
          zIndex: 100
        }}
      >
        <CloseButton style={{elevation: 20}}>
          <Ionicons name="ios-close" size={44} color="#546bfb"/>
        </CloseButton>
      </TouchableOpacity>
      <SafeAreaView>
        <ScrollView style={{padding: 20}}>
          <Wrapper>
            <Subtitle>New</Subtitle>
            {items.map((item, index) => (
              <AnimatedItem
                key={index}
                style={{
                  opacity: opacity,
                  transform: [{translateY: translateY}]
                }}
              >
                <Header>
                  <Logo source={{uri: item.logo}} resizeMode="contain"/>
                  <Title>{item.title}</Title>
                  <DateContainer>
                    <Date>{item.date}</Date>
                  </DateContainer>
                </Header>
                <Text>{item.text}</Text>
              </AnimatedItem>
            ))}
          </Wrapper>
        </ScrollView>
      </SafeAreaView>
    </AnimatedContainer>
  )
}

export default Notification

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #f0f3f5;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`

const Wrapper = styled.View`
  align-self: center;
  width: ${cardWith};
  padding-top: 50px;
`

const Subtitle = styled.Text`
  font-size: 15;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
`

const Item = styled.View`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
`

const AnimatedItem = Animated.createAnimatedComponent(Item)

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`

const DateContainer = styled.View`
  background: #4775f2;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
`

const Date = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`

const Title = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  margin-left: 8px;
`

const Text = styled.Text`
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  line-height: 24px;
`

