import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function SplashScreen({ navigation }) {
  setTimeout(() => {
    navigation.replace("Onboarding");
  }, 3000);

  return (
    <ImageBackground
      source={bgImage}
      style={globalStyles.splashContainer}
      resizeMode="stretch"
    >
      <View style={{ flex: 1 }}>{/*  */}</View>

      {/* logo */}
      <View style={globalStyles.body}>
        <Image source={logo} style={globalStyles.splashLogo} />
      </View>

      {/* title */}
      <View style={globalStyles.splashFooter}>
        <Text style={globalStyles.appName}>Gallery 360</Text>
        <Text style={globalStyles.appName2}>Africa</Text>
      </View>
    </ImageBackground>
  );
}

// images
const bgImage = require("../assets/images/splash/splash.png");
const logo = require("../assets/images/splash/logo.png");
