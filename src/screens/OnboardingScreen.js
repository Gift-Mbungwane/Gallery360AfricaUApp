import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function OnboardingScreen({ navigation }) {
  return (
    <ImageBackground
      source={background}
      style={globalStyles.onBoardingContainer}
      resizeMode="stretch"
    >
      <View style={globalStyles.onboardingBody}>
        <View style={globalStyles.grid}>
          <View style={globalStyles.column1}>
            <Image source={image1} style={globalStyles.image1} />
            <Image source={image2} style={globalStyles.image2} />
          </View>

          <View style={globalStyles.column2}>
            <Image source={image3} style={globalStyles.image3} />
            <Image source={image4} style={globalStyles.image4} />
          </View>
        </View>
      </View>

      {/* subject */}
      <View style={globalStyles}>
        <Text style={globalStyles.subject}>Creative</Text>
        <Text style={globalStyles.subject}>Space</Text>
      </View>

      {/* footer */}
      <View style={globalStyles.onboardingFooter}>
        {/* introduction */}
        <Text style={globalStyles.introduction}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          pulvinar cursus arcu, vel ultricies orci pellentesque lacinia. In
          egestas dolor eget ipsum vestibulum feugiat. Curabitur dapibus arcu id
          dolor mollis varius.
        </Text>

        {/* buttons */}
        <TouchableOpacity
          onPress={() => navigation.replace("SignIn")}
          style={globalStyles.signIn}
        >
          <Text style={globalStyles.signInTxt}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={globalStyles.signUp}
        >
          <Text style={globalStyles.signUpTxt}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// images
const background = require("../assets/images/onboarding/onboarding.png");
const image1 = require("../assets/images/onboarding/image1.jpg");
const image2 = require("../assets/images/onboarding/image2.jpg");
const image3 = require("../assets/images/onboarding/image3.jpg");
const image4 = require("../assets/images/onboarding/image4.jpg");
