import React from 'react'
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import {AntDesign} from '@expo/vector-icons'

// Style
import {Normalize} from '../../Themes'

// I18n
import I18n from 'ex-react-native-i18n'

const CardButton = props => {
  const {title, onPress} = props
  return (
    <React.Fragment>
      <View style={styles.directoryContainer}>
        <Text style={styles.title}>
          {title}
        </Text>
        {
          onPress &&
          <TouchableOpacity onPress={onPress}>
            <View style={styles.buttonContainer}>
              <Text style={styles.textButton}>{'Xem tất cả'}</Text>
              <View style={styles.space}/>
              <View style={styles.icon}>
                <AntDesign name="right" size={Normalize(15)} color="blue"/>
              </View>
            </View>
          </TouchableOpacity>
        }
      </View>
      <View style={styles.spaceLarge}/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  directoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  title: {
    fontSize: Normalize(21),
    fontFamily: 'open-sans'
  },
  textButton: {
    fontSize: Normalize(16),
    color: 'blue'
  },
  space: {
    marginHorizontal: 5
  },
  spaceLarge: {
    marginVertical: 10
  },
  icon: {
    justifyContent: 'flex-end'
  }
})

export default CardButton
