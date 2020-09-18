import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import {AntDesign} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

// Styles
import {Colors, Normalize} from '../../../Themes'

// Components
import {HeaderButton} from '../../../Components'

// Actions
import * as authActions from '../../../Store/Actions/Authenticate'
import * as userActions from '../../../Store/Actions/User'

// Function
import {resetTo} from '../../../Navigation/NavigationActions'
import {NavigationActions} from "react-navigation"

const ProfileUserScreen = props => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const userInformation = useSelector(state => state.authenticate.userInformation)
  const dispatch = useDispatch()

  const logOut = () => {
    props.navigation.dispatch(resetTo('Authenticate'))
    dispatch(authActions.logout())
  }

  const selectedImage = async () => {
    await getPermissionAsync()
    try {
      setError(null)
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      })
      const {cancelled, uri} = result
      if (uri && !cancelled) {
        let localUri = result.uri
        let filename = localUri.split('/').pop()

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        // Upload the image using the fetch and FormData APIs
        let formData = new FormData()
        // Assume "photo" is the name of the form field the server expects
        formData.append('avatar', {uri: localUri, name: filename, type})

        await dispatch(userActions.changeAvatar(formData))
      } else {
      }
    } catch (error) {
      setError(error.message || error)
    }
  }

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!')
      }
    }
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{position: 'relative', flex: 1, backgroundColor: '#EEEEEE'}}>
        <View
          style={{
            overflow: 'hidden',
            alignItems: 'center',
            backgroundColor: 'white'
          }}
        >
          <TouchableOpacity onPress={selectedImage}>
            <Image
              borderRadius={50}
              resizeMode={'stretch'}
              source={{
                uri: userInformation.avatar
              }}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', backgroundColor: 'white'}}>
          <View style={{marginTop: 10}}/>
          <Text
            style={{fontFamily: 'source-code-pro-bold', fontSize: 23}}>{userInformation.username || 'Not Found'}</Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={{marginVertical: 10, backgroundColor: 'white'}}>
              <Text
                style={{
                  fontFamily: 'source-code-pro-bold',
                  fontSize: Normalize(15),
                  color: 'blue'
                }}
              >
                Xem hồ sơ
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              marginVertical: 15,
              borderBottomWidth: 1,
              marginTop: 20,
              borderTopWidth: 1,
              padding: 5,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              backgroundColor: 'white'
            }}
          >
            <View>
              <View
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: 'white'
                }}
              >
                <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(12)}} numberOfLines={1}>Email</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    numberOfLines={1}
                    style={{fontFamily: 'source-code-pro', color: 'blue', textAlign: 'right', marginRight: 10}}
                  >
                    {userInformation.email || 'Not Found'}
                  </Text>
                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ChangeUserNameScreen')
                }}
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(12)}}
                      numberOfLines={1}>Tên người dùng</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    numberOfLines={1}
                    style={{fontFamily: 'source-code-pro', color: 'blue', textAlign: 'right', marginRight: 10}}
                  >
                    {userInformation.username || 'Not found'}
                  </Text>

                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  margin: 10,
                  padding: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.nobel,
                  flexDirection: 'row',
                  justifyContent: 'center'
                }}
              >
                <View style={{flex: 3}}>
                  <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(12)}}>Thêm mật khẩu</Text>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <AntDesign name="right" size={15} color="black"/>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              padding: 15,
              backgroundColor: 'white'
            }}
          >
            <Text
              style={{fontFamily: 'source-code-pro', fontSize: Normalize(12), color: 'black'}}>Hình nền ban đêm</Text>
          </View>

          <View
            style={{
              marginVertical: 15,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              padding: 15,
              backgroundColor: 'white'
            }}
          >
            <Text style={{fontFamily: 'source-code-pro', fontSize: Normalize(12), color: 'black'}}>Giới thiệu</Text>
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderTopColor: Colors.nobel,
              borderBottomColor: Colors.nobel,
              padding: 15,
              marginBottom: 13,
              backgroundColor: 'white'
            }}
          >
            <Text
              style={{fontFamily: 'source-code-pro', fontSize: Normalize(12), color: 'black'}}>Trung tâm hỗ trợ</Text>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => { props.navigation.navigate('Study', {}, NavigationActions.navigate({ routeName: 'Courses' }))}}
          >
            <Text
              style={styles.text}>Đi tới Học</Text>
          </TouchableOpacity>

          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 10}}>
            <TouchableOpacity onPress={logOut}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: Colors.nobel,
                  borderBottomColor: Colors.nobel,
                  padding: 15,
                  backgroundColor: 'white'
                }}
              >
                <Text
                  style={{fontFamily: 'source-code-pro', fontSize: Normalize(12), color: 'red'}}>{'Đăng xuất'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

ProfileUserScreen.navigationOptions = () => {
  return {
    headerTitle: 'Hồ sơ',
    headerLeft: (
      <HeaderButtons title={'language'} HeaderButtonComponent={HeaderButton}>
        <Item label={'language'} title="Language" iconName="language" onPress={() => {}}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderBottomWidth: 1, borderTopWidth: 1,
    borderTopColor: Colors.nobel,
    borderBottomColor: Colors.nobel,
    padding: 15,
    marginBottom: 13,
    backgroundColor: 'white'
  },
  text: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
    color: 'blue'
  }
})

export default ProfileUserScreen
