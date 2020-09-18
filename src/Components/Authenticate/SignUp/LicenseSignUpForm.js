import React from 'react'
import {ActivityIndicator, Text, StyleSheet, TouchableOpacity, View} from 'react-native'

// Styles
import {Colors, Normalize} from '../../../Themes'

const LicenseSignUpForm = (props) => {
  const {isLoading, formState, signUpHandler} = props
  return (
    <React.Fragment>
      <Text style={styles.forgetPasswordText}>Quên <Text
        style={styles.textForgetPassword}>tên người dùng</Text> hoặc <Text
        style={styles.textForgetPassword}>mật khẩu</Text>?</Text>

      <Text style={styles.approveLicenseText}>Bằng việc đăng nhập, bạn chấp thuận <Text
        style={styles.textApproveLicense}>Điều khoản dịch vụ</Text> và <Text
        style={styles.textApproveLicense}>Chính sách quyền riêng tư</Text> của chúng tôi</Text>

      <View style={styles.signInContainer}>
        {
          isLoading ? (
            <ActivityIndicator size="large" color={Colors.primary}/>
          ) : (
            <TouchableOpacity disabled={formState.formIsValid ? false : true} onPress={signUpHandler}
                              style={formState.formIsValid ? styles.loginValid : styles.loginInvalid}>
              <Text style={styles.signInText}>Đăng ký</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  forgetPasswordText: {
    fontFamily: 'open-sans',
    fontSize: Normalize(14),
    marginVertical: 20
  },
  textForgetPassword: {
    fontFamily: 'open-sans-bold',
    fontSize: Normalize(14),
    color: 'green'
  },
  approveLicenseText: {
    fontFamily: 'open-sans',
    fontSize: Normalize(13),
    marginVertical: 20,
    textAlign: 'center'
  },
  textApproveLicense: {
    fontFamily: 'open-sans-bold',
    fontSize: Normalize(13),
    color: 'green'
  },
  signInContainer: {
    flex: 1,
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  loginValid: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    alignItems: 'center'
  },
  loginInvalid: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'gray',
    alignItems: 'center'
  },
  signInText: {
    fontFamily: 'open-sans',
    fontSize: Normalize(14),
    color: 'white'
  },
})

export default LicenseSignUpForm
