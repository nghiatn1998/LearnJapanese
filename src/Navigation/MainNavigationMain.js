import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import {
  HomeScreen
} from '../Containers/Study/index'
import StartupStudyScreen from '../Containers/StartupStudyScreen'
import { Colors } from '../Themes'

const activeColor = '#4775f2'
const inactiveColor = '#b8bece'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary // color for background
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: 'white' // color for header text,
}

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
    Video: VideoScreen
  },
  {
    mode: 'modal'
  }
)
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  const routeName = navigation.state.routes[navigation.state.index].routeName

  if (routeName === 'Section' || routeName === 'Video') {
    tabBarVisible = false
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  }
}

const CourseStack = createStackNavigator({
  Course: CourseScreen
})
CourseStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
}

const CardStack = createStackNavigator({
  Card: CardScreen
})
CardStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
}

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CourseStack,
  CardStack
})

const MainNavigatorStack = createStackNavigator(
  {
    Startup: StartupStudyScreen,
    Study: TabNavigator
  },
  {
    initialRouteName: 'Startup',
    headerMode: 'none'
  }
)

export default MainNavigatorStack
