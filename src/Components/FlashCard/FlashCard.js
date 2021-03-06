import React, {useState} from 'react'
import styled from 'styled-components'
import {
  Animated,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'

// Actions
import * as displayActions from '../../Store/Actions/Display'

// Styles
import {Metrics} from '../../Themes'

const tabBarHeight = 83

const FlashCard = (props) => {
  const [cardWidth, setCardWidth] = useState(new Animated.Value(315))
  const [cardHeight, setCardHeight] = useState(new Animated.Value(460))
  const [titleTop, setTitleTop] = useState(new Animated.Value(20))
  const [opacity, setOpacity] = useState(new Animated.Value(0))
  const [textHeight, setTextHeight] = useState(new Animated.Value(100))
  const dispatch = useDispatch()

  const openCard = () => {
    if (!props.canOpen) return

    Animated.spring(cardWidth, {toValue: Metrics.screenWidth}).start()
    Animated.spring(cardHeight, {
      toValue: Metrics.screenHeight - tabBarHeight
    }).start()
    Animated.spring(titleTop, {toValue: 40}).start()
    Animated.timing(opacity, {toValue: 1}).start()
    Animated.spring(textHeight, {toValue: 1000}).start()

    StatusBar.setHidden(true)
    dispatch(displayActions.openCard())
  }

  const closeCard = () => {
    Animated.spring(cardWidth, {toValue: 315}).start()
    Animated.spring(cardHeight, {
      toValue: 460
    }).start()
    Animated.spring(titleTop, {toValue: 20}).start()
    Animated.timing(opacity, {toValue: 0}).start()
    Animated.spring(textHeight, {toValue: 100}).start()

    StatusBar.setHidden(false)
    dispatch(displayActions.closeCard())
  }

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer
        style={{width: cardWidth, height: cardHeight}}
      >
        <Cover>
          <Image source={props.image}/>
          <AnimatedTitle style={{top: titleTop}}>
            {props.title}
          </AnimatedTitle>
          <Author>by {props.author}</Author>
        </Cover>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
            <AnimatedText style={{ height: textHeight }}>
              {props.text}
            </AnimatedText>
          </ScrollView>
        </View>
        <AnimatedLinearGradient
          colors={['rgba(255,255,255, 0)', 'rgba(255,255,255, 1)']}
          style={{
            position: 'absolute',
            top: 330,
            width: '100%',
            height: textHeight
          }}
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 20, right: 20}}
          onPress={closeCard}
        >
          <AnimatedCloseView style={{opacity: opacity}}>
            <Ionicons name="ios-close" size={32} color="#546bfb"/>
          </AnimatedCloseView>
        </TouchableOpacity>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  )
}

export default FlashCard

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient)

const CloseView = styled.View`
  width: 32px;
  height: 32px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView)

const Container = styled.View`
  width: 315px;
  height: 460px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`

const Image = styled.Image`
  width: 100%;
  height: 290px;
`

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`

const AnimatedTitle = Animated.createAnimatedComponent(Title)

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`

const AnimatedText = Animated.createAnimatedComponent(Text)
