import * as React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

export const profilePic = require("../../../../assets/Images/krzysztof.jpg");

const { width } = Dimensions.get("window");
const size = width / 2;
const styles = StyleSheet.create({
  image: {
    margin: 16,
    width: size,
    height: size,
    borderRadius: size / 2,
    resizeMode: "cover",
    alignSelf: "center"
  }
});

export default ({ imageUri }) => {
  return <Image style={styles.image} source={{ uri: imageUri }} />;
};
