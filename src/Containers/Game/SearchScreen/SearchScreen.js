import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";

// Components
import { Input, HeaderButton } from "../../../Components";

// Styles
import { Colors } from "../../../Themes";

const SearchScreen = props => {
  const [isTerm, setIsTerm] = useState(true);
  const [isClass, setIsClass] = useState(false);
  const [isUser, setIsUser] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: Colors.primary }}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            justifyContent: "space-between",
            paddingVertical: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsTerm(true);
              setIsClass(false);
              setIsUser(false);
            }}
          >
            <View>
              <Text
                style={
                  isTerm
                    ? {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "white",
                      }
                    : {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "gray",
                      }
                }
              >
                HỌC PHẦN
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsTerm(false);
              setIsClass(true);
              setIsUser(false);
            }}
          >
            <View>
              <Text
                style={
                  isClass
                    ? {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "white",
                      }
                    : {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "gray",
                      }
                }
              >
                LỚP HỌC
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsTerm(false);
              setIsClass(false);
              setIsUser(true);
            }}
          >
            <View>
              <Text
                style={
                  isUser
                    ? {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "white",
                      }
                    : {
                        fontFamily: "open-sans-bold",
                        fontSize: 16,
                        color: "gray",
                      }
                }
              >
                NGƯỜI DÙNG
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {
        isTerm &&
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "open-sans", fontSize: 18, textAlign: 'center' }}>
            Nhập một chủ đề hoặc từ khoá
          </Text>
          <View style={{ marginVertical: 10 }}/>
          <Text style={{ fontFamily: "open-sans", fontSize: 16, textAlign: 'center' }}>
            Mẹo: Càng cụ thể càng tốt
          </Text>
        </View>
      }
      {
        isClass &&
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "open-sans", fontSize: 18, textAlign: 'center' }} numberOfLines={2}>
            Nhập tên của lớp học để tìm các nhóm liên quan
          </Text>
        </View>
      }
      {
        isUser &&
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: "open-sans", fontSize: 18, textAlign: 'center' }} numberOfLines={3}>
            Bạn muốn tìm giáo viên và bạn học? Hãy nhập tên người dùng của họ
          </Text>
        </View>
      }
    </View>
  );
};

SearchScreen.navigationOptions = navigationData => {
  return {
    headerTitle: (
      <View style={styles.searchSection}>
        <View style={{ justifyContent: "center" }}>
          <Ionicons
            style={styles.searchIcon}
            name="ios-search"
            size={25}
            color="white"
          />
        </View>

        <View style={{ marginHorizontal: 5 }} />

        <TextInput
          style={styles.input}
          onChangeText={() => {}}
          autoCapitalize="none"
          keyboardType={"default"}
          placeholder="Môn học, khoá học, niên học, v.v ..."
          placeholderTextColor={"gray"}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontFamily: "open-sans",
  },
  searchSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 5,
    marginHorizontal: 10,
  },
});

export default SearchScreen;
