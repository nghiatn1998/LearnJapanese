import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import {Normalize} from '../../Themes'
import CountdownCircle from 'react-native-countdown-circle'

const HeaderTopicGame = (props) => {
  const {shield, timer, onPressCloseHandler} = props

  return (
    <View style={styles.headerContainer}>
      <View style={styles.homeContainer}>
        <TouchableOpacity onPress={onPressCloseHandler}>
          <AntDesign
            name={'closecircleo'}
            size={Normalize(24)}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.timeContainer}>
        <CountdownCircle
          seconds={timer}
          radius={30}
          borderWidth={8}
          color="#ff003f"
          bgColor="#fff"
          containerStyle={styles.containerStyle}
          textStyle={styles.timerText}
          onTimeElapsed={() => props.navigation.navigate('GameOverScreen')}
          {...props}
        />
      </View>
      <View style={styles.shieldContainer}>
        {
          shield >= 0 &&
          Array.from(Array(shield), (e, index) => {
            return (
              <TouchableOpacity key={index}>
                <MaterialCommunityIcons
                  name={'cards-heart'}
                  size={Normalize(24)}
                  color={'yellow'}
                />
              </TouchableOpacity>
            )
          })
        }
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
  containerStyle: {
    // paddingHorizontal: 10
  },
  shieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  timerText: {
    fontFamily: 'source-code-pro',
    fontSize: 20
  }
})

export default HeaderTopicGame
