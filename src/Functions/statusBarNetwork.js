import {StatusBar, Platform} from 'react-native'

export function fetchingStatusBarOn () {
  if (Platform.OS === 'ios') {
    StatusBar.setNetworkActivityIndicatorVisible(true)
  }
}

export function fetchingStatusBarOff () {
  if (Platform.OS === 'ios') {
    StatusBar.setNetworkActivityIndicatorVisible(false)
  }
}