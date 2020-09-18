import React, { useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

// Components
import {HeaderButton, ActivityIndicatorLoading, TopicList} from '../../../Components'
import {useDispatch, useSelector} from 'react-redux'

// Actions
import * as topicsActions from '../../../Store/Actions/Topics'

// Functions
import { alertError } from '../../../Functions/alertFunction'

const TopicScreen = (props) => {
  const topics = useSelector(state => state.topics.topics)
  const { fetchingTopics, errorFetchingTopics} = useSelector(state => ({
    fetchingTopics: state.topics.fetchingTopics,
    errorFetchingTopics: state.topics.errorFetchingTopics
  }));
  const dispatch = useDispatch()

  useEffect(() => {
    const getTopics = async () => await dispatch(topicsActions.getTopics())
    getTopics().then(() => {})
  }, [])

  // useEffect(() => {
  //  if (!fetchingTopics && errorFetchingTopics) {
  //    alertError(null, errorFetchingTopics)
  //  }
  // }, [fetchingTopics, errorFetchingTopics])

  return (
    <View style={styles.mainContainer}>
      {
        fetchingTopics
          ? <ActivityIndicatorLoading />
          : <TopicList topics={topics} navigation={props.navigation} />
      }
    </View>
  )
}

TopicScreen.navigationOptions = (navigationData) => {
  const goBack = () => navigationData.navigation.pop()
  return {
    headerTitle: 'Danh sách chủ đề',
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
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  }
})

export default TopicScreen