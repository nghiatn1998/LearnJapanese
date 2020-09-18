import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'

// Component
import {Menu, Notification, Card, Logo, Course, Avatar, ModalLogin, NotificationButton} from '../../../Components'

// Action Type
import * as actionTypes from '../../../Store/ActionTypes'

// Actions
import * as displayActions from '../../../Store/Actions/Display'
import * as topicsActions from '../../../Store/Actions/Topics'

// Function
import {useDidUpdate} from '../../../Functions/customHook'
import {ImagesStudy} from '../../../Themes'

// Mock
const logos = [
  {
    image: ImagesStudy.logoDocument,
    text: 'Tài liệu'
  },
  {
    image: ImagesStudy.logoKanji,
    text: 'Bảng chữ cái'
  },
  {
    image: ImagesStudy.logoQuiz,
    text: 'Từ vựng câu đố'
  },
  {
    image: ImagesStudy.logoLanguage,
    text: 'Chọn ngôn ngữ'
  },
  {
    image: require('../../../../assets/logo-japanese-kansa.png'),
    text: 'Gửi lời nhắn'
  },
  {
    image: ImagesStudy.logoEmail,
    text: 'Liên hệ'
  }
]
const cards = [
  {
    title: 'React Native for Designers',
    image: require('../../../../assets/background11.jpg'),
    subtitle: 'React Native',
    caption: '1 of 12 sections',
    logo: require('../../../../assets/logo-react.png'),
  },
  {
    title: 'Styled Components',
    image: require('../../../../assets/background12.jpg'),
    subtitle: 'React Native',
    caption: '2 of 12 sections',
    logo: require('../../../../assets/logo-react.png'),
  },
  {
    title: 'Props and Icons',
    image: require('../../../../assets/background13.jpg'),
    subtitle: 'React Native',
    caption: '3 of 12 sections',
    logo: require('../../../../assets/logo-react.png'),
  },
  {
    title: 'Static Data and Loop',
    image: require('../../../../assets/background14.jpg'),
    subtitle: 'React Native',
    caption: '4 of 12 sections',
    logo: require('../../../../assets/logo-react.png')
  }
]
const courses = [
  {
    title: 'はじめまして。私はアンナです。\t',
    subtitle: '10 sections',
    image: require('../../../../assets/japanese-theme.jpg'),
    logo: require('../../../../assets/logo-japanese-kansa.png'),
    author: 'Anna',
    avatar: require('../../../../assets/avatar.jpg'),
    caption: 'よろしくお願いします'
  },
  {
    title: 'お母さん、ここにゴミを捨ててもいいですか',
    subtitle: '12 sections',
    image: require('../../../../assets/japanese-theme-1.jpeg'),
    logo: require('../../../../assets/logo-japanese-kansa.png'),
    author: 'Sugar',
    avatar: require('../../../../assets/logo-studio.png'),
    caption: 'さん、ここにゴミを'
  },
  {
    title: 'めまして。私はアンナで',
    subtitle: '10 sections',
    image: require('../../../../assets/japanese-theme-2.jpg'),
    logo: require('../../../../assets/logo-japanese-kansa.png'),
    author: 'Ace',
    avatar: require('../../../../assets/logo-dc.png'),
    caption: 'にゴミを捨ててもいいで'
  },
  {
    title: 'お母さん、ここにゴミを捨ててもいいですか',
    subtitle: '10 sections',
    image: require('../../../../assets/japanese-theme-3.jpg'),
    logo: require('../../../../assets/logo-japanese-kansa.png'),
    author: 'Silver',
    avatar: require('../../../../assets/logo-invision.png'),
    caption:
      'ろしくお願いします'
  }
]

