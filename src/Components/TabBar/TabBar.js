import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from "react-native";
import { SafeAreaView } from 'react-navigation';

// Style
import { Colors, Normalize } from "../../Themes";

const TabBar = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { navigation, renderIcon, activeTintColor, inactiveTintColor } = this.props;
  const { routes } = navigation.state;
  return (
    <SafeAreaView style={styles.tabbar}>
      {routes && routes.map((route, index) => {
        const focused = index === navigation.state.index;
        const tintColor = focused ? activeTintColor : inactiveTintColor;
        return (
          <TouchableWithoutFeedback
            key={route.key}
            style={styles.tab}
            onPress={() => {
              if (route.key === "Create") {
                setModalVisible(true);
              } else {
                navigation.navigate(route)
              }
            }}
          >
            <View style={styles.tab}>
              { renderIcon({route, index, focused, tintColor })}
              <Modal
                isVisible={modalVisible}
                animationIn="fadeInUp"
                animationOut="fadeOutDown"
                backdropOpacity={.5}
                onBackdropPress={() => setModalVisible(false)}
                onBackButtonPress={() => setModalVisible(false)}
                style={styles.bottomModal}
                useNativeDriver={true}
              >
                <View style={styles.modal}>
                  // Modal Content
                </View>
              </Modal>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default TabBar;
