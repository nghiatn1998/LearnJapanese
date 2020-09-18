import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Switch, Platform, TouchableOpacity } from "react-native";

// Styles
import { Colors } from "../../../Themes"

const CreateClassScreen = (props) => {
  const [isAllowedInviteAndShared, setIsAllowedInviteAndShared] = useState(false);
  return (
    <View style={{ padding: 20 }}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          placeholder="Môn học, khoá học, niên học, v.v ..."
          placeholderTextColor={Colors.steel}
          underlineColorAndroid={'yellow'}
        />
        <Text style={styles.label}>Tên lớp</Text>
      </View>

      <View style={{ marginVertical: 10 }}/>

      <View>
        <TextInput
          {...props}
          style={styles.input}
          onChangeText={() => {}}
          placeholder="Thông tin bổ sung (không bắt buộc)"
          placeholderTextColor={Colors.steel}
          underlineColorAndroid={'yellow'}
        />
        <Text style={styles.label}>Mô tả</Text>
      </View>

      <View style={{ marginVertical: 15 }} />

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          <Text style={{ fontFamily: 'open-sans-bold', fontSize: 16}} numberOfLines={2}>Cho phép thành viên thêm học phần và thành viên mới</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Switch 
            trackColor={{ true: Colors.primary }} // override default color (green)
            thumbColor={Platform.OS === "android" ? Colors.primary : ""}
            value={isAllowedInviteAndShared}
            onValueChange={newValue => setIsAllowedInviteAndShared(newValue)}
          />
        </View>
      </View>
    </View>
  );
};

CreateClassScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Create Term Screen",
    headerLeft: (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'open-sans-bold', color: 'white', fontSize: 20 }}>Huỷ</Text>
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => {}}>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'open-sans-bold', color: 'white', fontSize: 20 }}>Lưu</Text>
        </View>
      </TouchableOpacity>
    ),
  }
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "open-sans-bold",
    color: 'gray'
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: Colors.steel,
    borderBottomWidth: 1,
    borderRadius: 5
  },
});

export default CreateClassScreen;
