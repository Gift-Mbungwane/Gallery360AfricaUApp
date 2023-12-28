import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Share,
  StatusBar,
  Linking,
  ActivityIndicator,
  Platform,
  Image
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { firestore, auth } from "../../Firebase";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { ArtThumbnail, HeroCard, HeroImage, Slider } from "../components";
import { BlurView } from "expo-blur";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native";
import LoaderImage from "../assets/components/LoaderImage";
// import Toast from "react-native-simple-toast";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const LocationIcon = require('../assets/images/location.png')
export default function ExhibitionDetailsScreen({ route, navigation }) {
  const [ExhibitionDetails, setExhibitionDetails] = useState(null);
  const [exhibitionUidState, setExhibitionUid] = useState("");
  const [artworks, setArtworks] = useState([])
  // const [exhibitionImage, setExhibitionImage] = useState(
  //   `${exhibitionImagess}`
  // );
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // const [address, setAddress] = useState("");
  // const [description, setDescription] = useState("");
  const [exhibitionTitle, setExhibitionTitle] = useState("");
  // const [date, setDate] = useState("");
  const [isActive, setActive] = useState(false);

  const { exhibitionUid, artistUid, exhibitionImage, addresses, date, address, description } = route.params;
  console.log({ params: route.params });
  console.log({ img: exhibitionImage });
  console.log({ img: route.params.imgUrls });
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Toast.show(
      //   "Permission to access location was denied",
      //   Toast.LONG,
      //   Toast.CENTER
      // );

      return;
    } else if (status == "granted") {
      setActive(!isActive);
      const currentlocations = await Location.getCurrentPositionAsync({});
      const locations = await Location.geocodeAsync(addresses);

      const latitudes = locations.map((lat) => parseFloat(lat.latitude));
      const longitudes = locations.map((lat) => parseFloat(lat.longitude));
      // const currLatitude = currentlocations.coords.latitude;
      // const currLongitude = currentlocations.coords.longitude;
      setActive(false);
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitudes} + ${longitudes}&dir_action=navigate`;
      Linking.openURL(url);
    }
  };
  useEffect(() => {
    getCollections()
  }, [route.params])
  const getCollections = async () => {
    console.log({ collections: route.params.collections });
    const collectionKeys = route.params.collections.map(item => item.key)
    console.log({ collectionKeys });
    const artworks = await new Promise.all(collectionKeys.map(async (key) => {
      return firestore.collection('Market').where('collection.uid', '==', key).get().then(async (data) => {
        data.docs.forEach(item => {
          console.log({ data: item.data() });
        })
        console.log({ size: data.size });
        const artworks = await new Promise.all(data.docs.map(async (item) => {
          return {
            ...item.data(),
            artUrl: item.data().imgUrls[0].imgUrl,
            ImageUid: item.id,
            artistUid: item.data().userid ?? item.data().artistUid,
            artName: item.data().title,
            ...(await getArtistDetails(item.data().userid ?? item.data().artistUid))
          }
        }))
        console.log({ artworks });
        return artworks
      })
    }))
    console.log('getting collections');
    const collections = artworks.flat()
    console.log({ collections });
    setArtworks(collections)

  }
  const getArtistDetails = async (artistId) => {
    console.log({ artistId });
    return firestore.collection('Artists').doc(artistId.trim()).get().then(doc => {
      const { artistName, photoUrl } = doc.data()
      console.log('some artist details', { artistName, photoUrl });
      return { artistName, photoUrl }
    })
  }
  const onLikePress = () => {
    const uid = auth.currentUser.uid;
    return firestore
      .collection("exhibition")
      .doc(exhibitionUid)
      .collection("likes")
      .doc(uid)
      .set({
        uid: uid,
        exhibitionUid: exhibitionUid,
        like: true
      })
      .then((documentSnap) => {
        setExhibitionUid(exhibitionUid)
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
    // props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })
  };

  const onDislikePress = () => {
    const uid = auth.currentUser.uid;
    return firestore
      .collection("exhibition")
      .doc(exhibitionUid)
      .collection("likes")
      .doc(uid)
      .delete()
      .then(() => {
        setExhibitionUid('')
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const likesState = async () => {
    const uid = auth.currentUser.uid;
    console.log({ exhibitionUid, uid });
    return await firestore
      .collection("exhibition")
      .doc(exhibitionUid)
      .collection("likes")
      .where("uid", "==", uid)
      .onSnapshot((snapShot) => {
        const exhibitionUids = snapShot.docs
          .map((document) => document.data().exhibitionUid)
          .map((doc) => doc);
        setExhibitionUid(exhibitionUids);
      });
  };

  const getExhibitionDetails = () => {
    return firestore
      .collection("exhibition")
      .where("exhibitionUid", "==", exhibitionUid)
      .onSnapshot((snapShot) => {
        // const setexhibitionImage = snapShot.docs.map(
        //   (document) => document.data().exhibitionImage
        // );
        const exhibitionTitles = snapShot.docs.map(
          (document) => document.data().exhibitionTitle
        );
        const dates = snapShot.docs.map((document) => document.data().date);
        const descriptions = snapShot.docs.map(
          (document) => document.data().description
        );
        const addresss = snapShot.docs.map(
          (document) => document.data().address
        );

        // setExhibitionImage(setexhibitionImage);
        // setAddress(addresss);
        // setDate(dates);
        setExhibitionTitle(exhibitionTitles);
        // setDescription(descriptions);
      });
  };

  useEffect(() => {
    getExhibitionDetails();
    likesState();
    // getLocation();

    return () => likesState();
    return () => getLocation();
    return () => getExhibitionDetails();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${address},\n \n ${date},\n \n ${description}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.top}>
        <ImageBackground
          source={{ uri: `${exhibitionImage}` }}
          style={styles.image}
          imageStyle={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        ></ImageBackground>
      </View> */}
      <Slider contentContainerStyle={styles.top}>
        {
          route.params.imgUrls.map(item => (
            <LoaderImage uri={item.imgUrl} style={styles.image} indicatorPadding={120}/>
            // <Image source={{ uri: item.imgUrl }} style={styles.image} />
            // <Text>Hi there</Text>
          ))
        }
      </Slider>

      <BlurView intensity={50} style={styles.DetailsContainer}>
        <ScrollView
          scrollEnabled
          contentContainerStyle={{}}>

          <View style={{ margin: 10, marginBottom: 90 }}>
            <Text
              style={{
                color: "#000000",
                paddingBottom: 10,
                fontSize: 25,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {route.params.name}
            </Text>
            <Text
              style={{
                color: "#000000",
                paddingBottom: 15,
                fontSize: 14,
                alignSelf: "flex-start",
              }}
            >
              {`${date.fromDate.date} ${date.fromDate.month} - ${date.toDate.date} ${date.toDate.month} ${date.toDate.year}`}
            </Text>
            <View style={{ maxHeight: 60, flexDirection: 'row', gap: 5, marginBottom: 10 }}>
              <Image source={LocationIcon} style={{ width: 40, height: 40, alignSelf: 'center' }} />
              <Text
                numberOfLines={2}
                style={{
                  color: "#000000",
                  // paddingBottom: 15,
                  // padding: 2,
                  flex: 1,
                  marginLeft: 10,
                  fontSize: 14,
                  alignSelf: "center",
                  // backgroundColor: 'red'
                }}
              >
                {route.params.address}
              </Text>
            </View>

            <Text
              style={{
                color: "#000000",
                paddingBottom: 20,
                fontSize: 14,
                width: "100%",
                // borderColor: 'red',
                // borderWidth: 1,
                alignSelf: "center",
              }}
            >
              {description}
            </Text>
            <View style={{ gap: 10, justifyContent: "space-evenly", flexDirection: 'row', flexWrap: 'wrap' }}>
              {
                artworks.map(item => {
                  return <>
                    <ArtThumbnail
                      key={item.artUrl}
                      price={item.price}
                      showPrice={false}
                      uri={item.artUrl}
                      style={{ height: 160, width: 130 }}
                    />
                    <ArtThumbnail
                      key={item.artUrl}
                      price={item.price}
                      showPrice={false}
                      uri={item.artUrl}
                      style={{ height: 160, width: 130 }}
                    />
                    <ArtThumbnail
                      key={item.artUrl}
                      price={item.price}
                      showPrice={false}
                      uri={item.artUrl}
                      style={{ height: 160, width: 130 }}
                    />
                    <ArtThumbnail
                      key={item.artUrl}
                      price={item.price}
                      showPrice={false}
                      uri={item.artUrl}
                      style={{ height: 160, width: 130 }}
                    />
                  </>
                })
              }
            </View>
          </View>
        </ScrollView>

        <View style={{ position: 'absolute', bottom: 10, width: '100%', paddingHorizontal: 0, alignSelf: 'center' }}>
          <BlurView intensity={60} style={{ flex: 1, flexDirection: "row", justifyContent: 'space-between', bottom: 0, borderRadius: 30, overflow: 'hidden', paddingRight: 10 }}>
            <TouchableOpacity
              style={styles.VisitLocation}
              onPress={() => getLocation()}
            >
              {isActive ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.VisitLocationtxt}>Visit Location</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.Heart}
              onPress={() =>
                onShare({
                  date: date,
                  address: address,
                  description: description,
                })
              }
            >
              <Entypo name="share" size={30} color={"#000000"} />
            </TouchableOpacity>
            {exhibitionUidState == exhibitionUid ? (
              <View style={styles.Heart}>
                <Entypo
                  name="heart"
                  size={30}
                  color="red"
                  onPress={() => onDislikePress()}
                />
              </View>
            ) : (
              <View style={styles.Heart}>
                <Entypo
                  name="heart"
                  size={30}
                  color="#000000"
                  onPress={() => onLikePress()}
                />
              </View>
            )}
          </BlurView>
        </View>




      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: "100%",
    width: "100%"
  },
  columnWrapper: {
    display: 'flex',
    flex: 1,
    justifyContent: "space-between",
    // backgroundColor: 'blue',
    alignItems: 'center'
  },
  top: {
    marginTop: STATUSBAR_HEIGHT,
    // height: "60%",
    flex: 0.54,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    top: 0,
    // marginVertical: -170,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    width: Dimensions.get('window').width, aspectRatio: 0.7
  },
  BackButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 20,
    borderColor: "#ffffff",
  },
  ExhibitionHeaderText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    left: 35,
    top: 5,
  },
  DetailsContainer: {
    width: "90%",
    position: 'absolute',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: "center",
    height: (Dimensions.get('window').height) / 2 + 50,
    // marginTop: 25,
    // top: -150,
    backgroundColor: "rgba(230, 230, 230,0.5)",
    borderColor: "#rgb(230, 230, 230)",
    // borderColor: 'black',
    // borderWidth: 10,
    // marginVertical: "-23%",
    overflow: 'hidden',
    bottom: 0,
    paddingHorizontal: 10
  },
  VisitLocation: {
    backgroundColor: "#000000",
    justifyContent: "center",
    borderRadius: 20,
    alignSelf: "center",
    height: 50,
    width: 178,
    marginLeft: 8,
    marginVertical: 8,
  },
  VisitLocationtxt: {
    textAlign: "center",
    fontSize: 14,
    color: "#ffffff",
  },
  Heart: {
    alignSelf: "flex-end",
    marginHorizontal: 10,
    marginVertical: 16,
  },
});
