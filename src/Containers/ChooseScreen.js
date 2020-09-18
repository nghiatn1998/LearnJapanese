import React, { useEffect }  from 'react'
import {
  ScrollView,
  StyleSheet,
  StatusBar
} from 'react-native'
import {SafeAreaView} from 'react-navigation'

// Components
import { CardOption } from '../Components'

// I18n
import {ImagesStudy} from '../Themes'

const ChooseScreen = (props) => {
  const onPressBattleOnline = () => props.navigation.navigate('Main')
  const onPressEnvironment = () => props.navigation.navigate('Game')
  const onPressGame = () => props.navigation.navigate('Study')

  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
  }, [])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <CardOption
          title={'Chơi game với các người chơi khác để kiểm tra trình độ của mình.'}
          subtitle={'Battle Online'}
          image={ImagesStudy.backgroundBattle}
          onPress={onPressBattleOnline}
        />
        <CardOption
          title={'Tạo từ vựng, flash card và chơi game để ghi nhớ vốn từ vựng mới của bạn..'}
          subtitle={'Environment'}
          image={ImagesStudy.backgroundJapaneseGame}
          onPress={onPressEnvironment}
        />
        <CardOption
          title={'Học theo lộ trình, chủ đề để nâng cao để nâng cao vốn từ vựng.'}
          subtitle={'Study'}
          image={ImagesStudy.backgroundJapaneseStudy}
          onPress={onPressGame}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  contentContainer: {
    alignItems: 'center'
  },
  backgroundContainer: {
    paddingTop: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})

export default ChooseScreen
