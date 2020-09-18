import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'

// Style
import {Normalize} from '../../Themes'

const CardDescription = () => {
  return (
    <React.Fragment>
      <View style={styles.cardContainer}>
        <View style={styles.cardItemContainer}>
          <View style={{flex: 3}}>
            <Text style={styles.title}>
              The color wheel
            </Text>
            <Text style={styles.description}>
              Bạn tiến bộ thật nhanh! Tiếp tục với Viết để nắm chắc học phần
              này.
            </Text>
            <View style={styles.spaceContainer}/>
          </View>
          <View style={styles.iconContainer}>
            <Feather name="edit-3" size={Normalize(30)} color="blue"/>
          </View>
        </View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText} numberOfLines={1}>
            Tiếp tục viết
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vertical}/>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'green',
    width: Normalize(110),
    padding: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    padding: 20
  },
  cardItemContainer: {
    flexDirection: 'row'
  },
  spaceContainer: {
    marginVertical: 5
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: Normalize(21)
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: Normalize(14)
  },
  buttonText: {
    fontFamily: 'open-sans-bold',
    textAlign: 'center',
    fontSize: Normalize(14),
    color: 'white'
  },
  vertical: {
    marginVertical: 10
  }
})

export default CardDescription
