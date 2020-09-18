import {Alert} from 'react-native'

let isAlert = false

function pressAction (onPress) {
  isAlert = false
  typeof onPress === 'function' && onPress()
}

export function alertOk (title, message, onPress) {
  if (!isAlert) {
    isAlert = true
    Alert.alert(
      title,
      message || '',
      [
        {
          text: 'OK', onPress: () => pressAction(onPress)
        }
      ],
      {cancelable: false}
    )
  }
}

export function alertError (title, message, onPress) {
  if (!isAlert) {
    isAlert = true
    Alert.alert(
      title,
      message || '',
      [
        {text: 'OK', onPress: () => pressAction(onPress)}
      ],
      {cancelable: false}
    )
  }
}

export function alertYesNo (title, message, onPressYes, onPressNo) {
  Alert.alert(
    title,
    message || '',
    [
      {text: 'Yes', onPress: onPressYes},
      {text: 'No', onPress: onPressNo}
    ],
    {cancelable: false}
  )
}
