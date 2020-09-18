import React, {useEffect, useRef, useState} from 'react'
import {View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Text, StatusBar} from 'react-native'
import {NavigationActions, SafeAreaView} from 'react-navigation'

import {
  Transition,
  Transitioning
} from 'react-native-reanimated'

import {
  Switch,
  ButtonTransition,
  TextTransition,
  HeaderButton,
  CardCourse,
  ActivityIndicatorLoading
} from '../../../Components'
import ProfilePicture from './Components/ProfilePicture'
import SocialMediaIcons from './Components/SocialMediaIcons'
import Followers from './Components/Followers'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AntDesign, Entypo} from '@expo/vector-icons'
import ProfileCardCourse from './Components/ProfileCardCourse'
import {Colors, Normalize} from '../../../Themes'
import styled from 'styled-components'
import * as coursesActions from '../../../Store/Actions/Course'
import {resetTo} from '../../../Navigation/NavigationActions'
import * as authActions from '../../../Store/Actions/Authenticate'

export {profilePic} from './Components/ProfilePicture'

const transition = (
  <Transition.Together>
    <Transition.In type={'fade'} durationMs={400}/>
    <Transition.Out type={'fade'} durationMs={500}/>
  </Transition.Together>
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderBottomWidth: 1, borderTopWidth: 1,
    borderTopColor: Colors.nobel,
    borderBottomColor: Colors.nobel,
    padding: 15,
    marginBottom: 13,
  },
  textInformation: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
  },
  title: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(21),
    textAlign: 'center'
  },
  darkMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.blackRussian
  },
  flatList: {
    flex: 1,
    marginTop: 20
  },
  text: {
    textAlign: 'center',
    fontSize: Normalize(17),
    fontFamily: 'source-code-pro-bold'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const ProfileScreen = (props) => {
  const dispatch = useDispatch()
  const courses = useSelector(state => state.courses.courses)
  const userInformation = useSelector(state => state.authenticate.userInformation)

  const [dark, setDark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const onPressCourse = (id) => props.navigation.navigate('ProfileCourseIntroductionScreen', {id})

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(coursesActions.getCoursesLatest())
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }

    getCourses().then(() => {})
  }, [])

  useEffect(() => {
    StatusBar.setBarStyle('light-content', true)
  })

  const logOut = () => {
    props.navigation.dispatch(resetTo('Auth'))
    dispatch(authActions.logout())
  }

  const renderCourse = ({item, index}) => {
    return (
      <ProfileCardCourse
        key={'keyItem' + index.toString()}
        _id={item._id}
        index={index}
        title={item.title}
        onPress={() => onPressCourse(item._id)}
        vocabularyQuantity={item.contents.length}
      />
    )
  }

  const ref = useRef(null)
  return (
    <ScrollView bounces={false}>
      <Transitioning.View style={styles.container} {...{ref, transition}}>
        {dark && <View style={styles.darkMask}/>}
        <Switch
          value={dark}
          onValueChange={value => {
            if (ref.current) {
              ref.current.animateNextTransition()
            }
            setDark(value)
          }}
        />
        <ProfilePicture imageUri={userInformation && userInformation.avatar}/>
        <View style={styles.textRow}>
          <TextTransition type="title3" style={styles.text} {...{dark}}>
            {userInformation && userInformation.username}
          </TextTransition>
          <TextTransition type="headline" style={styles.text} {...{dark}}>
            ({userInformation && userInformation.email})
          </TextTransition>
        </View>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 10}}/>
          <TouchableOpacity onPress={() => props.navigation.navigate('CardCourse')}>
            <View style={{marginVertical: 10}}>
              <TextTransition
                style={{
                  fontFamily: 'SFProText-Bold',
                  fontSize: Normalize(15),
                  color: 'blue'
                }}
              >
                Xem Học Phần Của Bạn
              </TextTransition>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              marginVertical: 15,
              borderBottomWidth: 1,
              marginTop: 20,
              borderTopWidth: 1,
              padding: 5,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
            }}
          >
            <View>
              <View
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TextTransition style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14)}} {...{dark}} numberOfLines={1}>Email</TextTransition>
                <View style={{flexDirection: 'row'}}>
                  <TextTransition
                    numberOfLines={1}
                    style={{fontFamily: 'source-code-pro', textAlign: 'right', marginRight: 10}}
                    {...{dark}}
                  >
                    {userInformation.email || 'Not Found'}
                  </TextTransition>
                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ProfileChangeUserNameScreen')
                }}
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <TextTransition
                  style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14)}}
                  numberOfLines={1}
                  {...{dark}}
                >
                  Tên người dùng
                </TextTransition>
                <View style={{flexDirection: 'row'}}>
                  <TextTransition
                    numberOfLines={1}
                    style={{fontFamily: 'source-code-pro', textAlign: 'right', marginRight: 10}}
                    {...{dark}}
                  >
                    {userInformation.username || 'Not found'}
                  </TextTransition>

                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <View style={{flex: 3}}>
                  <TextTransition
                    style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14)}}
                    {...{dark}}
                  >
                    Thêm mật khẩu
                  </TextTransition>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              padding: 15,
            }}
          >
            <TextTransition
              style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14)}}
              {...{dark}}
            >
              Giới thiệu
            </TextTransition>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              padding: 15,
              marginBottom: 13
            }}
          >
            <TextTransition
              style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14)}}
              {...{dark}}
            >
              Trung tâm hỗ trợ
            </TextTransition>
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
            <TouchableOpacity onPress={logOut}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: Colors.nobel,
                  borderBottomColor: Colors.nobel,
                  padding: 15,
                }}
              >
                <Text
                  style={{fontFamily: 'source-code-pro-bold', fontSize: Normalize(14), color: 'red'}}>{'Đăng xuất'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Transitioning.View>
    </ScrollView>
  )
}

const QuizContainer = styled.View`
  flex: 1;
  background: white;
  border-radius: 20px;
  box-shadow: 0 0 10px gray;
  margin-top: 20px;
`

ProfileScreen.navigationOptions = {
  headerTitle: 'Profile',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#000068'
  }
}

export default ProfileScreen
