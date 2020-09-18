import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar
} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {HeaderButton} from 'react-navigation-header-buttons'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import {AntDesign, Ionicons} from '@expo/vector-icons'

// Styles
import {ImagesStudy, Normalize} from '../../../Themes'

// Components
import {ActivityIndicatorLoading, AnimationLottie} from '../../../Components'

// Actions
import * as coursesActions from '../../../Store/Actions/Course'

// Hook
import {useDidUpdate} from '../../../Functions/customHook'
import {alertError, alertOk} from '../../../Functions/alertFunction'

// Header Button Custom Components
const HeaderButtonAntDesign = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AntDesign}
      iconSize={23}
      color={'white'}
    />
  )
}
const HeaderButtonIonicons = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={'white'}
    />
  )
}

const LearnVocabularyScreen = (props) => {
  const [learn, setLearn] = useState({
    isLoading: false,
    numberQuestion: 0,
    checkAnswer: null
  })
  const courseLearned = useSelector(state => state.courses.courseLearned)
  const {fetchingCourseLearned, errorFetchingCourseLearned} = useSelector(state => ({
    fetchingCourseLearned: state.courses.fetchingCourseLearned,
    errorFetchingCourseLearned: state.courses.errorFetchingCourseLearned
  }))
  const dispatch = useDispatch()

  useEffect(() => {
    StatusBar.setBarStyle('light-content')
    const getCourseLearned = async () => {
      const id = props.navigation.getParam('id')
      await dispatch(coursesActions.getCourseLearned(id))
    }
    getCourseLearned().then(() => {})
  }, [])

  useDidUpdate(() => {
    if (!fetchingCourseLearned && errorFetchingCourseLearned) {
      alertError(null, errorFetchingCourseLearned)
    }
  }, [fetchingCourseLearned, errorFetchingCourseLearned])

  const checkQuestion = (id) => {
    const {answer_id} = courseLearned[learn.numberQuestion]
    if (id !== answer_id) {
      setLearn((prevState) => ({
        ...prevState,
        checkAnswer: false,
        isLoading: true,
      }))
      if (learn.numberQuestion + 1 === courseLearned.length) {
        setTimeout(() => {
          setLearn((prevState) => ({
            ...prevState,
            isLoading: false
          }))
          props.navigation.pop()
          alertOk('Finished Game')
        }, 1000)
      } else {
        setTimeout(() => {
          setLearn((prevState) => ({
            ...prevState,
            isLoading: false,
            numberQuestion: prevState.numberQuestion + 1
          }))
        }, 1000)
      }
    } else {
      setLearn((prevState) => ({
        ...prevState,
        checkAnswer: true,
        isLoading: true
      }))
      if (learn.numberQuestion + 1 === courseLearned.length) {
        setTimeout(() => {
          setLearn((prevState) => ({
            ...prevState,
            isLoading: false
          }))
          props.navigation.pop()
          alertOk('Finished Game')
        }, 800)
      } else {
        setTimeout(() => {
          setLearn((prevState) => ({
            ...prevState,
            numberQuestion: prevState.numberQuestion + 1,
            isLoading: false
          }))
        }, 800)
      }
    }
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      {
        (!fetchingCourseLearned && courseLearned) &&
        <React.Fragment>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{
              fontFamily: 'source-code-pro',
              fontSize: Normalize(16)
            }}>{courseLearned[learn.numberQuestion].question}</Text>
          </View>
          {
            courseLearned[learn.numberQuestion].answers.map((answer, index) => {
              return (
                <TouchableOpacity key={'Answer ' + index} onPress={() => checkQuestion(index)}
                                  style={styles.buttonContainer}>
                  <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(16)}}>{answer}</Text>
                </TouchableOpacity>
              )
            })
          }
        </React.Fragment>
      }
      {
        fetchingCourseLearned &&
        <ActivityIndicatorLoading/>
      }
      {
        (learn && learn.isLoading) &&
        <AnimationLottie
          source={learn.checkAnswer ? ImagesStudy.animationCheckDone : ImagesStudy.animationCheckIncorrect}
          stylesContainer={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      }
    </SafeAreaView>
  )
}

LearnVocabularyScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'Học Từ Vựng',
    headerLeft: (
      <HeaderButtons title={'Close'} HeaderButtonComponent={HeaderButtonAntDesign}>
        <Item label={'Close'} title="Close" iconName="close" onPress={() => {
          navigationData.navigation.pop()
        }}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons title={'Options'} HeaderButtonComponent={HeaderButtonIonicons}>
        <Item label={'Options'} title="Options" iconName="ios-options" onPress={() => {
        }}/>
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerTintColor: 'white',
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  buttonContainer: {
    marginHorizontal: 15,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'green'
  }
})

export default LearnVocabularyScreen
