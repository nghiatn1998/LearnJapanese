import React, {useEffect, useState} from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity, Alert, StatusBar
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {SafeAreaView} from 'react-navigation'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import FlipCard from 'react-native-flip-card'
import SwiperFlatList from 'react-native-swiper-flatlist'

import {HeaderButton} from 'react-navigation-header-buttons'
import {SimpleLineIcons, MaterialCommunityIcons, AntDesign, Feather, MaterialIcons, EvilIcons} from '@expo/vector-icons'
import Constants from 'expo-constants'

const {width, height} = Dimensions.get('window')

// Components
import {ActivityIndicatorLoading, HeaderButton as HeaderButtonCustomize} from '../../../Components'

// Action
import * as coursesActions from '../../../Store/Actions/Course'
import * as Speech from 'expo-speech'

// Style
import {ImagesGame, Normalize} from '../../../Themes'

const VocabularyForm = (props) => {
  const {vocabulary, speechVocabulary, mean} = props

  const speakVocabulary = () => speechVocabulary(vocabulary)

  return (
    <TouchableOpacity onPress={speakVocabulary} style={styles.buttonContainer}>
      <StatusBar barStyle={'light-content'} />
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{ width: '70%' }}>
          <Text style={{fontFamily: 'open-sans', fontSize: Normalize((24))}}>{vocabulary}</Text>
        </View>
        <View style={{width: '30%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
          <TouchableOpacity onPress={speakVocabulary}>
            <MaterialCommunityIcons
              name={'volume-high'}
              size={Normalize(24)}
              color={'black'}
            />
          </TouchableOpacity>
          <View style={{marginHorizontal: 5}}/>
          <TouchableOpacity>
            <EvilIcons
              name={'star'}
              size={Normalize(23)}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginBottom: 5}}/>
      <Text style={{fontFamily: 'open-sans', fontSize: Normalize((24))}}>{mean}</Text>
    </TouchableOpacity>
  )
}

const PaginationCustom = (props) => {
  const {
          size,
          paginationIndex
        } = props
  return (
    <View style={{marginTop: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{paginationIndex + 1}/{size}</Text>
    </View>
  )
}

const HeaderButtonCustom = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={SimpleLineIcons}
      iconSize={23}
      color={'white'}
    />
  )
}

const CourseIntroductionScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const courseSelected = useSelector(state => state.courses.courseSelected)
  const dispatch = useDispatch()
  const id = props.navigation.getParam('id')

  useEffect(() => {
    if (error) {
      Alert.alert('404 networking!', error, [{text: 'Okay'}])
    }
  }, [error])

  useEffect(() => {
    const getDetailCourses = async () => {
      try {
        await dispatch(coursesActions.getCourseDetail(id))
        setIsLoading(false)
      } catch (error) {
        setError(error)
        setIsLoading(false)
      }
    }

    getDetailCourses().then(() => {})
  }, [])


  const speechVocabulary = (vocabulary) => {
    Speech.speak(vocabulary, {
      language: 'ja'
    })
  }

  const renderVocabulary = ({item, index}) => {
    return (
      <ImageBackground source={ImagesGame.cardBackground} style={styles.imageBackgroundVocabulary}>
        <FlipCard
          key={'item' + index.toString()}
          style={styles.flipCardContainer}>
          {/* Face Side */}
          <ImageBackground source={ImagesGame.cardBackground} style={[styles.face, {justifyContent: 'center', alignItems: 'center', flex: 1}]}>
            <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(18)}}>{item.text}</Text>
          </ImageBackground>
          {/* Back Side */}
          <ImageBackground source={ImagesGame.flashCardBackground} style={[styles.back, {justifyContent: 'center', alignItems: 'center', flex: 1}]}>
            <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(18)}}>{item.mean}</Text>
          </ImageBackground>
        </FlipCard>
      </ImageBackground>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F2F2F4'}}>
      {
        !isLoading ?
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            {
              courseSelected ?
                <SwiperFlatList
                  showPagination
                  data={courseSelected.contents}
                  PaginationComponent={PaginationCustom}
                  renderItem={renderVocabulary}
                />
                : <View style={{alignItems: 'center', justifyContent: 'center', paddingTop: 30}}>
                  <Text>Not found any course.</Text>
                </View>
            }

            <View style={{marginBottom: 20}}/>

            <View style={{paddingHorizontal: 10}}>
              <View style={{
                paddingHorizontal: 10,
                backgroundColor: '#EBEBED',
                marginBottom: 20,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('LearnVocabularyScreen', { id })} style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingVertical: 10,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderBottomColor: '#73CCCD',
                  borderBottomWidth: 5
                }}>
                  <Feather
                    name={'share-2'}
                    size={Normalize(40)}
                    color={'#7279B2'}
                  />
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize(16), marginTop: 5}}>HỌC</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal: 5}}/>
                <TouchableOpacity style={{
                  flex: 1,
                  backgroundColor: 'white',
                  paddingVertical: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#73CCCD',
                  borderBottomWidth: 5
                }}>
                  <MaterialIcons
                    name={'sd-card'}
                    size={Normalize(40)}
                    color={'#7279B2'}
                  />
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize(16), marginTop: 5}}>THẺ GHI NHỚ</Text>
                </TouchableOpacity>
              </View>

              <View style={{
                paddingHorizontal: 10,
                backgroundColor: '#EBEBED',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <TouchableOpacity style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingVertical: 10,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderBottomColor: '#73CCCD',
                  borderBottomWidth: 5
                }}>
                  <AntDesign
                    name={'edit'}
                    size={Normalize(30)}
                    color={'#7279B2'}
                  />
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize(16), marginTop: 5}}>VIẾT</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal: 5}}/>
                <TouchableOpacity style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingVertical: 10,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderBottomColor: '#73CCCD',
                  borderBottomWidth: 5
                }}>
                  <MaterialCommunityIcons
                    name={'cards-outline'}
                    size={Normalize(30)}
                    color={'#7279B2'}
                  />
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize(16), marginTop: 5}}>GHÉP THẺ</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal: 5}}/>
                <TouchableOpacity onPress={() => {
                  props.navigation.navigate('CheckScreen')
                }} style={{
                  flex: 1,
                  justifyContent: 'center',
                  paddingVertical: 10,
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderBottomColor: '#73CCCD',
                  borderBottomWidth: 5
                }}>
                  <AntDesign
                    name={'filetext1'}
                    size={Normalize(30)}
                    color={'#7279B2'}
                  />
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize(16), marginTop: 5}}>KIỂM TRA</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
                marginVertical: 20
              }}>
                <Text style={{fontFamily: 'open-sans', fontSize: Normalize((16))}}>THUẬT NGỮ</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontFamily: 'open-sans', fontSize: Normalize((14))}}>Thứ tự gốc</Text>
                  <View style={{marginHorizontal: 5}}/>
                  <TouchableOpacity>
                    <MaterialIcons
                      name={'filter-list'}
                      size={Normalize(30)}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {
                courseSelected.contents.length ?
                  courseSelected.contents.map((course, index) => {
                    return (
                      <React.Fragment key={index.toString()}>
                        <VocabularyForm vocabulary={course.text} mean={course.mean} speechVocabulary={speechVocabulary}/>
                        <View style={{marginVertical: 10}}/>
                      </React.Fragment>
                    )
                  }) : null
              }
            </View>
          </ScrollView> : <ActivityIndicatorLoading/>
      }
    </SafeAreaView>
  )
}

CourseIntroductionScreen.navigationOptions = (navigationData) => {
  return {
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerTintColor: 'white',
    headerTitle: 'Học Phần',
    headerLeft: (
      <HeaderButtons title={'Back'} HeaderButtonComponent={HeaderButtonCustomize}>
        <Item label={'Back'} title="Back" iconName="arrow-back" onPress={() => {
          navigationData.navigation.pop()
        }}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons title={'Options'} HeaderButtonComponent={HeaderButtonCustom}>
        <Item label={'Options'} title="Options" iconName="options" onPress={() => {
        }}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ebebeb',
    padding: 8,
    height
  },
  flipCardContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  buttonContainer: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  imageBackgroundVocabulary: {
    width: width,
    height: height * 0.3
  }
})

export default CourseIntroductionScreen
