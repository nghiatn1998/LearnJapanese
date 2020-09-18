import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from 'react-native'
import {HeaderButtons, HeaderButton, Item} from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import {SimpleLineIcons, AntDesign} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

// Styles
import {Colors, Normalize} from '../../../Themes'

// Actions
import * as authActions from '../../../Store/Actions/Authenticate'
import * as userActions from '../../../Store/Actions/User'

// Function
import {resetTo} from '../../../Navigation/NavigationActions'
import {NavigationActions} from "react-navigation"
import {ifIphoneX} from 'react-native-iphone-x-helper'

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={SimpleLineIcons}
      iconSize={Normalize(23)}
      color={'white'}
    />
  );
};

const SettingGameScreen = props => {
  const [timeChallenge, setTimeChallenge] = useState(false)
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.textSettings}>SETTINGS</Text>
      <View style={styles.settingContainer}>
        <Text style={styles.challengeText}>Time Challenge</Text>
        <Switch
          value={timeChallenge}
          onValueChange={newValue => setTimeChallenge(newValue)}
        />
      </View>
      <TouchableOpacity style={styles.settingContainer}>
        <Text style={styles.challengeText}>Quantity Images</Text>
        <View style={styles.imageContainer}>
          <Text style={styles.quantityAnswers}>4</Text>
          <AntDesign
            name="right"
            size={Normalize(15)}
            color='black'
          />
        </View>
      </TouchableOpacity>

      <Text style={styles.textSettings}>ABOUT US</Text>
      <TouchableOpacity style={styles.aboutUsContainer}>
        <Text style={styles.helpText}>Need help?</Text>
        <Text style={styles.emailSupport}>Email: support@nghia.nguyen1998.com</Text>
      </TouchableOpacity>
    </View>
  )
}

SettingGameScreen.navigationOptions = navigationData => {
  return {
    headerTitle: 'Settings',
    headerRight: (
      <HeaderButtons title={'Check'} HeaderButtonComponent={CustomHeaderButton}>
        <Item label={'Check'} title="Check" iconName="check" onPress={() => {}}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#dedede'
  },
  quantityAnswers: {
    fontSize: Normalize(18),
    fontFamily: 'source-code-pro'
  },
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10
  },
  helpText: {
    fontSize: Normalize(15),
    fontFamily: 'source-code-pro',
    marginBottom: 5
  },
  emailSupport: {
    fontSize: Normalize(13),
    fontFamily: 'source-code-pro'
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  challengeText: {
    fontSize: Normalize(18),
    fontFamily: 'source-code-pro'
  },
  settingContainer: {
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  aboutUsContainer: {
    borderWidth: 1,
    borderColor: '#dedede',
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  textSettings: {
    fontSize: Normalize(18),
    fontFamily: 'source-code-pro',
    marginTop: 15,
    color: 'black',
    paddingHorizontal: 20
  }
})

export default SettingGameScreen
