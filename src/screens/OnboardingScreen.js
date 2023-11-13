import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet
} from "react-native";
import React from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
// const background = require("../assets/images/onboarding/onboarding.png");
// const image1 = require("../assets/images/onboarding/image1.jpg");
// const image2 = require("../assets/images/onboarding/image2.jpg");
// const image3 = require("../assets/images/onboarding/image3.jpg");
// const image4 = require("../assets/images/onboarding/image4.jpg");

import background from "../assets/images/onboarding/onboarding.png";
import image1 from "../assets/images/onboarding/image1.jpg";
import image2 from "../assets/images/onboarding/image2.jpg";
import image3 from "../assets/images/onboarding/image3.jpg";
import image4 from "../assets/images/onboarding/image4.jpg";
import { ActionButton, ArtDetails, ArtInfoCard, ArtistArtworksCard, ArtistLabel, ArtThumbnail, ArtworkCard, BoughtArtworksThumbnail, Dimensions, FilterText, FollowButton, HeroCard, HeroImage, LikeCounter, MessageCounter, ScrollableFilterCard, UserActivityCard } from "../components";
import ArtInfo from "../components/text/ArtInfo";
import { DropdownInput } from "../components/inputs";
import { ArtworksSection, CreatorsSection } from "../components/sections";


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
          onPress={() => navigation.navigate("SignIn")}
          style={globalStyles.signIn}
        >
          <Text style={globalStyles.signInTxt}>Sign In</Text>
        </TouchableOpacity>
        {/* <ActionButton text={"Sign In"} onPress={() => navigation.replace("SignIn")} icon={require("../../assets/icons/person.png")}/> */}
        {/* <FollowButton text="Following" onPress={{}} icon={require("../../assets/icons/person.png")} secondary={false} /> */}
        {/* <HeroImage uri={"https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"}/> */}
        {/* <ArtThumbnail price={"150.00"} uri={"https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"}/> */}
        {/* <BoughtArtworksThumbnail uri={"https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"}/> */}
        {/* <ArtistLabel name={'Vee'} uri={"https://firebasestorage.googleapis.com/v0/b/chatta-mobile.appspot.com/o/messages%2Fimages%2FcW7x3aV9o8rpH4478Hnf?alt=media&token=e2587fdc-ec26-4084-b57e-8f61628d5800"}/> */}
        {/* <ArtInfoCard /> */}
        {/* <UserActivityCard artist={'Vukona'}/> */}
        {/* <ArtworkCard /> */}
        {/* <ArtistArtworksCard showPrice={false} /> */}
        {/* <ArtDetails /> */}
        {/* <HeroCard /> */}
        {/* <FilterText active={true} text={'All'}/> */}
        {/* <ScrollableFilterCard /> */}
        {/* <DropdownInput /> */}
        {/* <CreatorsSection /> */} 
        {/* <ArtworksSection /> */}
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
const styles = StyleSheet.create({
  container: {
      // display: "flex",
      // paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: '#181818',
      height: 54,
      
      justifyContent: 'center',
      // alignItems: 'center',
      // width: 320
      // justifyContent: "center",
      // borderWidth: 1,
      // borderColor: "#fff",
      // borderRadius: 20,
      // height: 50,
      // width: 320,
  },
  text: {
      color: "FFFFFF",
      fontSize: 21,
      textTransform: "uppercase"
  }
})