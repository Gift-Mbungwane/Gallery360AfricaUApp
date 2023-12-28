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
import { ScrollableFilterCard, TabContent } from "../components";
import { useHeaderHeight } from "@react-navigation/elements";
// const background = require("../assets/images/home.png");
//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 40);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.2) / 5.2);

const screenHeight = Dimensions.get('window').height
const carouselHeight = (screenHeight - 300)
const ITEM_HEIGHT = carouselHeight;
// console.log({ statusBarHeight, paddingOnTop,navBarHeight,  screenHeight, carouselHeight });
//
// console.log('market height: ' + screenHeight);

export default function MarketScreen({ navigation }) {

  //
  const [artist, setArtist] = useState([]);
  const [state, setState] = useState();
  const [data, setData] = useState(null);
  const [artwork, setArtwork] = useState([])
  const [filteredArtworks, setFilteredArtworks] = useState(null)
  const [showPlaceholder, toggleShowPlaceholder] = useState(true)
  const ARTWORK_COLLECTION = "Market"
  const ARTIST_COLLECTION = "Artists"

  const getArtist = () => {
    return firestore
      .collection(ARTIST_COLLECTION)
      .orderBy("timeStamp", "desc")
      // .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists1 = snapShot.docs.map((docSnap) => ({
          ...docSnap.data()
        }));
        setArtist(allArtists1);
      });
  };

  const sortArtist = (sortMethod) => {
    console.log({ sortMethod });
    // console.log({ artist });c
    if (sortMethod === 'new') sortAscTimestamp(artist)
    if (sortMethod === 'old') sortDescTimeStamp(artist)
    if (sortMethod === 'z-a') sortDescName(artist)
    if (sortMethod === 'a-z') sortAscName(artist)
  }
  const sortArtworks = (sortMethod) => {
    console.log({ sortMethod });
    // console.log({ artist });c
    if (sortMethod === 'new') sortAscArtTimestamp(artist)
    if (sortMethod === 'old') sortDescArtTimeStamp(artist)
    if (sortMethod === 'z-a') sortDescArtname(artist)
    if (sortMethod === 'a-z') sortAscArtname(artist)
  }
  const sortAscName = (array) => {
    try {
      setArtist([...artist].sort((a, b) => a.artistName.localeCompare(b.artistName)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortDescName = (array) => {
    try {
      setArtist([...artist].sort((a, b) => b.artistName.localeCompare(a.artistName)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortDescTimeStamp = () => {
    try {
      setArtist([...artist].sort((a, b) => b.timeStamp.localeCompare(a.timeStamp)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortAscTimestamp = () => {
    try {
      setArtist([...artist].sort((a, b) => a.timeStamp.localeCompare(b.timeStamp)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortAscArtname = (array) => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filterArtworks].sort((a, b) => a.artName.localeCompare(b.artName)))
      }
      setArtwork([...artwork].sort((a, b) => a.artName.localeCompare(b.artName)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortDescArtname = (array) => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => b.artName.localeCompare(a.artName)))
      }
      setArtwork([...artwork].sort((a, b) => b.artName.localeCompare(a.artName)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortDescArtTimeStamp = () => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => b.timeStamp.localeCompare(a.timeStamp)))
      }
      setArtwork([...artwork].sort((a, b) => b.timeStamp.localeCompare(a.timeStamp)))
    } catch (error) {
      console.log(error);
    }
  }
  const sortAscArtTimestamp = () => {
    try {
      if (filteredArtworks) {
        setFilteredArtworks([...filteredArtworks].sort((a, b) => a.timeStamp.localeCompare(b.timeStamp)))
      }
      setArtwork([...artwork].sort((a, b) => a.timeStamp.localeCompare(b.timeStamp)))
    } catch (error) {
      console.log(error);
    }
  }

  const filterArtworks = (filter) => {
    console.log({ filter });
    if (filter === 'All') {
      setFilteredArtworks(null)
    } else {
      setFilteredArtworks([...artwork].filter(item => item.artworkType.includes(filter)))
    }
  }
  useEffect(() => {
    console.log({ filteredArtworks });
  }, [filteredArtworks])

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
  const getArtistDetails = async (artistId) => {
    console.log({ artistId });
    return firestore.collection(ARTIST_COLLECTION).doc(artistId.trim()).get().then(doc => {
      const { artistName, photoUrl } = doc.data()
      console.log('some artist details', { artistName, photoUrl });
      return { artistName, photoUrl }
    })
  }
  const getArtWorks = () => {
    return firestore.collection(ARTWORK_COLLECTION).orderBy("title", "desc").limit(5).onSnapshot(async (snapShot) => {
      // console.log({ artworks: 'searching'});
      if (!snapShot.empty) {
        console.log('snapshot not empty');
        const art = await Promise.all(snapShot.docs.map(async (item) => ({
          ...item.data(),
          isArt: true,
          art,
          artUrl: item.data().imgUrls[0].imgUrl,
          ImageUid: item.id,
          artistUid: item.data().userid ?? item.data().artistUid,
          artName: item.data().title,
          ...(await getArtistDetails(item.data().userid ?? item.data().artistUid))
        })))
        console.log({ art });
        setArtwork(art)
        // console.log('artworks: ', art);
        setTimeout(() => {
          toggleShowPlaceholder(false)
        }, 2400)
      } else {
        console.log('snapshot empty');
      }

    })
  }

  useEffect(() => {
    let isMounted = true;
    console.log('on market');
    if (isMounted) {
      firestore
        .collection(ARTWORK_COLLECTION)
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
  useEffect(() => {
    console.log({ artwork: artwork[1] });
  }, [artwork])
  const getViewLayout = (layout) => {
    console.log(layout);
    setViewHeight(layout.height)
  }
  const navigateToArtwork = async (item) => {
    // const artistUid = item.artistUid
    // console.log({ item });
    const { artistUid, artistName, photoUrl, imageUID } = item
    console.log({ artistUid, artistName, photoUrl, imageUID });
    navigation.navigate('ArtPreview', {
      artistUid, imageUID, photoUrl, artistName
    })
  }

  return (
    <TabContent>
      <View style={{ flex: 1, backgroundColor: 'transparent' }}>
        <CreatorsSection
          artists={artist}
          navigation={navigation}
          onSortChange={(val) => { sortArtist(val) }}
        />
        <ArtworksSection
          navigation={navigation}
          artworks={filteredArtworks || artwork}
          navigateToArtwork={(item) => navigateToArtwork(item)}
          onSortChange={(val) => sortArtworks(val)}
          onFilterChange={(val) => filterArtworks(val)}
        />
      </View>
    </TabContent>

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
