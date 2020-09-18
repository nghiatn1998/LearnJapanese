import { Colors } from '../Themes'

export function useStatusBarTranslucent (barStyle) {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(true)
    StatusBar.setBackgroundColor('transparent')
  }
  StatusBar.setBarStyle(barStyle)
}

export function useStatusBarNormal (barStyle) {
  if (Platform.OS === 'android') {
    StatusBar.setTranslucent(false)
    StatusBar.setBackgroundColor(Colors.ghostWhite)
  }
  StatusBar.setBarStyle(barStyle)
}
