import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// Components
import { HeaderButton }  from "../../../Components";

const CreateDirectoryScreen = (props) => {
  return (
    <View>
      <Text>Create Directory Screen!</Text>
      <Button title="Go Profile" onPress={() => props.navigation.navigate("ProfileUserScreen")} />
    </View>
  );
};

CreateDirectoryScreen.navigationOptions = navigationData => {
  return {
    headerTitle: "Create Term Screen",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
          title="Language"
          iconName="language"
          onPress={() => {}}
        />
      </HeaderButtons>
    )
  }
}

const styles = StyleSheet.create({

});

export default CreateDirectoryScreen;
