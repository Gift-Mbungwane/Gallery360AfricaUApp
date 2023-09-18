import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
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
import ArtistScrollView from "../assets/components/ArtistScrollView";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
const background = require("../assets/images/home.png");
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 40);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.2) / 5.2);

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 80 + statusBarHeight : 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - statusBarHeight;
const tabBarHeight = 50
const paddingOnBottom = 90
// const screenHeight = Dimensions.get('screen').height - statusBarHeight - paddingOnTop - navBarHeight - tabBarHeight - paddingOnBottom;
const screenHeight = Dimensions.get('window').height
const carouselHeight = (screenHeight - 300)
const ITEM_HEIGHT = carouselHeight;
// console.log({ statusBarHeight, paddingOnTop,navBarHeight,  screenHeight, carouselHeight });
//
console.log('market height: ' + screenHeight);

export default function MarketScreen({ navigation }) {

  //
  const [artist, setArtist] = useState([]);
  const [state, setState] = useState();
  const [data, setData] = useState(null);
  const [artwork, setArtwork] = useState([])
  const [showPlaceholder, toggleShowPlaceholder] = useState(true)
  //
  const [viewHeight, setViewHeight] = useState(screenHeight)
  const insets = useSafeAreaInsets()
  ///

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
      if (!snapShot.empty) {
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
      <View style={{ flexDirection: "row", height: '100%', borderColor: 'orange' }}>

        <View
          style={{
            height: viewHeight,
            minHeight: viewHeight,
            // backgroundColor: 'blue'
          }}
        >
          <Skeleton
            variant={'rectangle'}
            radius={16}
            height={viewHeight}
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
              height: viewHeight,
              maxHeight: viewHeight,
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
                height: viewHeight,
                maxHeight: viewHeight,
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
          if (!snapShot.empty) {
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
  const getViewLayout = (layout) => {
    console.log(layout);
    setViewHeight(layout.height)
  }

  //
  // return (
  //   <View style={{ flex: 1, backgroundColor: 'red', borderColor: 'yellow', borderWidth: 1 }}>
  //     {/* <View style={{ flex: 1, backgroundColor: 'blue' }}>
  //       <Text>Hi</Text>
  //     </View> */}
  //     {/* <View style={{ flex: 1, backgroundColor: 'green' }}>
  //       <Text>There</Text>
  //     </View> */}

  //   </View>



  // );
  return (
    // <View style={{ height: Dimensions.get('window').height + insets.top, paddingTop: insets.top + 60, backgroundColor: 'red', borderColor: 'yellow', borderWidth: 1,  }}></View>
    <View style={{ height: Dimensions.get('window').height - 110, width: '100%',paddingBottom: 0, top: 0  }}>

      <View style={styles.container}>
        {showPlaceholder ? (
          <View style={{ left: 0, zIndex: 1000, flex: 1 }}>

            <View onLayout={(e) => { getViewLayout(e.nativeEvent.layout) }} style={styles.body}>
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
              <View style={{ flex: 1, width: '100%', overflow: 'hidden', paddingRight: -20 }}>
                <View style={{ flex: 1, marginHorizontal: -10, marginRight: -20, overflow: 'hidden', width: SLIDER_WIDTH + 10 }}>
                  <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    style={{ width: '100%', overflow: 'hidden' }}
                  >
                    {
                      [{}, {}, {}].map((item, index) => {
                        return (
                          <View style={styles.artistCard}>
                            <View style={styles.artistsView}>
                              <Skeleton height={109} width={100} variant="rectangle" radius={20} style={styles.artistImage}></Skeleton>
                            </View>

                          </View>
                        )
                      })
                    }

                  </ScrollView>

                </View>
              </View>


            </View>
          </View>) : (

          
            <View style={{ flex: 1}}>

              <View onLayout={(e) => getViewLayout(e.nativeEvent.layout)} style={styles.body}>
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
              <ArtistScrollView artist={artist} navigation={navigation} SLIDER_WIDTH={SLIDER_WIDTH} />

            </View>

          
        )}

      </View>
    </View>



  );

}
const paddingTop = Platform.OS === 'android' ? 60 : 0
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: Dimensions.get('window').height,

    width: "100%",
    // backgroundColor: 'rgba(0,255,0,0.5)',
    overflow: 'hidden',
    // paddingBottom: 10,
    // top: 0,
    // bottom: 50
    // backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    width: SLIDER_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,

    marginTop: 15,
    // backgroundColor: 'rgba(255,255,0,0.5)'
  },
  footer: {
    // flex: 2,
    width: SLIDER_WIDTH - 30,
    justifyContent: "flex-start",
    alignItems: "center",
    // marginVertical: 8,
    paddingLeft: 0,
    marginLeft: 15,
    marginRight: 20,
    marginVertical: 20,
    flexDirection: "row",
    // paddingLeft: 25,
    // paddingRight: 25,
    height: 109,
    // maxHeight: 110,
    // backgroundColor: 'green',
    overflow: 'hidden'
  },
  artistCard: {
    marginLeft: 10,
    marginRight: 10,
    position: 'relative',
    // backgroundColor: 'red'
  },
  artistsView: {
    // paddingHorizontal: 5,
    borderRadius: 20,
    // borderWidth: 0.5,
    // borderColor: "gray",
    // margin: 5,
    overflow: 'hidden',
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 109,
  },
  artistNameContainer: {
    // backgroundColor: "rgba(0,0,0,0.5)",
    // marginVertical: -10,
    borderRadius: 8,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    height: 20,
    width: "100%",
    bottom: 15,
    paddingHorizontal: 10,
  },
  artistImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderColor: "gray",
    // alignSelf: "center",
    // opacity: 0.9
  },
  ArtistName: {
    color: "#fff",
    textAlign: "left",
    fontWeight: '600',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0.5,
      height: 0.5
    },
    textShadowRadius: 2.5,
    letterSpacing: 0.9
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
    borderRadius: 20,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 109,
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
