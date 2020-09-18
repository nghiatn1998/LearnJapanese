import React from 'react'
import {Text, StyleSheet, StatusBar} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

import {
  HomeScreen,
  SectionScreen,
  CourseScreen,
  CardScreen,
  VideoScreen,
  ProfileScreen,
  CourseDetailScreen,
  LearnCourseDetailScreen,
  GameOverScreen,
  QuizGameScreen,
  QuizGameWaitingUserScreen,
  ProfileCourseIntroductionScreen,
  ProfileChangeUserNameScreen,
  QuizGamePlayingScreen,
  SignUpScreen,
  SignUpEmailScreen,
  QuizGameRankingScreen,
  AlphabetScreen
} from '../Containers/Study/index'
import StartupStudyScreen from '../Containers/StartupStudyScreen'
import { Colors } from '../Themes'
import AuthenticateScreen from '../Containers/Game/AuthenticateScreen/AuthenticateScreen'
import SignInScreen from '../Containers/Game/AuthenticateScreen/SignInScreen'
import CardCourseScreen from '../Containers/Study/CardCourse/CardCourseScreen'
import CreateCardCourseScreen from '../Containers/Study/CardCourse/CreateCardCourseScreen'
import CheckScreen from '../Containers/Study/CardCourse/CheckScreen'
import CourseIntroductionScreen from '../Containers/Study/CardCourse/CourseIntroductionScreen'
import LearnVocabularyScreen from '../Containers/Study/CardCourse/LearnVocabularyScreen'

const activeColor = 'white'
const inactiveColor = '#b8bece'

const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'source-code-pro'
  }
})

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
    Alphabet: AlphabetScreen,
    Section: SectionScreen,
    Video: VideoScreen,
    Card: CardScreen
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
    tabBarLabel: ({ focused }) => {
      if (focused) {
        StatusBar.setBarStyle('dark-content', true)
      }
      return (
        <Text style={[styles.textHeader, focused ? { color: 'white' } : { color: '#b8bece' }]}>{'Home'}</Text>
      )
    },
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
  CourseScreen: CourseScreen,
  CourseDetailScreen: CourseDetailScreen,
  GameOverScreen: GameOverScreen,
  LearnCourseDetailScreen: LearnCourseDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions
})
CourseStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: ({ focused }) => {
      if (focused) {
        StatusBar.setBarStyle('light-content', true)
      }
      return (
        <Text style={[styles.textHeader, focused ? { color: 'white' } : { color: '#b8bece' }]}>{'Courses'}</Text>
      )
    },
    tabBarVisible,
    tabBarIcon: ({focused}) => (
      <Ionicons
        name="ios-albums"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    )
  }
}

const CardCourseStack = createStackNavigator({
  CardCourse: CardCourseScreen,
  CreateCardCourse: CreateCardCourseScreen,
  CheckScreen: CheckScreen,
  CourseIntroductionScreen: CourseIntroductionScreen,
  LearnVocabularyScreen: LearnVocabularyScreen
})
CardCourseStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    if (focused) {
      StatusBar.setBarStyle('light-content', true)
    }
    return (
      <Text style={[styles.textHeader, focused ? {color: 'white'} : {color: '#b8bece'}]}>{'Cards'}</Text>
    )
  },
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="md-bookmarks"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
}

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  ProfileCourseIntroductionScreen: ProfileCourseIntroductionScreen,
  ProfileChangeUserNameScreen: ProfileChangeUserNameScreen
})
ProfileStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    if (focused) {
      StatusBar.setBarStyle('light-content', true)
    }
    return (
      <Text style={[styles.textHeader, focused ? { color: 'white' } : { color: '#b8bece' }]}>{'Profile'}</Text>
    )
  },
  tabBarIcon: ({ focused }) => (
    <FontAwesome5
      name={'user-circle'}
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
}

const QuizGameStack = createStackNavigator({
  QuizGame: QuizGameScreen,
  QuizGameWaitingUserScreen: QuizGameWaitingUserScreen,
  QuizGamePlayingScreen: QuizGamePlayingScreen,
  QuizGameRankingScreen: QuizGameRankingScreen
})
QuizGameStack.navigationOptions = {
  tabBarLabel: ({ focused }) => {
    if (focused) {
      StatusBar.setBarStyle('dark-content', true)
    }
    return (
      <Text style={[styles.textHeader, focused ? { color: 'white' } : { color: '#b8bece' }]}>{'Battle'}</Text>
    )
  },
  tabBarIcon: ({ focused }) => (
    <MaterialCommunityIcons
      name={'sword-cross'}
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  )
}

const AuthNavigator = createStackNavigator(
  {
    SignUpScreen: SignUpScreen,
    SignUpEmailScreen: SignUpEmailScreen
  },
  {
    headerMode: 'none'
  }
)

const TabNavigator = createBottomTabNavigator({
  CourseStack,
  HomeStack,
  ProfileStack,
  QuizGameStack,
  CardCourseStack
}, {
  initialRouteName: 'HomeStack',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#3884ff',
      borderBottomWidth: 0
    },
    headerTintColor: "white"
  },
  tabBarOptions: {
    style: {
      backgroundColor: '#000068'
    }
  }
})

const MainNavigatorStack = createStackNavigator(
  {
    Startup: StartupStudyScreen,
    Auth: AuthNavigator,
    Study: TabNavigator
  },
  {
    initialRouteName: 'Startup',
    headerMode: 'none'
  }
)

export default MainNavigatorStack
