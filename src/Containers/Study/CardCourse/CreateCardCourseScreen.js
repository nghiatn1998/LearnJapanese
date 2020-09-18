import React, {useState, useEffect, useCallback} from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView, StatusBar
} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import {AntDesign} from '@expo/vector-icons'

// Styles
import {Colors, Normalize} from '../../../Themes'

// Components
import {ActivityIndicatorLoading, HeaderButton} from '../../../Components'

// Actions
import * as courseActions from '../../../Store/Actions/Course'

// Functions
import {alertOk} from '../../../Functions/alertFunction'
import {useDidUpdate} from '../../../Functions/customHook'

// Title Vocabulary Component
const TitleVocabularyComponent = (props) => {
  const {initialValueTitle, initialValueDescription, inputHeaderChangeHandler} = props
  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={[styles.input, {marginBottom: 5}]}
        onChangeText={(value) => inputHeaderChangeHandler('title', value)}
        value={initialValueTitle}
        autoCorrect={false}
        placeholder="Chủ đề, chương, đơn vị"
        placeholderTextColor={Colors.steel}
        underlineColorAndroid={'yellow'}
      />
      <Text style={[styles.labelHeader, {marginBottom: 10}]}>TIÊU ĐỀ</Text>

      <TextInput
        {...props}
        style={[styles.input, {marginBottom: 5}]}
        onChangeText={(value) => inputHeaderChangeHandler('description', value)}
        value={initialValueDescription}
        autoCorrect={false}
        placeholder="Học phần của bạn có chủ đề gì ?"
        placeholderTextColor={Colors.steel}
        underlineColorAndroid={'yellow'}
      />
      <Text style={styles.labelHeader}>MÔ TẢ</Text>
    </View>
  )
}

// Vocabulary Component
const VocabularyForm = (props) => {
  const {identifierTerminology, identifierMean, initialValueTerminology, initialValueMean, inputChangeHandler} = props
  return (
    <View style={styles.vocabularyContainer}>
      <TextInput
        {...props}
        id={identifierTerminology}
        name={identifierTerminology}
        autoCorrect={false}
        style={[styles.input, {marginBottom: 5}]}
        value={initialValueTerminology}
        onChangeText={(value) => inputChangeHandler(identifierTerminology, value)}
        placeholderTextColor={Colors.steel}
        underlineColorAndroid={'yellow'}
      />
      <Text style={[styles.label, {marginBottom: 10}]}>THUẬT NGỮ</Text>

      <TextInput
        {...props}
        id={identifierMean}
        name={identifierMean}
        autoCorrect={false}
        style={[styles.input, {marginBottom: 5}]}
        value={initialValueMean}
        onChangeText={(value) => inputChangeHandler(identifierMean, value)}
        placeholderTextColor={Colors.steel}
        underlineColorAndroid={'yellow'}
      />
      <Text style={[styles.label, {marginBottom: 5}]}>ĐỊNH NGHĨA</Text>
    </View>
  )
}

