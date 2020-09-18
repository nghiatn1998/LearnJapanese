import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import {Colors, Normalize} from '../../Themes'

const FormAuthenticate = (props) => {
  const { onPressSignUp, onPressSignIn } = props;
  return (
    <View style={styles.authenticateContainer}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPressSignUp}>
        <Text style={styles.signUpText} numberOfLines={1}>
          Đăng ký miễn phí
        </Text>
      </TouchableOpacity>
      <View style={{ marginVertical: 10 }} />
      <TouchableOpacity onPress={onPressSignIn}>
        <Text style={styles.signInText}>
          Hoặc đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  authenticateContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "green",
    width: "80%",
    alignItems: "center",
  },
  signUpText: {
    fontFamily: "open-sans",
    fontSize: Normalize(16),
    color: Colors.snow,
  },
  signInText: {
    fontFamily: "open-sans",
    fontSize: Normalize(14),
    color: Colors.snow
  },
})

export default FormAuthenticate