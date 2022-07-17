import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import bgImage from "../assets/images/splash/splash.png";
import logo from "../assets/images/splash/logo.png";
import { UserContext } from "../Context/UserContext";
import { SplashContext } from "../Context/SplashContext";

export default function SplashScreen({ navigation }) {
  const { isLoggedIn, setUserState } = useContext(UserContext);
  const { deactivateSplash } = useContext(SplashContext);

  setTimeout(() => {
    deactivateSplash(true)
    return;
    // navigation.replace("Onboarding");
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

