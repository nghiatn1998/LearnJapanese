import React, {useEffect, useState, useRef} from 'react'
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native'

// Styles
import {ImagesGame, ImagesStudy} from '../../Themes'
import {useDidUpdate} from '../../Functions/customHook'
import {AnimationLottie} from '../index'

const BlockAnswer = (props) => {
  const [clicked, setClicked] = useState(false)
  const {id, image, answerCorrect, numberQuestion} = props
  const prevAnswer = usePrevious({image, answerCorrect, numberQuestion, clicked})

  function usePrevious (value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const onClickHandler = () => {
    setClicked(true)
    if (answerCorrect) {
      setTimeout(() => {
        props.onPress(answerCorrect, id)
      }, 50)
    } else {
      props.onPress(answerCorrect, id)
    }
  }

  useDidUpdate(() => {
    if (prevAnswer.answerCorrect !== answerCorrect || prevAnswer.numberQuestion !== numberQuestion) {
      setClicked(false)
    }
  }, [answerCorrect, numberQuestion])

  return (
    <TouchableOpacity
      disabled={clicked}
      onPress={onClickHandler}
      style={styles.answerBlock}>
      <Image
        resizeMode={'stretch'}
        style={styles.image}
        source={{uri: image}}
      />
      {
        (!answerCorrect && clicked) &&
        <View style={styles.checkContainer}>
          <Image
            resizeMode={'stretch'}
            style={styles.imageError}
            source={ImagesGame.incorrectAnswer}
          />
        </View>
      }
      {
        (answerCorrect && clicked) &&
        <AnimationLottie
          source={ImagesStudy.animationCheckDone}
          style={styles.animation}
          stylesContainer={styles.animationContainer}
        />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  checkContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  answerBlock: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 15
  },
  animationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  animation: {
    width: '100%',
    height: '100%'
  },
  image: {
    flex: 1,
    position: 'relative'
  },
  imageError: {
    height: 100,
    width: 100
  },
  imageSuccess: {
    height: 100,
    width: 100
  }
})

export default BlockAnswer
