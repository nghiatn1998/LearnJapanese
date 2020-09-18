import React from 'react';
import {Text, View, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

import { Normalize } from "../../Themes"

const CardDirectory = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.directoryContainer}>
        <FontAwesome name="folder" size={Normalize(20)} color="black"/>
        <View style={styles.horizontal}/>
        <Text style={styles.textDirectory}>Hello</Text>
      </View>

      <View style={styles.vertical}/>

      <View style={styles.termContainer}>
        <Text style={styles.numberTerm}>
          0 học phần
        </Text>
        <View style={styles.horizontalLarge}/>
        <View style={styles.iconContainer}>
          <FontAwesome name="user-o" size={Normalize(15)} color="black"/>
          <View style={styles.horizontal}/>
          <Text>quizlette</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,
    backgroundColor: 'white'
  },
  directoryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  termContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  iconContainer: {
    flexDirection: 'row'
  },
  numberTerm: {
    fontSize: Normalize(15),
    fontFamily: 'open-sans',
  },
  horizontal: {
    marginHorizontal: 5
  },
  horizontalLarge: {
    marginHorizontal: 15
  },
  vertical: {
    marginVertical: 5
  },
  textDirectory: {
    fontFamily: 'open-sans',
    fontSize: Normalize(21)
  }
})

export default CardDirectory;
