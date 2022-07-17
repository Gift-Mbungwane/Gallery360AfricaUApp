import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function PaymentSuccessScreen({ navigation }) {
  return (
    <View>
      <Text>Hi</Text>
    </View>
  )
  return (
    <ImageBackground
      source={bg}
      style={globalStyles.container}
      resizeMode="stretch"
    >
      <View style={{ flex: 1 }}>{/*  */}</View>

      <View style={globalStyles.body}>
        <Image source={logo} style={globalStyles.wrongLogo} />
        <Text style={globalStyles.paymeyntSuccess}>Payment Success</Text>
      </View>

      <View style={globalStyles.splashFooter}>
        <TouchableOpacity onPress={() => navigation.navigate("Market")}>
          <Image
            source={btn}
            style={{ alignSelf: "center", width: 320 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const bg = require("../assets/images/payments/succesful.png");
const logo = require("../assets/images/payments/right.png");
const btn = require("../assets/images/payments/image.png");
