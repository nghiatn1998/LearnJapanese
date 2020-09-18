import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";

// Components
import { HeaderTitle, FormAuthenticate } from '../../../Components'

// Styles
import { ImagesGame } from "../../../Themes";

// Screen
const AuthenticateScreen = props => {
  const onPressSignIn = () => {
    props.navigation.navigate("SignInScreen");
  };

  const onPressSignUp = () => {
    props.navigation.navigate("SignUpScreen");
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={ImagesGame.backgroundLogin} style={styles.container} imageStyle={styles.image}>
        <SafeAreaView style={styles.container}>
          <HeaderTitle title={'Japanese World'} description={'Hơn 90% người sử dụng cho biết họ đã cải thiện được điểm số'} />
          <FormAuthenticate onPressSignIn={onPressSignIn} onPressSignUp={onPressSignUp} />
          <View style={styles.spacingContainer} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: "cover",
  },
  spacingContainer: {
    marginBottom: 20
  }
});

export default AuthenticateScreen;
