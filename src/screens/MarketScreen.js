import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
//
import { firestore } from "../../Firebase";
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.2) / 5.2);

//

export default function MarketScreen({ navigation }) {
  //
  const [artist, setArtist] = useState([]);
  const [state, setState] = useState();
  const [data, setData] = useState(null);
  //
  const getArtist = () => {
    return firestore
      .collection("artists")
      .orderBy("artistName")
      .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists1 = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(allArtists1);
      });
  };

  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtPreview", {
              artistUid: item.artistUid,
              artName: item.artName,
              imageUID: item.ImageUid,
              artUrl: item.artUrl,
              artistName: item.artistName,
              artType: item.artType,
              photoUrl: item.photoUrl,
            })
          }
        >
          <Image
            source={{ uri: item.artUrl }}
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 16,
            }}
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
            <Text style={styles.artNameTxt}>{item.artName}</Text>
            <Text style={styles.artTypeTxt}>{item.artType}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    const getArtData = firestore
      .collection("Market")
      .where("status", "==", "approved")
      .onSnapshot((snapshot) => {
        const snap = snapshot.docs.map((document) => document.data());
        setData(snap);
      });

    getArtist();

    return () => getArtist();
    return () => getArtData();
  }, []);

  //
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("PreviewMore", { datas: data })}
      >
        <Text
          style={{
            color: "#000",
            marginHorizontal: 15,
            marginVertical: 2,
            fontSize: 18,
            alignSelf: "flex-end",
          }}
        >
          Show All
        </Text>
      </TouchableOpacity>
      <View style={styles.body}>
        <SafeAreaView
          style={{
            width: "100%",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
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
      <Text style={{ color: "#000", paddingLeft: 15, fontSize: 18 }}>
        Artists
      </Text>
      <View style={styles.footer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FlatList
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={artist}
            keyExtractor={(item) => `${item.artistUid}`}
            renderItem={({ item }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ArtistProfile", {
                        description: item.description,
                        artistUid: item.artistUid,
                        photoUrl: item.photoUrl,
                        artistName: item.artistName,
                        videoUrl: item.videoUrl,
                      })
                    }
                  >
                    <View style={styles.artistsView}>
                      <Image
                        source={{ uri: item.photoUrl }}
                        style={styles.artistImage}
                      />
                      <View style={styles.artistNameContainer}>
                        <Text style={styles.ArtistName}>{item.artistName}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Artists")}>
            <View style={styles.showAll}>
              <Text
                style={{ color: "gray", textAlign: "center", fontSize: 15 }}
              >
                Show {"\n"}All
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
  },
  body: {
    flex: 6,

    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    paddingLeft: 10,
  },
  artistsView: {
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: 102,
    height: 102,
  },
  artistNameContainer: {
    backgroundColor: "#fff",
    marginVertical: -10,
    borderRadius: 8,
    alignSelf: "center",
    height: 20,
    width: "100%",
    bottom: 15,
    paddingHorizontal: 3,
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: "gray",
    alignSelf: "center",
  },
  ArtistName: {
    color: "gray",
    textAlign: "center",
  },
  artName: {
    color: "gray",
    textAlign: "center",
  },
  artNameTxt: {
    fontSize: 23,
    color: "#000",
    paddingHorizontal: 20,
  },
  artTypeTxt: {
    color: "gray",
    paddingHorizontal: 20,
    bottom: 3,
  },
  showAll: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 5,
    margin: 5,
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  marketShowAll: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    backgroundColor: "black",
    // borderRadius: 10,
    // paddingHorizontal: 5,
    // margin: 5,
    // justifyContent: "center",
    // alignSelf: "center",
    // width: 100,
    // height: 100,
  },
});
