import React from 'react'
import styled from 'styled-components'
import {View, StyleSheet} from 'react-native'

// Styles
import {ImagesStudy} from '../../Themes'

const CardOption = (props) => {
  const { title, subtitle, image, onPress } = props
  return (
    <GameContainer onPress={onPress}>
      <Image source={image} />
      <Logo
        source={ImagesStudy.logoReact}
        resizeMode="contain"
      />
      <View style={styles.backgroundContainer}>
        <Subtitle>{subtitle}</Subtitle>
        <Title>{title}</Title>
      </View>
    </GameContainer>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    paddingTop: 20,
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

const GameContainer = styled.TouchableOpacity`
  width: 335px;
  height: 335px;
  background: white;
  margin: 10px 0px;
  border-radius: 15px;
  box-shadow: 0 0 10px gray;
  justify-content: flex-end;
`

const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`

const Title = styled.Text`
  font-size: 24px;
  color: white;
  margin-top: 4px;
  margin-bottom: 20px;
  margin-left: 20px;
  width: 300px;
`

const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  width: 335px;
  margin-left: 20px;
  margin-right: 20px;
`

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  position: absolute;
`

export default CardOption