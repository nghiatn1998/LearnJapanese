import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {HeaderButton, HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AntDesign} from '@expo/vector-icons'

// Components
import {HeaderButton as HeaderButtonCustomize } from '../../../Components'

const HeaderButtonAntDesign = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={AntDesign}
      iconSize={23}
      color={'white'}
    />
  );
}

const DirectoryScreen = () => {
  return (
    <View>
      <Text>Directory Screen!</Text>
    </View>
  );
};

DirectoryScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Thư Mục",
    headerLeft: (
      <HeaderButtons title={'Back'} HeaderButtonComponent={HeaderButtonCustomize}>
        <Item label={'Back'} title="Back" iconName="arrow-back" onPress={() => {
          navigationData.navigation.navigate('HomeScreen')
        }}/>
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons title={'Plus'} HeaderButtonComponent={HeaderButtonAntDesign}>
        <Item label={'Plus'} title="Plus" iconName="plus" onPress={() => {
        }}/>
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({

});

export default DirectoryScreen;
