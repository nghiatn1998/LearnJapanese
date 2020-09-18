import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { TextTransition } from "../../Components";

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  label: {
    textAlign: "center"
  }
});

export default ({ label, primary, onPress }) => {
  const color = primary ? "white" : undefined;
  const backgroundColor = primary ? '#3884ff' : undefined;
  return (
    <RectButton {...{ onPress }}>
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <TextTransition type="headline" style={[styles.label, { color }]}>
            {label}
          </TextTransition>
        </View>
      </SafeAreaView>
    </RectButton>
  );
};
