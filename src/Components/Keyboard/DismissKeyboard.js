import React from "react";
import { TouchableWithoutFeedback, Keyboard, View, StyleSheet } from "react-native";

const DismissKeyboard = props => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.dismissContainer}>{props.children}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  dismissContainer: {
    width: '100%',
    height: '100%'
  }
})

export default DismissKeyboard;
