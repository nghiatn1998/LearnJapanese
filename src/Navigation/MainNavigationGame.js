import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { flipY, fromLeft } from 'react-navigation-transitions'

import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons'

import HomeScreen from '../Containers/Game/HomeScreen/HomeScreen'
import TopicScreen from '../Containers/Game/TopicScreen/TopicScreen'
import TopicDetailScreen from '../Containers/Game/TopicScreen/TopicDetailScreen'
import LearnTopicDetailScreen from '../Containers/Game/TopicScreen/LearnTopicDetailScreen'
import GameOverScreen from '../Containers/Game/TopicScreen/GameOverScreen'
import ProfileUserScreen from '../Containers/Game/UserScreen/ProfileUserScreen'
import ChangeUserNameScreen from '../Containers/Game/UserScreen/ChangeUserNameScreen'
import SearchScreen from '../Containers/Game/SearchScreen/SearchScreen'
import CourseIntroductionScreen from '../Containers/Game/LearnCourseScreen/CourseIntroductionScreen'
import CheckScreen from '../Containers/Game/LearnCourseScreen/CheckScreen'
import LearnVocabularyScreen from '../Containers/Game/LearnCourseScreen/LearnVocabularyScreen'
import CreateTermScreen from '../Containers/Game/CreateTermScreen/CreateTermScreen'
import CreateDirectoryScreen from '../Containers/Game/CreateTermScreen/CreateDirectoryScreen'
import DirectoryScreen from '../Containers/Game/DirectoryScreen/DirectoryScreen'
import CourseScreen from '../Containers/Game/CourseScreen/CourseScreen'
import AuthenticateScreen from '../Containers/Game/AuthenticateScreen/AuthenticateScreen'
import SignInScreen from '../Containers/Game/AuthenticateScreen/SignInScreen'
import SignUpScreen from '../Containers/Game/AuthenticateScreen/SignUpScreen'
import SettingGameScreen from '../Containers/Game/TopicScreen/SettingGameScreen'
import StartupGameScreen from '../Containers/StartupGameScreen'

// Component
// import {TabBar} from '../Components'
import { Colors } from '../Themes'

const handleCustomTransition = ({ scenes }) => {
  const DURATION = 300
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  // Custom transitions go there
  if (
    prevScene &&
    prevScene.route.routeName === 'AuthenticateScreen' &&
    nextScene.route.routeName === 'SignInScreen'
  ) {
    return fromLeft(DURATION)
  } else if (
    prevScene &&
    prevScene.route.routeName === 'AuthenticateScreen' &&
    nextScene.route.routeName === 'SignUpScreen'
  ) {
    return fromLeft(DURATION)
  } else if (
    prevScene &&
    prevScene.route.routeName === 'ProfileUserScreen' &&
    nextScene.route.routeName === 'AuthenticateScreen'
  ) {
    return flipY(DURATION)
  }
  return fromLeft()
}

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

const HomeNavigator = createStackNavigator(
  {
    HomeScreen: HomeScreen,
    CourseScreen: CourseScreen,
    DirectoryScreen: DirectoryScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const SearchNavigator = createStackNavigator(
  {
    SearchScreen: SearchScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const CreateTermNavigator = createStackNavigator(
  {
    CreateTermScreen: CreateTermScreen,
    CreateDirectoryScreen: CreateDirectoryScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
    mode: 'modal'
  }
)

const AuthNavigator = createStackNavigator(
  {
    AuthenticateScreen: AuthenticateScreen,
    SignInScreen: SignInScreen,
    SignUpScreen: SignUpScreen
  },
  {
    headerMode: 'none'
  }
)

const ProfileNavigator = createStackNavigator(
  {
    ProfileUserScreen: ProfileUserScreen,
    ChangeUserNameScreen: ChangeUserNameScreen
  },
  {
    initialRouteName: 'ProfileUserScreen',
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const tabBottomScreenConfig = {
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: tabInformation => {
        return (
          <MaterialIcons
            name="home"
            size={26}
            color={tabInformation.tintColor}
          />
        )
      },
      tabBarColor: Colors.primary
    }
  },
  Search: {
    screen: SearchNavigator,
    navigationOptions: {
      tabBarIcon: tabInformation => {
        return Platform.OS === 'android' ? (
          <Ionicons
            name="md-search"
            size={26}
            color={tabInformation.tintColor}
          />
        ) : (
          <Ionicons
            name="ios-search"
            size={26}
            color={tabInformation.tintColor}
          />
        )
      },
      tabBarColor: Colors.primary
    }
  },
  Create: {
    screen: CreateTermNavigator,
    navigationOptions: {
      tabBarIcon: tabInformation => {
        return Platform.OS === 'android' ? (
          <AntDesign name="edit" size={26} color={tabInformation.tintColor} />
        ) : (
          <AntDesign name="edit" size={26} color={tabInformation.tintColor} />
        )
      },
      tabBarColor: Colors.primary,
      tabBarVisible: false
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      tabBarIcon: tabInformation => {
        return Platform.OS === 'android' ? (
          <MaterialIcons
            name="verified-user"
            size={26}
            color={tabInformation.tintColor}
          />
        ) : (
          <MaterialIcons
            name="verified-user"
            size={26}
            color={tabInformation.tintColor}
          />
        )
      },
      tabBarColor: Colors.primary
    }
  }
}

const HomeTabNavigator = createMaterialBottomTabNavigator(
  tabBottomScreenConfig,
  {
    activeTintColor: 'white',
    barStyle: {
      backgroundColor: Colors.primary
    },
    labeled: false
  }
)

const LearnCourseNavigator = createStackNavigator(
  {
    CourseIntroductionScreen: CourseIntroductionScreen,
    CheckScreen: CheckScreen,
    LearnVocabularyScreen: LearnVocabularyScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const TopicNavigator = createStackNavigator(
  {
    TopicScreen: TopicScreen,
    TopicDetailScreen: TopicDetailScreen,
    LearnTopicDetailScreen: LearnTopicDetailScreen,
    GameOverScreen: GameOverScreen,
    SettingGameScreen: SettingGameScreen
  },
  {
    defaultNavigationOptions: defaultStackNavOptions
  }
)

const MainNavigatorStack = createStackNavigator(
  {
    Startup: StartupGameScreen,
    Authenticate: AuthNavigator,
    Home: HomeTabNavigator,
    Topic: TopicNavigator,
    LearnCourse: LearnCourseNavigator
  },
  {
    initialRouteName: 'Startup',
    headerMode: 'none',
    transitionConfig: nav => handleCustomTransition(nav)
  }
)

export default MainNavigatorStack
