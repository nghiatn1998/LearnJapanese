import React, { useEffect, lazy, Suspense } from 'react'
import {View, TouchableOpacity, FlatList, StyleSheet, StatusBar} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Entypo} from '@expo/vector-icons'
import * as Speech from 'expo-speech'

// Components
import {HeaderButton, ActivityIndicatorLoading} from '../../../Components'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import * as topicsActions from '../../../Store/Actions/Topics'

// Functions
import { alertError } from '../../../Functions/alertFunction'

// Style
import { Normalize } from '../../../Themes'

// Lazy
const TopicDetailImageLazy = lazy(() => import('../../../Components/Topic/TopicDetailImage'))

const CourseDetailScreen = (props) => {
  const topicId = props.navigation.getParam('_id')
  const topicDetail = useSelector(state => state.topics.topicDetail)
  const { fetchingTopicDetail, errorFetchingTopicDetail } = useSelector(state => ({
    fetchingTopicDetail: state.topics.fetchingTopicDetail,
    errorFetchingTopicDetail: state.topics.errorFetchingTopicDetail
  }));
  const dispatch = useDispatch()

  useEffect(() => {
    const getTopicDetail = async (topicId) => await dispatch(topicsActions.getTopicDetail(topicId))
    getTopicDetail(topicId).then(() => {})
  }, [])

  useEffect(() => {
    if (!fetchingTopicDetail && errorFetchingTopicDetail) {
      alertError(null, errorFetchingTopicDetail)
    }
  }, [fetchingTopicDetail, errorFetchingTopicDetail])

  const pronounceHandler = (vocabulary) => {
    Speech.speak(vocabulary, {
      language: 'ja'
    })
  }

  const renderVocabulary = ({ item, index }) => {
    return (
      <Suspense
        //fallback={
        //  <Image
        //    source={ImagesGame.loading}
        //    style={{ width: 60, height: 60 }}
        //  />
        //}
        fallback={null}>
        <TopicDetailImageLazy
          key={'TopicDetailImage' + index.toString()}
          text={item.text}
          meaning={item.meaning}
          avatar={item.avatar}
          pronounceHandler={pronounceHandler}
        />
      </Suspense>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} />
      {
        fetchingTopicDetail
          ? <ActivityIndicatorLoading />
          : <FlatList
            style={styles.flatListVocabulary}
            data={topicDetail && topicDetail.vocabularies}
            renderItem={renderVocabulary}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
            removeClippedSubviews={false}
            {...this.props}
          />
      }
    </View>
  )
}

CourseDetailScreen.navigationOptions = (navigationData) => {
  // const title = navigationData.navigation.getParam('title')
  const topicId = navigationData.navigation.getParam('_id')
  const learnTopic = () => {
    navigationData.navigation.navigate('LearnCourseDetailScreen', {id: topicId})
  }
  const goBack = () => navigationData.navigation.pop()

  return {
    headerTitle: 'Vocabulary',
    headerStyle: {
      backgroundColor: '#000068'
    },
    headerTitleStyle: {
      fontFamily: 'source-code-pro-bold'
    },
    headerLeft: (
      <HeaderButtons
        title={'Back'}
        HeaderButtonComponent={HeaderButton}>
        <Item
          label={'Back'}
          title="Back"
          iconName="arrow-back"
          onPress={goBack}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={learnTopic}
        style={styles.learnVocabulary}>
        <Entypo
          name="open-book"
          size={Normalize(25)}
          color="white"
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  flatListVocabulary: {
    flex: 1
  },
  mainContainer: {
    flex: 1
  },
  learnVocabulary: {
    marginRight: 20
  },
})

export default CourseDetailScreen
