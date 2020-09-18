import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'

const AnimationLottie = ({ stylesContainer, source }) => {
  const handle = (isCancelled) => {
    if (!isCancelled) {
      this.animation.play()
    }
  }

  return (
    <View style={stylesContainer}>
      <LottieView
        ref={animation => { this.animation = animation }}
        loop
        autoPlay
        source={source}
        onAnimationFinish={(isCancelled) => handle(isCancelled)}
        {...this.props}
      />
    </View>
  )
}

export default AnimationLottie
