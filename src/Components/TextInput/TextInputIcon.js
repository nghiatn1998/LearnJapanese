import React from 'react'
import {TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'
import {Colors, Normalize} from '../../Themes'
import {AntDesign} from '@expo/vector-icons'

const TextInputIcon = props => {
  const { initialValue, inputHandler, onPress } = props
  return (
    <View style={styles.mainContainer}>
      <TextInput
        value={initialValue}
        onChangeText={inputHandler}
        style={styles.inputComment}
        placeholder={'Please input new name'}
        placeholderTextColor={Colors.darkGray}
        autoCorrect={false}
        underlineColorAndroid={'transparent'}
        {...this.props}
      />
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="close" size={Normalize(20)} color="black"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 30,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  inputComment: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: Colors.charcoal
  }
})

export default TextInputIcon