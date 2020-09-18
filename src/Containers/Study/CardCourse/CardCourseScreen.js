import React, {useState, useEffect, useCallback} from 'react'
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Alert,
  StatusBar
} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {HeaderButton} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import {AntDesign, Entypo, Feather} from '@expo/vector-icons'
// import IO from 'socket.io-client'

// Components
import {
  Plus,
  CardDescription,
  CardDirectory,
  CardButton,
  CardCourse,
  ActivityIndicatorLoading,
  ModalLogin,
  Menu
} from '../../../Components'

// Style
import {Normalize, ImagesGame} from '../../../Themes'

//Action
import * as coursesActions from '../../../Store/Actions/Course'
import * as displayActions from '../../../Store/Actions/Display'

// Functions
import {useDidUpdate} from '../../../Functions/customHook'
import {alertError} from '../../../Functions/alertFunction'

const CustomButtonAntDesign = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AntDesign}
      iconSize={Normalize(23)}
      color={'white'}
    />
  )
}
const CustomButtonEntypo = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Entypo}
      iconSize={Normalize(25)}
      color={'white'}
    />
  )
}
const CustomButtonFeather = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Feather}
      iconSize={Normalize(25)}
      color={'white'}
    />
  )
}

const NotDirectory = () => {
  return (
    <View style={{marginTop: 10}}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: Normalize(20),
          fontFamily: 'open-sans'
        }}>Không tìm thấy thư mục
      </Text>
    </View>
  )
}
const HaveDirectory = (props) => {
  return (
    <React.Fragment>
      <CardButton onPress={() => {
        props.navigation.navigate('DirectoryScreen')
      }} title={'Thư mục'}/>
      <CardDirectory/>
    </React.Fragment>
  )
}

const NotCoursed = () => {
  return (
    <View style={styles.backgroundContainer}>
      <Text style={styles.courseText}>
        Bạn chưa có học phần nào, hãy tạo học phần đầu tiên cho riêng mình.
      </Text>
    </View>
  )
}
const HaveCoursed = (props) => {
  const {courses, onPressCourse} = props
  const renderCourses = ({item, index}) => {
    return (
      <CardCourse
        _id={item._id}
        index={index}
        title={item.title}
        key={'Course' + index.toString()}
        onPress={() => onPressCourse(item._id)}
        vocabularyQuantity={item.contents.length}
      />
    )
  }
  return (
    <FlatList
      style={styles.flatListCourse}
      data={courses}
      renderItem={renderCourses}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator
      keyExtractor={(item, index) => index.toString()}
    />
  )
}

const CardCourseScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const courses = useSelector(state => state.courses.courses)
  // const userInformation = useSelector(state => state.authenticate.userInformation)
  const dispatch = useDispatch()

  // useEffect(() => {
  // if (error) {
  //   alertError(error.message || error)
  // }
  // }, [error])

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

  // const handleSettings = useCallback(() => {
  //  if (userInformation) {
  //    dispatch(displayActions.openMenu())
  //  } else {
  //    dispatch(displayActions.openLogin())
  //  }
  // }, [userInformation])

  // useEffect(() => {
  //  props.navigation.setParams({
  //    handleSettings: handleSettings
  //  })
  // }, [handleSettings])

  const onPressCourse = (id) => props.navigation.navigate('CourseIntroductionScreen', {id})

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={ImagesGame.frameBackground}
      style={styles.frameBackgroundContainer}>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        style={styles.containerHaveCoursed}
        contentContainerStyle={styles.contentContainerHaveCoursed}
        showsVerticalScrollIndicator={false}>
        <Menu {...props} />
        {
          !isLoading ?
            <React.Fragment>
              {
                (typeof courses !== 'undefined' && courses.length > 0) &&
                <View style={styles.courseContainer}>
                  <HaveCoursed onPressCourse={onPressCourse} courses={courses} {...props} />
                </View>
              }
              {
                (typeof courses === 'undefined' || !courses.length) &&
                <NotCoursed/>
              }
            </React.Fragment> : <ActivityIndicatorLoading/>
        }
      </ScrollView>
    </ImageBackground>
  )
}

CardCourseScreen.navigationOptions = (navigationData) => {
  const onPressGoToCreateCardCourse = () => navigationData.navigation.navigate('CreateCardCourse')

  return {
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerTintColor: 'white',
    headerTitle: 'Học phần cơ bản',
    headerRight: (
      <HeaderButtons
        title={'plus'}
        HeaderButtonComponent={CustomButtonFeather}>
        <Item
          label={'Plus Circle'}
          title="Plus Circle"
          iconName="plus-circle"
          onPress={onPressGoToCreateCardCourse}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  containerHaveCoursed: {
    flex: 1,
    backgroundColor: '#e3e7ea'
  },
  contentContainerHaveCoursed: {
    flex: 1,
    backgroundColor: '#e3e7ea'
  },
  flatListCourse: {
    flex: 1
  },
  courseText: {
    fontSize: Normalize(16),
    fontFamily: 'source-code-pro',
    paddingHorizontal: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  courseContainer: {
    flex: 1,
    backgroundColor: '#e3e7ea',
    paddingVertical: 20
  },
  frameBackgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#e3e7ea',
    padding: 20
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageNotFound: {
    flex: 1,
  }
})

export default CardCourseScreen
