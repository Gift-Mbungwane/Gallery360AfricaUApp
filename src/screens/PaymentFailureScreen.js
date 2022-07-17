import React from "react";
import {
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function PaymentFailureScreen({ navigation }) {
  return (
    <View>
      <Text>Hi</Text>
    </View>
  )
  return (
    <ImageBackground
      source={require("../assets/images/payments/failure.png")}
      style={globalStyles.container}
      resizeMode="stretch"
    >
      <View style={{ flex: 1 }}></View>

      <View style={globalStyles.body}>
        <Image
          source={require("../assets/images/payments/wrong.png")}
          style={globalStyles.wrongLogo}
          resizeMode="contain"
        />
        <Text style={globalStyles.paymeyntFailure}>Payment Failure</Text>
      </View>

      <View style={globalStyles.splashFooter}>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Image
            source={require("../assets/images/payments/image.png")}
            style={{ alignSelf: "center", width: 320 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
