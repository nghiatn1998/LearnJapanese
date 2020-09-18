import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import {Animated} from 'react-native'
import {ImagesStudy} from '../../Themes'

// Styles
import {Metrics} from '../../Themes'

// Custom hook
import {useDidUpdate} from '../../Functions/customHook'

const LoginSuccess = (props) => {
  const [top] = useState(new Animated.Value(0))
  const [opacity] = useState(new Animated.Value(0))

  useEffect(() => {
   this.animation.play();
  }, [])

  useDidUpdate(() => {
    if (props.isActive) {
      Animated.timing(top, {toValue: 0, duration: 0}).start()
      Animated.timing(opacity, {toValue: 1}).start()

      this.animation.play()
    } else {
      Animated.timing(top, {
        toValue: Metrics.screenHeight,
        duration: 0
      }).start()
      Animated.timing(opacity, {toValue: 0}).start()

      this.animation.loop = false
    }
  })

  return (
    <AnimatedContainer
      style={{top: top, opacity: opacity}}
    >
      <LottieView
        source={ImagesStudy.animationCheckDone}
        autoPlay={false}
        loop={false}
        ref={animation => {
          this.animation = animation
        }}
      />
    </AnimatedContainer>
  )
}

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

export default LoginSuccess