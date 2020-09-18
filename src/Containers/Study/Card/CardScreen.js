import React, {useState} from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import styled from 'styled-components'
import { PanResponder, Animated } from 'react-native'
import { DHeader, FlashCard } from '../../../Components'
import { useSelector } from 'react-redux'

// Navigation
import { SafeAreaView } from 'react-navigation'

// Action Type
import * as actionTypes from '../../../Store/ActionTypes'

// Mock
const projects = [
  {
    title: 'Rươụ sake - 日本酒',
    image: require('../../../../assets/sake.jpg'),
    author: 'Liu Yang',
    text:
      'Nhắc tới Nhật Bản, chúng ta chắc ai cũng biết đến loại rượu đặc trưng có từ ngàn xưa của xứ sở Phù Tang phải không nào, đó chính là loại rượu sake. Rượu sake là một loại rượu nhẹ truyền thống nấu từ gạo qua nhiều công đoạn lên men của người Nhật và đi kèm với khá nhiều quy tắc. (日本について言えば、私たちは皆古代のフータンの土地からのユニークなワインを知っていますよね？ 日本酒は、多くの日本の発酵プロセスを経て米から作られた伝統的な軽アルコールであり、かなりのルールがあります。)'
  },
  {
    title: 'Trà đạo - 茶道',
    image: require('../../../../assets/tra-dao.jpg'),
    author: 'Souze Liuz',
    text:
      'Người Nhật quan niệm rằng việc uống và thưởng thức trà đạo giúp họ phát triển giá trị tinh thần của bản thân. (日本人は、茶道を飲んだり楽しんだりすることで、彼らの精神的価値を高めることができると信じています.)'
  },
  {
    title: 'Saikeirie - さいけいりえ',
    image: require('../../../../assets/le-nghi-phong-tuc.jpg'),
    author: 'Nikhil D\'Souza',
    text:
      'Các lễ nghi và phong tục đã đóng góp không nhỏ trong quá trình hình thành nên những nét văn hóa đặc trưng của Nhật Bản đồng thời cũng là cơ sở cho lối sống nề nếp và sự phát triển ổn định của xã hội , từ đó tạo nên một nền văn hóa Nhật mang đậm yếu tố nội sinh (儀式と習慣は日本の文化的特徴の形成に大きく貢献していると同時に、良いライフスタイルと社会の安定した発展の基礎でもあり、それによって創造されています 日本の文化は内生的です)'
  }
]

// Styles
const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -100
  }
})

const getNextIndex = (index) => {
  let nextIndex = index + 1
  if (nextIndex > projects.length - 1) {
    return 0
  }
  return nextIndex
}

const CardScreen = (props) => {
  const [pan] = useState(new Animated.ValueXY())
  const [scale] = useState(new Animated.Value(0.9))
  const [translateY] = useState(new Animated.Value(44))
  const [thirdScale] = useState(new Animated.Value(0.8))
  const [thirdTranslateY] = useState(new Animated.Value(-50))
  const [index, setIndex] = useState(0)
  const [opacity] = useState(new Animated.Value(0))

  const action = useSelector(state => state.display.action)


  this._panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      if (gestureState.dx === 0 && gestureState.dy === 0) {
        return false
      } else {
        return action !== actionTypes.OPEN_CARD
      }
    },

    onPanResponderGrant: () => {
      Animated.spring(scale, {toValue: 1}).start()
      Animated.spring(translateY, {toValue: 0}).start()

      Animated.spring(thirdScale, {toValue: 0.9}).start()
      Animated.spring(thirdTranslateY, {toValue: 44}).start()

      Animated.timing(opacity, {toValue: 1}).start()
    },

    onPanResponderMove: Animated.event([
      null,
      {dx: pan.x, dy: pan.y}
    ]),

    onPanResponderRelease: () => {
      const positionY = pan.y.__getValue()
      Animated.timing(opacity, {toValue: 0}).start()

      if (positionY > 200) {
        Animated.timing(pan, {
          toValue: {x: 0, y: 1000}
        }).start(() => {
          pan.setValue({x: 0, y: 0})
          scale.setValue(0.9)
          translateY.setValue(44)
          thirdScale.setValue(0.8)
          thirdTranslateY.setValue(-50)
          setIndex(getNextIndex(index))
        })
      } else {
        Animated.spring(pan, {
          toValue: {x: 0, y: 0}
        }).start()

        Animated.spring(scale, {toValue: 0.9}).start()
        Animated.spring(translateY, {toValue: 44}).start()

        Animated.spring(thirdScale, {toValue: 0.8}).start()
        Animated.spring(thirdTranslateY, {toValue: -50}).start()
      }
    }
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f3f5' }}>
      <StatusBar barStyle={'dark-content'} />
      <DHeader
        titleLeft={'News'}
        onPressLeft={() => props.navigation.goBack()}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedMask style={{ opacity: opacity }}/>
      <Animated.View
        style={{
          transform: [
            {translateX: pan.x},
            {translateY: pan.y}
          ]
        }}
        {...this._panResponder.panHandlers}
      >
        <FlashCard
          title={projects[index].title}
          image={projects[index].image}
          author={projects[index].author}
          text={projects[index].text}
          canOpen={true}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {scale: scale},
            {translateY: translateY}
          ]
        }}
      >
        <FlashCard
          title={projects[getNextIndex(index)].title}
          image={projects[getNextIndex(index)].image}
          author={projects[getNextIndex(index)].author}
          text={projects[getNextIndex(index)].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -3,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          transform: [
            {scale: thirdScale},
            {translateY: thirdTranslateY}
          ]
        }}
      >
        <FlashCard
          title={projects[getNextIndex(index + 1)].title}
          image={projects[getNextIndex(index + 1)].image}
          author={projects[getNextIndex(index + 1)].author}
          text={projects[getNextIndex(index + 1)].text}
        />
      </Animated.View>
      </View>
    </SafeAreaView>
  )
}

CardScreen.navigationOptions = {
  header: null
}

export default CardScreen

const Mask = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  z-index: -3;
`

const AnimatedMask = Animated.createAnimatedComponent(Mask)

const Container = styled.SafeAreaView`
  flex: 1;
  background: #f0f3f5;
`

const Text = styled.Text``
