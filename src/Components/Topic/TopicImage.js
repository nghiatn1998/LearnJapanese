import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'
import { Normalize } from '../../Themes'

const TopicImage = (props) => {
  const { title, mean, avatar, percent } = props
  return (
    <BackgroundImageContainer source={{ uri: avatar }}>
      <View style={styles.progressContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {
          mean &&
          <Text style={styles.mean}>
            {mean}
          </Text>
        }
      </View>
      <View style={styles.titleContainer}>
        {
          (percent !== undefined) &&
          <Text style={styles.percent}>
            {'Tiến độ học: ' + Math.round((percent + Number.EPSILON) * 100) / 100 + '%'}
          </Text>
        }
      </View>
    </BackgroundImageContainer>
  )
}

const BackgroundImageContainer = styled.ImageBackground`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 20px;
  justify-content: flex-end;
`

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  progressContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: Normalize(18),
    color: 'white',
    textAlign: 'center',
  },
  mean: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: 'white',
    textAlign: 'center',
    marginTop: 10
  },
  percent: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(16),
    color: 'white',
    textAlign: 'center',
    marginVertical: 10
  }
})

export default TopicImage
