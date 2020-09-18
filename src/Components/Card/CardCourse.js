import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from 'react-native'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import Swipeout from 'react-native-swipeout'
import {useDispatch, useSelector} from 'react-redux'

// Styles
import {ImagesGame, Normalize} from '../../Themes'

//Action
import * as coursesActions from '../../Store/Actions/Course'

const CardCourse = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {title, vocabularyQuantity, onPress} = props
  // const username = useSelector(state => state.authenticate.userInformation.username)
  const dispatch = useDispatch()

  const deleteCourse = async (id) => {
    setError(null)
    setIsLoading(true)
    try {
      await dispatch(coursesActions.deleteCourse(id))
      setIsLoading(false)
    } catch (error) {
      setError(error.message || error)
      setIsLoading(false)
    }
  }

  const confirmDeleteCourse = () => {
    Alert.alert('Alert', 'Are you sure you want to delete?',
      [
        { text: 'No', onPress: () => {}, style: 'cancel' },
        {
          text: 'Yes', onPress: () => {
            deleteCourse(props._id).then(() => {
            })
          }
        }
      ],
      {cancelable: true}
    )
  }

  useEffect(() => {
    if (error) {
      Alert.alert(error.message || error, [{text: 'Okay'}])
    }
  }, [error])

  const swipeSettings = {
    autoClose: true,
    left: null,
    right: [
      {
        component: (
          <View style={styles.swipeContainer}>
            <TouchableOpacity onPress={confirmDeleteCourse} style={styles.buttonContainer}>
              <AntDesign name="close" size={Normalize(20)} color='white'/>
            </TouchableOpacity>
          </View>
        )
      }
    ],
    rowId: props.index,
    sectionId: 1
  }

  return (
    !isLoading
      ? <Swipeout style={styles.swipeOutContainer} {...swipeSettings}>
        <TouchableOpacity onPress={onPress} style={styles.buttonCardContainer}>
          <ButtonCard
            source={ImagesGame.flashCardBackground}
            style={styles.cardContainer}>
            <View>
              <Text style={styles.title}>
                {title || 'Not Title'}
              </Text>
              <View style={styles.vertical}/>
              <Text style={styles.description}>
                {vocabularyQuantity} thuật ngữ
              </Text>
              <View style={styles.iconContainer}>
                <FontAwesome name="user-o" size={Normalize(15)} color="black"/>
                <View style={styles.horizontal}/>
                <Text>{'Anonymous'}</Text>
              </View>
            </View>
            <View style={styles.verticalLarge}/>
          </ButtonCard>
        </TouchableOpacity>
      </Swipeout> : <ActivityIndicator size={'large'} style={{marginVertical: 10}}/>
  )
}

const ButtonCard = styled.ImageBackground`
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 10px 10px 5px gray;
  margin-right: 20px;
  margin-left: 20px; 
  margin-bottom: 20px;
`

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20
  },
  buttonCardContainer: {
    flex: 1,
    backgroundColor: '#e3e7ea'
  },
  swipeOutContainer: {
    flex: 1,
    backgroundColor: '#e3e7ea'
  },
  swipeContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e3e7ea'
  },
  buttonContainer: {
    width: Normalize(40),
    height: Normalize(40),
    borderRadius: Normalize(40 / 2),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: Normalize(21)
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: Normalize(15)
  },
  vertical: {
    marginVertical: 5
  },
  verticalLarge: {
    marginVertical: 10
  },
  horizontal: {
    marginHorizontal: 5
  }
})

export default CardCourse
