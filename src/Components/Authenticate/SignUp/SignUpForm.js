import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

// Styles
import {Colors, Normalize} from '../../../Themes'

// Component
import {Input} from '../../index'
import LicenseSignUpForm from './LicenseSignUpForm'

const SignUpForm = (props) => {
  const {isLoading, inputChangeHandler, signUpHandler, formState} = props
  return (
    <React.Fragment>
      <Text style={{ fontFamily: 'open-sans-bold', fontSize: Normalize(12), marginVertical: 20 }} numberOfLines={1}>HOẶC TẠO MỘT TÀI KHOẢN</Text>
      <Input
        id={'email'}
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType="email-address"
        required
        email
        errorText="Please enter a valid email address."
        initialValue={""}
        onInputChange={inputChangeHandler}
        placeholder={'example@gmail.com'}
        placeholderTextColor={Colors.steel}
        label={'EMAIL'} />

      <View style={{ marginVertical: 5 }}/>

      <Input
        id={'username'}
        autoCapitalize={'none'}
        autoCorrect={false}
        keyboardType="default"
        required
        minLength={5}
        onInputChange={inputChangeHandler}
        initialValue={""}
        errorText="Please enter a valid username."
        placeholder={'Tạo tên người dùng'}
        placeholderTextColor={Colors.steel}
        label={'TÊN NGƯỜI DÙNG'}
      />

      <View style={{ marginVertical: 5 }}/>

      <Input
        id={'password'}
        secureTextEntry
        required
        minLength={8}
        keyboardType="default"
        autoCapitalize={'none'}
        autoCorrect={false}
        errorText="Please enter a valid password address."
        initialValue={""}
        onInputChange={inputChangeHandler}
        placeholder={'Tạo mật khẩu của bạn'}
        placeholderTextColor={Colors.steel}
        label={'MẬT KHẨU'}
      />

      <View style={{ marginVertical: 5 }}/>

      <LicenseSignUpForm
        isLoading={isLoading}
        formState={formState}
        signUpHandler={signUpHandler}
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

export default SignUpForm