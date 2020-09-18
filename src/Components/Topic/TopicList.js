import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import TopicItem from './TopicItem';

const TopicList = props => {
  const { topics } = props

  const renderTopicItem = itemData => {
    const onTopicSelected = () => {
      const { _id, title } = itemData.item
      props.navigation.navigate({
        routeName: 'CourseDetailScreen',
        params: {
          _id: _id,
          title: title,
        }
      })
    }
    return (
      <TopicItem
        key={itemData.item._id}
        title={itemData.item.title}
        mean={itemData.item.mean}
        avatar={itemData.item.avatar}
        percent={itemData.item.percent}
        onSelect={onTopicSelected}
      />
    );
  };

  return (
    <View style={styles.topic}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        data={topics}
        keyExtractor={(item, index) => item._id + index.toString()}
        renderItem={renderTopicItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  flatList: {
    width: '100%'
  },
  flatListContainer: {
    marginHorizontal: 10,
    marginBottom: 10
  }
});

export default TopicList;
