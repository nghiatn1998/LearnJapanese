import React, { useRef, useState, useEffect, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import * as Speech from 'expo-speech'
import { Transition, Transitioning } from 'react-native-reanimated'

const { width } = Dimensions.get('window');

// Config
import AlphabetConfig from '../../../Config/AlphabetConfig'

// Components
import DHeader from '../../../Components/Header/DHeader'

// Actions
import * as alphabetActions from '../../../Store/Actions/Alphabet'
import {Normalize} from '../../../Themes'

const AlphabetScreen = ({ navigation }) => {
  const ref = useRef(null);
  const transition = (
    <Transition.Together>
      {/* <Transition.In type={'slide-right'} durationMs={2000} interpolation={'easeInOut'} /> */}
      <Transition.In type={'fade'} durationMs={1000} />
      <Transition.Change />
      <Transition.Out type={'fade'} duration={1000} />
    </Transition.Together>
  )

  const dispatch = useDispatch()

  const [type, setType] = useState(AlphabetConfig.HIRAGANA)
  const [selectedTab, setSelectedTab] = useState(0);

  const listAlphabetHiraganaData = useSelector(state => state.alphabet.listAlphabetHiraganaData)
  const listAlphabetKatakanaData = useSelector(state => state.alphabet.listAlphabetKatakanaData)

  useEffect(() => {
    dispatch(alphabetActions.getAlphabet(AlphabetConfig.HIRAGANA))
    dispatch(alphabetActions.getAlphabet(AlphabetConfig.KATAKANA))
  }, [])

  const onChangeSelectedTab = (tabIndex) => {
    ref.current.animateNextTransition()
    setSelectedTab(tabIndex)
  }
  const speechVocabulary = (vocabulary) => {
    Speech.speak(vocabulary, {
      language: 'ja'
    })
  }
  const onPressGoBack = () => navigation.goBack()
  const onPressHiragana = () => setType(AlphabetConfig.HIRAGANA)
  const onPressKatakana = () => setType(AlphabetConfig.KATAKANA)
  const renderAlphabet = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => speechVocabulary(item.japaneseLetter)}
        key={'alphabet' + index.toString()}
        style={styles.alphabetContainer}
      >
        <Text style={styles.textJapaneseLetter}>{item.japaneseLetter}</Text>
        <Text style={styles.textTranslateLetter}>{item.translateLetter}</Text>
      </TouchableOpacity>
    )
  }
  const renderTabOneActive = () => {
    return (
      <Fragment>
        <TouchableOpacity style={styles.hiraganaContainer} onPress={onPressHiragana}>
          <Text style={styles.textButtonHiragana}>{'Hiragana'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.katakanaContainer} onPress={onPressKatakana}>
          <Text style={styles.textButtonKatakana}>{'Katakana'}</Text>
        </TouchableOpacity>
      </Fragment>
    )
  }
  const renderTabTwoActive = () => {
    return (
      <Fragment>
        <TouchableOpacity style={styles.katakanaContainer} onPress={onPressHiragana}>
          <Text style={styles.textButtonKatakana}>{'Hiragana'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hiraganaContainer} onPress={onPressKatakana}>
          <Text style={styles.textButtonHiragana}>{'Katakana'}</Text>
        </TouchableOpacity>
      </Fragment>
    )
  }

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [])

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      <View style={styles.space} />
      <DHeader titleLeft={'ALPHABETS'} onPressLeft={onPressGoBack} />
      {/* Solution 1 */}
      {/* <View style={styles.buttonContainer}>*/}
      {/*  {type === AlphabetConfig.HIRAGANA ? renderTabOneActive() : renderTabTwoActive()}*/}
      {/*</View> */}

      {/* Solution 2 */}
      <View style={styles.tabContainer}>
        <View
          style={[styles.tabSelectedContainer, {
            left: selectedTab === 0 ? 0 : null,
            right: selectedTab === 1 ? 0 : null
          }]}
        />
        <TouchableOpacity style={[styles.buttonTabContainer]} onPress={() => onChangeSelectedTab(0)}>
          <Text style={[styles.text, { color: selectedTab === 0 ? 'white' : 'black' }]}>{'Hiragana'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonTabContainer]} onPress={() => onChangeSelectedTab(1)}>
          <Text style={[styles.text, { color: selectedTab === 1 ? 'white' : 'black' }]}>{'Katakana'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={5}
          style={styles.flatList}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, index) => index.toString()}
          extraData={type}
          data={selectedTab === 0 ? listAlphabetHiraganaData : listAlphabetKatakanaData}
          renderItem={renderAlphabet}
        />
      </View>
    </Transitioning.View>
  )
}

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'grey',
    borderWidth: 1
  },
   tabSelectedContainer: {
    position: 'absolute',
    height: Normalize(70),
    width: (width - 30) / 2,
    backgroundColor: '#860502'
   },
  container: {
    flex: 1
  },
  text: {
    fontFamily: 'source-code-pro',
    fontSize: 20,
  },
  flatList: {
    flex: 1,
    marginVertical: 10
  },
  contentContainer: {
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  space: {
    marginTop: 10
  },
  alphabetContainer: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginRight: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#860502',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textJapaneseLetter: {
    fontFamily: 'source-code-pro',
    fontSize: 16,
    color: 'black'
  },
  textTranslateLetter: {
    fontFamily: 'source-code-pro',
    fontSize: 14,
    color: '#fa663b'
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'black'
  },
  buttonTabContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiraganaContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#860502'
    // backgroundColor: '#209688'
  },
  textButtonHiragana: {
    fontFamily: 'source-code-pro',
    fontSize: 20,
    color: '#FFFFFF'
  },
  katakanaContainer: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE'
  },
  textButtonKatakana: {
    fontFamily: 'source-code-pro',
    fontSize: 20,
    color: 'black'
  }
})

AlphabetScreen.navigationOptions = {
  header: null
}

export default AlphabetScreen
