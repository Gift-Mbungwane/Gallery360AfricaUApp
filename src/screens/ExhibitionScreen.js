import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
//
// import Carousel from "react-native-snap-carousel";
//
import { firestore } from "../../Firebase";
import LoaderImage from "../assets/components/LoaderImage";
import ArtistScrollView from "../assets/components/ArtistScrollView";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { ExhibitionSwiper, TabContent } from "../components";

import { getDate } from "../utils/helper-functions";
import { BlurView } from "expo-blur";

//
const SLIDER_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH - 40);
// const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 6.5) / 5);
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 80 + statusBarHeight : 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - statusBarHeight;
const tabBarHeight = 50
const paddingOnBottom = 90
// const screenHeight = Dimensions.get('screen').height - statusBarHeight - paddingOnTop - navBarHeight - tabBarHeight - paddingOnBottom;
const screenHeight = Dimensions.get('window').height
const carouselHeight = (screenHeight - 600)
const ITEM_HEIGHT = carouselHeight;
export default function ExhibitionScreen({ navigation }) {
  //

  const [state, setState] = useState();
  const [artist, setArtist] = useState(null);
  const [exhibition, setExhibition] = useState([]);
  const [viewHeight, setViewHeight] = useState(screenHeight)
  const insets = useSafeAreaInsets()

  // console.log('Exhibition height: ' + screenHeight);
  //
  const getArtist = () => {
    return firestore
      .collection("Artists")
      .orderBy("timeStamp", "desc")
      .limit(3)
      .onSnapshot((snapShot) => {
        const allArtists = snapShot.docs.map((docSnap) => docSnap.data());
        setArtist(allArtists);
      });
  };

  //
  const getExhibition = () => {
    return firestore.collection("exhibition").onSnapshot((snapShot) => {
      // const allExhibitions = snapShot.docs.map((docSnap) => docSnap.data());
      // const unfiltered = snapShot.docs.map((docSnap) => docSnap.data())
      const allExhibitions = snapShot.docs.map(docSnap => ({
        ...docSnap.data(),
        isExhibition: true,
        exhibitionUid: docSnap.id,
        imgUrl: docSnap.data().imgUrls[0].imgUrl,
        date: {
          fromDate: getDate(docSnap.data().date.fromDate),
          toDate: getDate(docSnap.data().date.toDate)
        },

      }));
      // console.log(allExhibitions);
      // console.log({ allExhibitions });
      setExhibition(allExhibitions);
      // setExhibition([...allExhibitions, { isExhibition: false, text: 'Show All' }]);
    });
  };
  // const getDate = (timeStamp) => {
  //   try {
  //     // console.log({ timeStamp });
  //     const stamp = typeof timeStamp === 'string' ? JSON.parse(timeStamp) : timeStamp
  //     // return 27
  //     const fullDate = new Date(stamp.seconds * 1000)
  //     const date = fullDate.getDate()
  //     const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  //     const month = monthArr[fullDate.getMonth()]
  //     const year = fullDate.getFullYear()
  //     // console.log({ date: { date, month, year } })
  //     return { date, month, year }
  //   } catch (error) {
  //     return 'undefined'
  //   }

  // }
  useEffect(() => {
    getExhibition();
    getArtist();

    // return () => getArtist();
    // return () => getExhibition();
  }, []);
  useEffect(() => {
    // console.log({ viewHeight });
  }, [viewHeight])
  //
  const _renderItem = ({ item, index }) => {

    if (item.isExhibition) {
      return (
        <View
          style={{ flex: 1, backgroundColor: 'yellow', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ExhibitionDetails", {
                exhibitionUid: item.exhibitionUid,
                artistUid: item.artistUid,
                exhibitionTitle: item.exhibitionTitle,
                date: item.date,
                addresses: item.address,
                description: item.description,
              })
            }
          >
            <LoaderImage
              uri={item.imgUrls[0].imgUrl}
              style={{ width: ITEM_WIDTH, height: 400, borderRadius: 16 }}
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
              <Text style={styles.artNameTxt} numberOfLines={1}>{item.exhibitionTitle}</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.artTypeTxt}>{item.date.fromDate.date} {item.date.fromDate.month}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.showMoreTextOpacity} onPress={() => navigation.navigate("PreviewMore", { datas: data })} >
            <Text style={styles.showMoreText} numberOfLines={1}>Show All</Text>
          </TouchableOpacity>
        </View>
      )
    }

  };
  const getViewLayout = (event) => {
    // console.log({ event: event.nativeEvent });
    setViewHeight(event.nativeEvent.height)
  };

  //
  return (
    <TabContent>
      <View style={{ flex: 1, paddingVertical: 15 }}>
        <View style={{ flex: 1, paddingHorizontal: 20, }}
          onLayout={(event) => getViewLayout(event)}>
            <ExhibitionSwiper exhibition={exhibition} navigation={navigation}/>
        </View>
      </View>
      <ArtistScrollView navigation={navigation} artist={artist} SLIDER_WIDTH={SLIDER_WIDTH} />
    </TabContent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 0,
    width: "100%",
    overflow: 'hidden',
    // backgroundColor: "red",
    // paddingBottom: 10,
    // top: 10
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: 'yellow',
    paddingTop: 0,
    // borderColor: 'white',
    // borderWidth: 1,
    marginTop: 15
    // padding: 0
  },
  footer: {
    // flex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    // paddingLeft: 20,
    height: 109,
    marginVertical: 30,
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: 'green'
  },
  artistsView: {
    paddingHorizontal: 5,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gray",
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
    fontSize: 28,
    color: "#FFF",
    paddingHorizontal: 15,
    fontWeight: '500'
    // paddingRight: 60
  },
  artTypeTxt: {
    color: "#FFF",
    fontSize: 14,
    paddingHorizontal: 15,
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
});
