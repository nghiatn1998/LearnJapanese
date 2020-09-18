import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import ChooseScreen from '../Containers/ChooseScreen'
import MainNavigationGame from './MainNavigationGame'
import MainNavigationStudy from './MainNavigationStudy'

const RootNavigator = createSwitchNavigator(
  {
    // Choose: ChooseScreen,
    // Game: MainNavigationGame,
    Study: MainNavigationStudy
  },
  {
    initialRouteName: 'Study'
  }
)

export default createAppContainer(RootNavigator)
