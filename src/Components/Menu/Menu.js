import React, {useState, useEffect} from 'react'
import { Animated, Image, TouchableOpacity, View, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import styled from "styled-components"
import { useDispatch, useSelector } from 'react-redux'

// Components
import MenuItem from "./MenuItem"

// Styles
import styles from './Styles/MenuStyles'
import { Metrics, ImagesStudy } from '../../Themes'

// Action Type
import * as actionTypes from "../../Store/ActionTypes";

// Actions
import * as displayActions from '../../Store/Actions/Display'
import * as authActions from '../../Store/Actions/Authenticate'

// Hook
import { useDidUpdate } from '../../Functions/customHook'
import { resetTo } from '../../Navigation/NavigationActions'

// const avatarDefault = 'https://cl.ly/55da82beb939/download/avatar-default.jpg'
const items = [
  {
    icon: "ios-settings",
    title: "Account",
    text: "My account"
  },
  {
    icon: "ios-journal",
    title: "Go to Course",
    text: "Learn more vocabulary"
  },
  {
    icon: "ios-flash",
    title: "Practice with other people",
    text: "Battle Game Online"
  },
  {
    icon: "ios-exit",
    title: "Log out",
    text: "See you soon!"
  }
]

const Menu = (props) => {
  const action = useSelector(state => state.display.action)
  const [top] = useState(new Animated.Value(Metrics.screenHeight))
  const dispatch = useDispatch()

  const toggleMenu = () => {
    if (action === actionTypes.OPEN_MENU) {
      Animated.spring(top, {
        toValue: 54
      }).start();
    }

    if (action === actionTypes.CLOSE_MENU) {
      Animated.spring(top, {
        toValue: Metrics.screenHeight
      }).start();
    }
  };

  useEffect(() => {
    toggleMenu()
  }, [])

  useDidUpdate(() => {
    toggleMenu()
  })

  const handleMenu = index => {
    if (index === 0) {
      dispatch(displayActions.closeMenu())
      props.navigation.navigate('Profile')
    }
    if (index === 1) {
      dispatch(displayActions.closeMenu())
      props.navigation.navigate('CourseScreen')
    }
    if (index === 2) {
      dispatch(displayActions.closeMenu())
      props.navigation.navigate('QuizGame')
    }
    if (index === 3) {
      dispatch(displayActions.closeMenu())
      props.navigation.dispatch(resetTo('Auth'))
      dispatch(authActions.logout())
    }
  };

  return (
    <Animated.View style={{ ...styles.container, ...{ top: top } }}>
      <View style={styles.cover}>
        <Image style={styles.image} source={ImagesStudy.background12} />
        <Text style={styles.title}>My Settings</Text>
        {/* <Text style={styles.subtitle}>Study Japanese</Text> */}
      </View>
      <TouchableOpacity
        onPress={() => dispatch(displayActions.closeMenu())}
        style={styles.closeContainer}
      >
        <CloseView>
          <Ionicons name="ios-close" size={40} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <View style={styles.content}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMenu(index)}
          >
            <MenuItem icon={item.icon} title={item.title} text={item.text} />
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
}

const CloseView = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: white;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
`;

export default Menu


