import React from "react";
import { Text } from "react-native";

const StyleGuide = {
  spacing: 8,
  palette: {
    primary: "#3884ff",
    secondary: "#FF6584",
    tertiary: "#38ffb3",
    backgroundPrimary: "#d5e5ff", // === rgba(primary, 0.1)
    background: "#f2f2f2",
    border: "#f2f2f2"
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
      fontFamily: "source-code-pro"
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: "source-code-pro"
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
      fontFamily: "source-code-pro"
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: "source-code-pro",
      color: "#999999"
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: "source-code-pro"
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: "source-code-pro"
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
      fontFamily: "source-code-pro"
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: "source-code-pro"
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
      fontFamily: "source-code-pro"
    }
  }
}

export default ({ dark, type, style, children }) => {
  const color = dark ? "white" : "black";
  return (
    <Text style={[StyleGuide.typography[type || "body"], { color }, style]}>
      {children}
    </Text>
  );
};
