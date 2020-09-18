import React, { useState } from 'react'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { StatusBar } from 'react-native'
import { useScreens } from 'react-native-screens'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

// Navigation
// import NavigationContainer from './src/Navigation/NavigationContainer'
import RootNavigation from './src/Navigation/RootNavigation'

// Reducer
import authenticateReducer from './src/Store/Reducers/AuthenticateRedux'
import coursesReducer from './src/Store/Reducers/CourseRedux'
import topicsReducer from './src/Store/Reducers/TopicRedux'
import directoriesReducer from './src/Store/Reducers/DirectoryRedux'
import historiesReducer from './src/Store/Reducers/HistoryRedux'
import displayReducer from './src/Store/Reducers/DisplayRedux'
import alphabetReducer from './src/Store/Reducers/AlphabetRedux'

// Styles
import { Colors } from './src/Themes'

useScreens()

const rootReducer = combineReducers({
  authenticate: authenticateReducer,
  directories: directoriesReducer,
  courses: coursesReducer,
  topics: topicsReducer,
  histories: historiesReducer,
  display: displayReducer,
  alphabet: alphabetReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const getFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
    'source-code-pro': require('./src/assets/fonts/SourceCodePro-Regular.ttf'),
    'source-code-pro-bold': require('./src/assets/fonts/SourceCodePro-SemiBold.ttf'),
    'SFProText-Bold': require('./src/assets/fonts/SF-Pro-Text-Bold.otf'),
    'SFProText-Semibold': require('./src/assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SFProText-Regular': require('./src/assets/fonts/SF-Pro-Text-Regular.otf')
  })
}

export default function App () {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontLoaded(true)} />
    )
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.white} />
      <RootNavigation />
    </Provider>
  )
}
