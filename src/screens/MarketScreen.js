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
//
import { firestore } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
import Skeleton from "../assets/components/Skeleton";
import LoaderImage from "../assets/components/LoaderImage";
import ArtistScrollView from "../assets/components/ArtistScrollView";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ArtworksSection, CreatorsSection } from "../components/sections";
import { ScrollableFilterCard } from "../components";
import { useHeaderHeight } from "@react-navigation/elements";
// const background = require("../assets/images/home.png");
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
  const headerHeight = useHeaderHeight()
  ///

  const getArtist = () => {
    return firestore
      .collection("galleryUsers")
      .orderBy("timeStamp", "desc")
      // .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists1 = snapShot.docs.map((docSnap) => ({
          ...docSnap.data(),
          photoUrl: docSnap.data().imageUrl,
          artistUid: docSnap.id,
          artistName: docSnap.data().fullname
        }));
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
  const getArtistName = async (artistId) => {
    return firestore.collection('galleryUsers').doc(artistId).get().then(doc => {
      const fullname = doc.data().fullname
      console.log({ fullname });
      return fullname 
    })
  }
  const getArtWorks = () => {
    return firestore.collection('newArtworks').orderBy("title", "desc").limit(5).where('isEnabled', '==', true).onSnapshot(async(snapShot) => {
      if (!snapShot.empty) {
        const art = await Promise.all(snapShot.docs.map(async (item) => ({
          ...item.data(),
          isArt: true,
          art,
          artUrl: item.data().imgUrls[0].imgUrl,
          ImageUid: item.id,
          artistUid: item.data().userid,
          artName: item.data().title,
          artistName: await getArtistName(item.data().userid)
        })))

        setArtwork(art)
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

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firestore
        .collection("newArtworks")
        .where("status", "==", "approved")
        .orderBy("title", "desc")
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
  const navigateToArtwork = async (item) => {
    // const artistUid = item.artistUid
    console.log({ item });
    firestore.collection('galleryUsers').doc(item.artistUid).get().then(doc => {
      console.log(doc.data());
      navigation.navigate('ArtPreview', {
        artistUid: item.artistUid, imageUID: item.imageUID, photoUrl: doc.data().imageUrl, artistName: doc.data().fullname
      })
    })

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
    // <ScrollView contentContainerStyle={{ backgroundColor: '#FFFFFF' }} scrollEnabled={false}>
    //   <CreatorsSection artists={artist} navigation={ navigation } />
    //   <ArtworksSection navigation={ navigation } />
    // </ScrollView>
    // <View style={{ backgroundColor: '#FFFFFF', height: Dimensions.get('window').height + 400 }} >
    //   <CreatorsSection artists={artist} navigation={navigation} />
    //   <ArtworksSection navigation={navigation} />
    // </View>
    <View style={{ flex: 1, paddingBottom: insets.top + 12, backgroundColor: 'green' }}>
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#FFFFFF', borderColor: 'red', borderWidth: 1 }}>
        <CreatorsSection artists={artist} navigation={navigation} />
        <ArtworksSection navigation={navigation} artworks={artwork} navigateToArtwork={(item) => navigateToArtwork(item)} />
      </ScrollView>
    </View>

  )

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
