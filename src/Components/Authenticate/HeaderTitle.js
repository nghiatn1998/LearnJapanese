import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import {Colors, Normalize} from '../../Themes'

const HeaderTitle = (props) => {
  const { title, description } = props
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        {title}
      </Text>
      <View style={styles.spaceContainer}/>
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  title: {
    fontSize: Normalize(26),
    fontFamily: 'open-sans-bold',
    color: Colors.blue,
    textAlign: 'center'
  },
  spaceContainer: {
    marginVertical: 10
  },
  description: {
    fontSize: Normalize(18),
    fontFamily: 'open-sans',
    textAlign: 'center'
  }
})

export default HeaderTitle