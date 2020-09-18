import * as React from "react";
import { StyleSheet, View } from "react-native";

import { TextTransition } from "../../../../Components";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  text: {
    textAlign: "center"
  },
  separator: {
    width: 1,
    height: "100%"
  }
});

export default ({ dark, followers, following }) => {
  const backgroundColor = dark ? "white" : "black";
  return (
    <View style={styles.container}>
      <View>
        <TextTransition type="body" style={styles.text} {...{ dark }}>
          {`${followers}`}
        </TextTransition>
        <TextTransition style={styles.text} {...{ dark }}>
          Followers
        </TextTransition>
      </View>
      <View style={[styles.separator, { backgroundColor }]} />
      <View>
        <TextTransition type="body" style={styles.text} {...{ dark }}>
          {`${following}`}
        </TextTransition>
        <TextTransition style={styles.text} {...{ dark }}>
          Following
        </TextTransition>
      </View>
    </View>
  );
};
