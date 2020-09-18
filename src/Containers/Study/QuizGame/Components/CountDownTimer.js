import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import {Normalize} from '../../../../Themes'
import CountdownCircle from 'react-native-countdown-circle'

const CountDownTimer = (props) => {
  const {timer, updateText, onPressNextQuestion} = props

  return (
    <View style={styles.headerContainer}>
      <View style={styles.timeContainer}>
        <CountdownCircle
          seconds={timer}
          radius={30}
          borderWidth={8}
          color="#ff003f"
          bgColor="#fff"
          updateText={updateText}
          textStyle={styles.timerText}
          onTimeElapsed={onPressNextQuestion}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#860502'
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  timeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  shieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  timerText: {
    fontSize: 20,
    fontFamily: 'source-code-pro'
  }
})

export default CountDownTimer
