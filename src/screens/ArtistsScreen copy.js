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
} from "react-native";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import { firestore, auth } from "../../Firebase";
import Carousel from "react-native-snap-carousel";

export default function ArtistsScreen() {
  return (
    <View>
      <Text>
        Hi there
      </Text>
    </View>
  )
}

function ArtistsScreens({ navigation }) {
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 9) / 5);

  const [artist, setArtist] = useState([]);

  const getArtist = () => {
    return firestore.collection("artists").onSnapshot((snapShot) => {
      const allArtists = snapShot.docs.map((docSnap) => docSnap.data());

      setArtist(allArtists);
    });
  };
  useEffect(() => {
    getArtist();
    // return () => getArtist();
  }, []);

  const [state, setState] = useState();

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtistProfile", {
              description: item.description,
              artistUid: item.artistUid,
              photoUrl: item.photoUrl,
              artistName: item.artistName,
            })
          }
        >
          <Image
            source={{ uri: item.photoUrl }}
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
            <Text style={globalStyles.artNameTxt}>{item.artistName}</Text>
            <Text style={globalStyles.artTypeTxt}>Artist</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center'}}>
      {/* <Text>Hi</Text> */}
    </View>
  )
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
