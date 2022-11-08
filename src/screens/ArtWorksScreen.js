import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { firestore, auth } from "../../Firebase";
import Carousel from "react-native-snap-carousel";
import { StackActions } from "@react-navigation/native";

export default function ArtWorksScreen({ route, navigation }) {
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 9) / 5);
  const [art, setArt] = useState([]);
  const [state, setState] = useState();

  const { artistUid } = route.params;
  // const { artistUid } = route.params || { artistUid: 'DGghRcsny8hyLQa2NsrFA4IK1gj2'};

  const getArt = () => {
    return firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("status", "==", "approved")
      .onSnapshot((snapShot) => {
        const allArts = snapShot.docs.map((docSnap) => docSnap.data());
        setArt(allArts);
      });
  };
  useEffect(() => {
    getArt();
    // return () => getArt();
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () =>{
      const popAction = StackActions.pop(1);
      navigation.dispatch(popAction);
    })
    return () => backHandler.remove()
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtPreview", {
              artistUid: artistUid,
              imageUID: item.ImageUid,
            })
          }
        >
          <Image
            source={{ uri: item.artUrl }}
            style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 16 }}
          />
          <View
            style={{
              backgroundColor: "#fff",
              height: 65,
              position: "absolute",
              borderRadius: 16,
              bottom: 8,
              left: 8,
              right: 8,
              justifyContent: "center",
            }}
          >
            <Text style={globalStyles.artNameTxt}>{item.artName}</Text>
            <Text style={globalStyles.artTypeTxt}>Artist</Text>
            {/* <Text style={globalStyles.artTypeTxt}>{item.email}</Text> */}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={imageBg}
      resizeMode="stretch"
      style={globalStyles.container}
    >
      <View style={globalStyles.container}>
        {/* <View style={styles.searchBarContainer}>
          <Ionicons style={{left:55, top:10}} name="search" size={25} color={'black'} />
                        
            <TextInput
              //onChangeText={}
              placeholder="Search"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
        </View> */}

        <View style={globalStyles.homeBody1}>
          <SafeAreaView
            style={{
              width: "100%",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Carousel
              data={art}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              renderItem={_renderItem}
              onSnapToItem={(index) => setState({ index })}
              useScrollView={true}
            />
          </SafeAreaView>
        </View>
      </View>
    </ImageBackground>
  );
}

const imageBg = require("../assets/images/home.png");

const styles = StyleSheet.create({
  searchInput: {
    width: "70%",
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 7,
    paddingHorizontal: 50,
    color: "black",
    //backgroundColor:'#fff'
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 70,
  },
  searchBtnText: {
    color: "#FF5353",
    top: 10,
    fontSize: 15,
  },
});
