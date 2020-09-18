import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

// Components
import { DRoundedButton } from '../../../../Components'

// Style
import {Metrics, Normalize, Colors, ImagesStudy} from '../../../../Themes'
const styles = StyleSheet.create({
  content: {
    flex: 2 / 5,
    paddingHorizontal: Metrics.tripleBaseMargin,
    justifyContent: 'center'
  },
  appleButton: {
    width: Metrics.screenWidth - 60,
    height: Normalize(50),
    paddingHorizontal: Normalize(Metrics.doubleBaseMargin),
    paddingVertical: Normalize(Metrics.spaceMargin),
    marginBottom: Metrics.baseMargin
  },
  facebookButton: {
    backgroundColor: Colors.windsor,
    marginBottom: Metrics.baseMargin
  },
  wrapButtonSignIn: {
    alignItems: 'center',
    marginTop: Metrics.doubleBaseMargin
  },
  fbIcon: {
    marginRight: Metrics.smallMargin,
    width: Normalize(15),
    height: Normalize(17)
  },
  textRegisterByEmail: {
    fontFamily: 'source-code-pro',
    fontSize: Normalize(12),
    color: Colors.white
  },
  textLogin: {
    fontFamily: 'source-code-pro-bold',
    fontSize: Normalize(12),
    color: Colors.greyChateau,
    marginTop: Metrics.doubleBaseMargin,
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  textBottom: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(12),
    color: Colors.madison,
    textAlign: 'center'
  },
  textUnderline: {
    fontFamily: 'SFProText-Bold',
    fontSize: Normalize(12),
    color: Colors.madison,
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
})

const DSignUpButton = (props) => {
  const {
    onPressSignUp, onPressConnectFB, onPressSignIn,
    onPressTermsAndConditions, onPressPrivacyPolicy
  } = props

  return (
    <View style={styles.content}>
      <DRoundedButton
        icon={ImagesStudy.facebook}
        iconStyle={styles.fbIcon}
        buttonStyle={styles.facebookButton}
        title={'Connect with facebook'}
        onPress={onPressConnectFB}
      />
      <DRoundedButton
        title={'Sign up with email'}
        onPress={onPressSignUp}
        textStyle={styles.textRegisterByEmail}
      />
      <TouchableOpacity onPress={onPressSignIn}>
        <Text style={styles.textLogin}>{'I already have an account'}</Text>
      </TouchableOpacity>
    </View>
  )
}

DSignUpButton.propTypes = {
  onPressSignUp: PropTypes.func,
  onPressConnectFB: PropTypes.func,
  onPressSignIn: PropTypes.func,
  onPressTermsAndConditions: PropTypes.func,
  onPressPrivacyPolicy: PropTypes.func
}

export default DSignUpButton
