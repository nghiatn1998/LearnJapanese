import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

// Styles
import {Colors, Normalize} from '../../../Themes'

// Component
import {Input} from '../../index'
import LicenseSignInForm from './LicenseSignInForm'

const SignInForm = (props) => {
  const {isLoading, inputChangeHandler, signInHandler, formState} = props
  return (
    <React.Fragment>
      <Text style={styles.loginText} numberOfLines={2}>HOẶC ĐĂNG NHẬP BẰNG TÊN NGƯỜI DÙNG CỦA BẠN</Text>

      <Input
        id={'username'}
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType="default"
        required
        minLength={5}
        onInputChange={inputChangeHandler}
        placeholder={'Nhập tên người dùng của bạn'}
        placeholderTextColor={Colors.steel}
        label={'TÊN NGƯỜI DÙNG'}
        initialValue={''}
        errorText="Please enter a valid username."
      />

      <View style={{marginVertical: 5}}/>

      <Input
        id={'password'}
        secureTextEntry
        required
        minLength={8}
        keyboardType="default"
        autoCapitalize={'none'}
        autoCorrect={false}
        errorText="Please enter a valid password."
        initialValue={''}
        onInputChange={inputChangeHandler}
        placeholder={'Nhập mật khẩu của bạn'}
        placeholderTextColor={Colors.steel}
        label={'MẬT KHẨU'}
      />

      <LicenseSignInForm
        isLoading={isLoading}
        formState={formState}
        signInHandler={signInHandler}
      />
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  loginText: {
    fontFamily: 'open-sans-bold',
    fontSize: Normalize(12),
    marginVertical: 20
  },
})

export default SignInForm