const CreateCardCourseScreen = (props) => {
  const blankVocabulary = {terminology: '', mean: ''}
  const defaultBlankVocabulary = [{...blankVocabulary}, {...blankVocabulary}]
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [vocabularyState, setVocabularyState] = useState(defaultBlankVocabulary)
  const {
          fetchingCreateCourse,
          fetchingCreateCourseSuccess,
          errorFetchingCreateCourse
        } = useSelector(state => ({
    fetchingCreateCourse: state.courses.fetchingCreateCourse,
    fetchingCreateCourseSuccess: state.courses.fetchingCreateCourseSuccess,
    errorFetchingCreateCourse: state.courses.errorFetchingCreateCourse
  }))
  const dispatch = useDispatch()

  const onCreateVocabularyHandler = useCallback(async () => {
    const content = vocabularyState.map((vocabulary) => {
      return (
        {
          text: vocabulary.terminology,
          mean: vocabulary.mean
        }
      )
    })
    await dispatch(courseActions.createCourse(title, content))
  }, [vocabularyState])

  useEffect(() => {
    props.navigation.setParams({
      createVocabulary: onCreateVocabularyHandler
    })
  }, [onCreateVocabularyHandler])

  useDidUpdate(() => {
    if (fetchingCreateCourseSuccess && !fetchingCreateCourse && !errorFetchingCreateCourse) {
      alertOk(null, 'Course have been created success!')
      props.navigation.navigate('HomeScreen')
      setTitle('')
      setDescription('')
      setVocabularyState(defaultBlankVocabulary)
    }
    if (errorFetchingCreateCourse) {
      alertOk(null, 'Invalid input, please input correct!')
    }
  }, [fetchingCreateCourseSuccess, fetchingCreateCourse, errorFetchingCreateCourse])

  const addNewVocabulary = () => setVocabularyState([...vocabularyState, {...blankVocabulary}])

  const inputHeaderChangeHandler = (identifier, value) => {
    if (identifier === 'title') {
      setTitle(value)
    } else {
      setDescription(value)
    }
  }

  const inputVocabularyChangeHandler = (identifier, value) => {
    const identifierName = identifier.substr(0, identifier.indexOf('-'))
    const identifierIndex = identifier.split('-')[1]

    const vocabularyStateArray = [...vocabularyState]
    vocabularyStateArray[identifierIndex] = {
      ...vocabularyStateArray[identifierIndex],
      [identifierName]: value
    }

    setVocabularyState(vocabularyStateArray)
  }

  const renderInputVocabulary = ({item, index}) => {
    const terminologyId = `terminology-${index}`
    const meanId = `mean-${index}`
    return (
      <VocabularyForm
        key={index}
        identifierTerminology={terminologyId}
        identifierMean={meanId}
        initialValueTerminology={item.terminology}
        initialValueMean={item.mean}
        inputChangeHandler={inputVocabularyChangeHandler}
      />
    )
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      {
        fetchingCreateCourse
          ? <ActivityIndicatorLoading />
          : <KeyboardAvoidingView
            behavior={'padding'}
            style={styles.inputContainer}
            contentContainerStyle={styles.contentContainer}>
            <TitleVocabularyComponent
              initialValueTitle={title}
              initialValueDescription={description}
              inputHeaderChangeHandler={inputHeaderChangeHandler}
            />
            <FlatList
              data={vocabularyState}
              style={styles.flatListContainer}
              renderItem={renderInputVocabulary}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.createContainer}>
              <TouchableOpacity onPress={addNewVocabulary} style={styles.buttonCreateContainer}>
                <AntDesign name="plus" size={Normalize(22)} color='white'/>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
      }
    </View>
  )
}

CreateCardCourseScreen.navigationOptions = navigationData => {
  const createVocabulary = navigationData.navigation.getParam('createVocabulary')
  const goBackScreen = () => navigationData.navigation.pop()
  return {
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerTintColor: 'white',
    headerTitle: 'Tạo học phần',
    headerLeft: (
      <HeaderButtons title={'Back'} HeaderButtonComponent={HeaderButton}>
        <Item
          label={'Back'}
          title="Back"
          iconName="arrow-back"
          onPress={goBackScreen}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <TouchableOpacity onPress={createVocabulary}>
        <View style={styles.buttonCreateTermContainer}>
          <Text style={styles.buttonContainer}>Xong</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  labelHeader: {
    fontFamily: 'source-code-pro-bold',
    fontSize: Normalize(14),
    color: 'black'
  },
  contentContainer: {
    flex: 1
  },
  buttonCreateTermContainer: {
    paddingHorizontal: 20
  },
  label: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(13),
    color: 'black'
  },
  inputContainer: {
    flex: 1
  },
  input: {
    paddingVertical: 5,
    borderColor: 'black',
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
    borderBottomWidth: 1,
    borderRadius: 5
  },
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.snow,
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 5,
    borderColor: 'blue',
    borderWidth: 1
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.pattensBlue
  },
  flatListContainer: {
    flex: 1,
    marginBottom: 10 + Normalize(50)
  },
  buttonContainer: {
    fontFamily: 'open-sans-bold',
    color: Colors.snow,
    fontSize: Normalize(14)
  },
  buttonCreateContainer: {
    backgroundColor: '#860502',
    width: Normalize(40),
    height: Normalize(40),
    borderRadius: Normalize(40 / 2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  createContainer: {
    marginBottom: 20,
    // paddingVertical: 10,
    width: '100%',
    // backgroundColor: '#860502',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  },
  vocabularyContainer: {
    backgroundColor: Colors.snow,
    marginHorizontal: 5,
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderWidth: 1,
    borderColor: 'black',
    shadowOpacity: 0.2,
    shadowColor: Colors.darkGray
  }
})

export default CreateCardCourseScreen
