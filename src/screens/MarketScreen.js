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
  ImageBackground,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-snap-carousel";
//
import { firestore } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
import Skeleton from "../assets/components/Skeleton";
import LoaderImage from "../assets/components/LoaderImage";
const background = require("../assets/images/home.png");
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.2) / 5.2);

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 + statusBarHeight : 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - statusBarHeight;
const tabBarHeight = 50
const paddingOnBottom = 90
const screenHeight = Dimensions.get('screen').height - statusBarHeight - paddingOnTop - navBarHeight - tabBarHeight - paddingOnBottom;
const carouselHeight = (screenHeight / 7) * 6
const ITEM_HEIGHT = carouselHeight;
// console.log({ statusBarHeight, paddingOnTop,navBarHeight,  screenHeight, carouselHeight });
//

export default function MarketScreen({ navigation }) {

  //
  const [artist, setArtist] = useState([]);
  const [state, setState] = useState();
  const [data, setData] = useState(null);
  const [artwork, setArtwork] = useState([])
  const [showPlaceholder, toggleShowPlaceholder] = useState(true)
  //

  const getArtist = () => {
    return firestore
      .collection("artists")
      .orderBy("timeStamp", "desc")
      .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists1 = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(allArtists1);
      });
  };
  const navigateToArtPreview = (item) => {
    try {
      navigation.navigate("ArtPreview", {
        artistUid: item.ArtistUid,
        artName: item.artName,
        imageUID: item.ImageUid,
        artUrl: item.artUrl,
        artistName: item.artistName,
        artType: item.artType,
        photoUrl: item.photoUrl
      })
    } catch (error) {
      Alert.alert('Error', error, [
        { text: 'Okay', onPress: () => console.log('okay') }
      ])
    }

  }
  const getArtWorks = () => {
    return firestore.collection('Market').orderBy("timeStamp", "desc").limit(5).where('isEnabled', '==', true).onSnapshot((snapShot) => {
      if(!snapShot.empty) {
      const art = snapShot.docs.map(item => ({ ...item.data(), isArt: true }))

      setArtwork([...art, { isArt: false, text: 'Show All' }])
      // console.log('artworks: ', art);
      setTimeout(() => {
        toggleShowPlaceholder(false)
      }, 2400)
      }

    })
  }

  const _renderSkeletonItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", height: '100%' }}>

        <View
          style={{
            height: ITEM_HEIGHT + 1,
            minHeight: ITEM_HEIGHT
          }}
        >
          <Skeleton
            variant={'rectangle'}
            radius={16}
            height={ITEM_HEIGHT}
            width={ITEM_WIDTH}
          />
          <Skeleton
            variant={'rectangle'}
            radius={16}
            height='65'
            // width='100%'
            style={{
              backgroundColor: "rgb(200, 200, 200)",
              height: 65,
              position: "absolute",
              borderRadius: 16,
              bottom: 8,
              left: 8,
              right: 8,
              justifyContent: "center",
            }}
          >
            {/* <Skeleton variant={'rectangle'} height={20} width='100%' style={{ backgroundColor: 'rgb(0,0,0)', margin: 20, flex: 1 }}></Skeleton>
            <Skeleton variant={'rectangle'} style={{ backgroundColor: 'rgb(0,0,0)', margin: 20, flex: 1 }}></Skeleton> */}
          </Skeleton>
        </View>

      </View>
    )


  };
  const _renderItem = ({ item, index }) => {
    // console.log(item);

    if (item.isArt) {
      return (
        <View style={{ flexDirection: "row", height: '100%', padding: 0 }}>

          <TouchableOpacity
            onPress={() => { navigateToArtPreview(item) }}
            style={{
              height: ITEM_HEIGHT,
              maxHeight: ITEM_HEIGHT,
              padding: 0,
              // backgroundColor: 'red'
            }}
          >
            {/* <Image
              source={{ uri: item.artUrl }}
              placeholder
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                maxHeight: ITEM_HEIGHT,
                borderRadius: 16,
                padding: 0
              }}
            /> */}
            <LoaderImage
              uri={item.artUrl}
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                maxHeight: ITEM_HEIGHT,
                borderRadius: 16,
                padding: 0,
              }}
            />
            <View
              style={{
                backgroundColor: "#fff",
                height: 65,
                maxHeight: 65,
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
      )
    } else {
      return (
        <View style={{ flexDirection: "row", zIndex: 1 }}>
          <TouchableOpacity style={styles.showMoreTextOpacity} onPress={() => navigation.navigate("PreviewMore", { datas: data, artistUID: null })} >
            <Text style={styles.showMoreText} numberOfLines={1}>Show All</Text>
          </TouchableOpacity>
        </View>
      )
    }

  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firestore
        .collection("Market")
        .where("status", "==", "approved")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapShot) => {
          if(!snapShot.empty) {
            const snap = snapShot.docs.map((document) => document.data());
            setData(snap);
          }

        });

      getArtist();
      getArtWorks();
    }

    return () => isMounted = false
    // return () => getArtData();
  }, []);

  //
  return (
    // <ImageBackground source={background} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
    <View style={styles.container}>
      {showPlaceholder ? (
        <View style={{ position: 'absolute', left: 0, zIndex: 1000 }}>

          <View style={styles.body}>
            <Carousel
              data={[{}, {}]}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              renderItem={_renderSkeletonItem}
              onSnapToItem={(index) => setState({ index })}
              useScrollView={false}
              scrollEnabled={false}
            />

          </View>

          <View style={styles.footer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} scrollEnabled={false}>
              <FlatList
                style={{ paddingLeft: 15, width: Dimensions.get('window').width, overflow: 'hidden' }}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                data={[{}, {}, {}, {}]}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.artistCard}>
                      <View style={styles.artistsView}>
                        <Skeleton height={102} width={102} variant="rectangle" radius={10} style={styles.artistImage}></Skeleton>
                      </View>

                    </View>
                  );
                }}
              />
            </ScrollView>
          </View>
        </View>) : (

        <>
          <View style={styles.body}>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                alignSelf: "center",
                flexDirection: "row",
              }}
            >
              <Carousel
                data={artwork}
                initialNumToRender={1}
                windowSize={1}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                renderItem={_renderItem}
                onSnapToItem={(index) => setState({ index })}
                useScrollView={false}
              />

            </View>
          </View>
          <View style={styles.footer}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {artist.map(item => {
                return (
                  <View
                    style={styles.artistCard}
                    key={item.photoUrl}
                  >
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
                )
              })}
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
        </>
      )}

    </View>
    // </ImageBackground>

  );

}
const paddingTop = Platform.OS === 'android' ? 60 : 0
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // backgroundColor: 'red',
    paddingBottom: 10
    // backgroundColor: "#fff",
  },
  body: {
    flex: 6,

    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'yellow',
    padding: 0,
    paddingTop: 50
  },
  footer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    // paddingLeft: 25,
    // paddingRight: 25,
    maxHeight: 110,
    // backgroundColor: 'green'
  },
  artistCard: {
    // marginLeft: 5,
    // marginRight: 5
    position: 'relative',
    // backgroundColor: 'red'
  },
  artistsView: {
    // paddingHorizontal: 5,
    borderRadius: 10,
    // borderWidth: 0.5,
    // borderColor: "gray",
    margin: 5,
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
    fontSize: 12,
    paddingHorizontal: 20,
    bottom: 3,
  },
  scrollView: {
    // borderColor: 'red',
    // borderWidth: 1
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
  artCarouselView: {
    flexDirection: 'row'
  },
  showMoreTextOpacity: {
    borderWidth: 1,
    borderColor: '#ceb89e',
    backgroundColor: 'rgba(206,184, 158, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  showMoreText: {
    color: "rgb(80, 80, 80)",
    marginHorizontal: 15,
    marginVertical: 2,
    fontSize: 28,
    paddingRight: 30
    // alignSelf: "flex-end",


  }

});
