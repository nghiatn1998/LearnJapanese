import React, { lazy, Suspense } from 'react'
import styled from 'styled-components'
import {
  View,
  StyleSheet,
} from 'react-native'

// Component
const TopicImageLazy = lazy(() => import('./TopicImage'))

const TopicItem = props => {
  const { title, mean, avatar, percent, onSelect } = props
  return (
    <TopicButtonContainer onPress={onSelect}>
      <View style={styles.cardContainer}>
        <Suspense fallback={null}>
          <TopicImageLazy
            avatar={avatar}
            title={title}
            mean={mean}
            percent={percent}
          />
        </Suspense>
      </View>
    </TopicButtonContainer>
  )
}

const TopicButtonContainer = styled.TouchableOpacity`
  width: 100%;
  height: 250;
  background: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 0 10px gray;
  margin: 15px 0px;
`

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20
  },
})

export default TopicItem