const HomeScreen = (props) => {
  const [scale, setScale] = useState(new Animated.Value(1))
  const [opacity, setOpacity] = useState(new Animated.Value(1))
  const userInformation = useSelector(state => state.authenticate.userInformation)
  const action = useSelector(state => state.display.action)
  const topics = useSelector(state => state.topics.topics)
  const { fetchingTopics, errorFetchingTopics} = useSelector(state => ({
    fetchingTopics: state.topics.fetchingTopics,
    errorFetchingTopics: state.topics.errorFetchingTopics
  }));
  const dispatch = useDispatch()

  useDidUpdate(() => {
    if (!fetchingTopics && errorFetchingTopics) {
      alertError(null, errorFetchingTopics)
    }
  }, [fetchingTopics, errorFetchingTopics])

  const toggleMenu = () => {
    if (action === actionTypes.OPEN_MENU) {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in()
      }).start()
      Animated.spring(opacity, {
        toValue: 0.5
      }).start()

      StatusBar.setBarStyle('light-content', true)
    }

    if (action === actionTypes.CLOSE_MENU) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in()
      }).start()
      Animated.spring(opacity, {
        toValue: 1
      }).start()

      StatusBar.setBarStyle('dark-content', true)
    }
  }

  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true)
    if (Platform.OS === 'android') StatusBar.setBarStyle('light-content', true)

    const getTopics = async () => {
      await dispatch(topicsActions.getTopics())
    }
    getTopics().then(() => () => {})
  }, [])

  useDidUpdate(() => {
    toggleMenu()
  })

  const handleAvatar = () => {
    if (userInformation) {
      dispatch(displayActions.openMenu())
    } else {
      dispatch(displayActions.openLogin())
    }
  }

  return (
    <RootView>
      <Menu {...props} />
      <Notification />
      <AnimatedContainer
        style={{
          transform: [{scale: scale}],
          opacity: opacity
        }}
      >
        <SafeAreaView>
          <ScrollView style={{height: '100%'}}>
            <TitleBar>
              <TouchableOpacity
                onPress={() => handleAvatar()}
                style={{position: 'absolute', top: 0, left: 20}}
              >
                <Avatar/>
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{userInformation ? userInformation.username : 'Stranger'}</Name>
              <TouchableOpacity
                onPress={() => dispatch(displayActions.openNotification())}
                style={{position: 'absolute', right: 20, top: 5}}
              >
                <NotificationButton/>
              </TouchableOpacity>
            </TitleBar>
            <ScrollView
              style={{
                flexDirection: 'row',
                padding: 20,
                paddingLeft: 12,
                paddingTop: 30
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {logos.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text}/>
              ))}
            </ScrollView>
            <Subtitle>{'Learning Japanese With Video Series'.toUpperCase()}</Subtitle>
            <ScrollView
              horizontal={true}
              style={{paddingBottom: 30}}
              showsHorizontalScrollIndicator={false}
            >
              <CardsContainer>
                {
                  topics.map((topic, index) => (
                    <TouchableOpacity key={index} onPress={() => { props.navigation.push('Section', {
                      section: {
                        ...topic,
                        // title: 'React Native for Designers',
                        // image: require('../../../../assets/background11.jpg'),
                        subtitle: 'Spirited Away',
                        caption: 'Short Film',
                        logo: require('../../../../assets/logo-react.png'),
                      }
                    })}}>
                      <Card
                        title={topic.title}
                        image={topic.avatar}
                        caption={`${Math.floor(Math.random() * Math.floor(12))} of ${ 12 + Math.floor(Math.random() * Math.floor(24))} sections`}
                        logo={require('../../../../assets/logo-japanese-kansa.png')}
                        subtitle={topic.title}
                      />
                    </TouchableOpacity>
                  ))
                }
                {cards.map((card, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      props.navigation.push('Section', {
                        section: card
                      })
                    }}
                  >
                    <Card
                      title={card.title}
                      image={card.image}
                      caption={card.caption}
                      logo={card.logo}
                      subtitle={card.subtitle}
                    />
                  </TouchableOpacity>
                ))}
              </CardsContainer>
            </ScrollView>
            <Subtitle>{'Popular Topics'.toUpperCase()}</Subtitle>
            <CoursesContainer>
              {courses.map((course, index) => (
                <Course
                  key={index}
                  image={course.image}
                  title={course.title}
                  subtitle={course.subtitle}
                  logo={course.logo}
                  author={course.author}
                  avatar={course.avatar}
                  caption={course.caption}
                />
              ))}
            </CoursesContainer>
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <ModalLogin/>
    </RootView>
  )
}

HomeScreen.navigationOptions = {
  header: null
}

export default HomeScreen

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
`

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`

const RootView = styled.View`
  background: black;
  flex: 1;
`

const Subtitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 10px;
  text-transform: uppercase;
`

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container)

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`

