import React, {useState} from 'react'
import {
  View,
  StyleSheet,
  Text,
  Switch,
  TouchableOpacity,
} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {HeaderButton} from 'react-navigation-header-buttons'
import {AntDesign, MaterialIcons} from '@expo/vector-icons'

// Components
const HeaderButtonCustomize = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={MaterialIcons}
      iconSize={23}
      color={'black'}
    />
  )
}

// Style
import {Normalize} from '../../../Themes'

const CheckScreen = () => {
  const [isShowAnswerNow, setIsShowAnswerNow] = useState(false)
  const [isShowTrueFalse, setIsShowTrueFalse] = useState(false)
  const [isShowWrite, setIsShowWrite] = useState(false)
  const [isShowMoreOption, setIsShowMoreOption] = useState(false)

  return (
    <SafeAreaView style={{flex: 1, paddingHorizontal: 20, paddingVertical: 15}}>
      <TouchableOpacity
        style={{paddingVertical: 20, backgroundColor: '#3DCFCF', justifyContent: 'center', alignItems: 'center'}}
        onPress={() => {
        }}>
        <Text style={{fontFamily: 'open-sans', fontSize: Normalize(14), color: 'white'}}>Bắt đầu làm kiểm tra</Text>
      </TouchableOpacity>
      <Text
        style={{fontFamily: 'open-sans-bold', fontSize: Normalize(18), color: 'gray', marginVertical: 15}}>Chung</Text>
      <TouchableOpacity
        style={{paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Số câu hỏi</Text>
        <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: Normalize(12), color: 'green'}}>2</Text>
          <View style={{marginHorizontal: 5}}/>
          <TouchableOpacity style={{justifyContent: 'center'}}>
            <AntDesign
              name={'right'}
              size={Normalize(12)}
              color={'black'}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={{marginVertical: 10}}/>
      <View style={{paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Hiển thị đáp án</Text>
        <Switch
          trackColor={{true: '#fdcb23'}} // override default color (green)
          thumbColor={'white'}
          value={isShowAnswerNow}
          onValueChange={(newValue) => setIsShowAnswerNow(newValue)}
        />
      </View>
      <TouchableOpacity style={{paddingLeft: 10, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans', fontSize: Normalize(14)}}>Trả lời bằng</Text>
          <TouchableOpacity style={{marginTop: 20}}>
            <AntDesign
              name={'right'}
              size={Normalize(12)}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <Text>Thuật ngữ</Text>
      </TouchableOpacity>
      <Text style={{
        fontFamily: 'open-sans-bold',
        fontSize: Normalize(18),
        color: 'gray',
        marginVertical: 15
      }}>Loại câu hỏi</Text>
      <View style={{paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{letterSpacing: 2}}>Đúng/sai</Text>
        <Switch
          trackColor={{true: '#fdcb23'}} // override default color (green)
          thumbColor={'white'}
          value={isShowTrueFalse}
          onValueChange={(newValue) => setIsShowTrueFalse(newValue)}
        />
      </View>
      <View style={{marginVertical: 5}}/>
      <View style={{paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Nhiều lựa chọn</Text>
        <Switch
          trackColor={{true: '#fdcb23'}} // override default color (green)
          thumbColor={'white'}
          value={isShowMoreOption}
          onValueChange={(newValue) => setIsShowMoreOption(newValue)}
        />
      </View>
      <View style={{marginVertical: 5}}/>
      <TouchableOpacity onPress={() => {
        setIsShowWrite(!isShowWrite)
      }} style={{paddingLeft: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text>Tự luận</Text>
        <Switch
          trackColor={{true: '#fdcb23'}} // override default color (green)
          thumbColor={'white'}
          value={isShowWrite}
          onValueChange={(newValue) => setIsShowWrite(newValue)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{paddingLeft: 10, marginTop: 10}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontFamily: 'open-sans', fontSize: Normalize(14)}}>Tuỳ chọn sửa sai</Text>
          <TouchableOpacity style={{marginTop: 20}}>
            <AntDesign
              name={'right'}
              size={Normalize(12)}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
        <Text>Cần tất cả đáp án</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

CheckScreen.navigationOptions = (navigationData) => {
  return {
    headerTitle: 'KIỂM TRA',
    headerLeft: (
      <HeaderButtons title={'Back'} HeaderButtonComponent={HeaderButtonCustomize}>
        <Item label={'Back'} title="Back" iconName="arrow-back" onPress={() => {
          navigationData.navigation.navigate('CourseIntroductionScreen')
        }}/>
      </HeaderButtons>
    ),
    headerStyle: {
      backgroundColor: 'transparent'
    },
    headerTintColor: 'black'
  }
}

const styles = StyleSheet.create({})

export default CheckScreen
