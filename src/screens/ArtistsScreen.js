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

export default function ArtistsScreen({ navigation }) {
  const SLIDER_WIDTH = Dimensions.get("window").width;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
  const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 10) / 5);

  const [artist, setArtist] = useState([]);

  const getArtist = () => {
    return firestore.collection("artists").onSnapshot((snapShot) => {
      const allArtists = snapShot.docs.map((docSnap) => docSnap.data());

      setArtist(allArtists);
    });
  };
  useEffect(() => {
    getArtist();
    return () => getArtist();
  }, []);

  const [state, setState] = useState();

  const _renderItem = ({ item, index }) => {
    return (
      <View>
        <TouchableOpacity
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
              data={artist}
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
