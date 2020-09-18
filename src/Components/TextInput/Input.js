import React, { useReducer, useEffect } from "react";
import { TextInput, Text, StyleSheet, View } from "react-native";

import { Normalize } from "../../Themes";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textInputChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textInputChangeHandler}
        placeholder={props.placeholder}
        onBlur={lostFocusHandler}
        placeholderTextColor={props.placeholderTextColor}
        underlineColorAndroid={"yellow"}
      />
      {!inputState.isValid && inputState.touched ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
      ) : (
        <Text style={styles.label}>{props.label}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "open-sans",
    fontSize: Normalize(12),
    color: "gray",
    marginTop: 5,
  },
  input: {
    fontSize: Normalize(16),
    fontFamily: "open-sans",
    paddingVertical: 5,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: Normalize(14),
  },
});

export default Input;
