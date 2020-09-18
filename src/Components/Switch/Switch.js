import React from 'react'
import { Platform, StyleSheet, Switch, View } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  switch: {
    marginRight: 8
  }
})

export default ({ value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        thumbColor={Platform.OS === "android" ? "white" : undefined}
        trackColor={{
          false: '#3884ff',
          true: '#3884ff'
        }}
        {...{ value, onValueChange }}
      />
      {value && <Icon name="sun" color="white" size={32} />}
      {!value && (
        <Icon name="moon" color={'#3884ff'} size={32} />
      )}
    </View>
  );
};
