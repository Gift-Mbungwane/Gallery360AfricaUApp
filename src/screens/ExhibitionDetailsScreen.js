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
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { firestore, auth } from "../../Firebase";
import * as Location from "expo-location";
import Constants from "expo-constants";

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

export default function ExhibitionDetailsScreen({ route, navigation }) {
  const [ExhibitionDetails, setExhibitionDetails] = useState(null);
  const [exhibitionUidState, setExhibitionUid] = useState("");
  const [exhibitionImage, setExhibitionImage] = useState(
    `${exhibitionImagess}`
  );
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [exhibitionTitle, setExhibitionTitle] = useState("");
  const [date, setDate] = useState("");
  const [isActive, setActive] = useState(false);

  const { exhibitionUid, artistUid, exhibitionImagess, addresses } =
    route.params;

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission to access location was denied",
      });

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
      })
      .then((documentSnap) => {})
      .catch((error) => alert(error));
    // props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })
  };

  const onDislikePress = () => {
    const uid = auth.currentUser.uid;
    return firestore
      .collection("exhibition")
      .doc(exhibitionUid)
      .collection("likes")
      .doc(uid)
      .delete({})
      .then(() => {})
      .catch((error) => alert(error));
  };

  const likesState = async () => {
    const uid = auth.currentUser.uid;
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
        const setexhibitionImage = snapShot.docs.map(
          (document) => document.data().exhibitionImage
        );
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

        setExhibitionImage(setexhibitionImage);
        setAddress(addresss);
        setDate(dates);
        setExhibitionTitle(exhibitionTitles);
        setDescription(descriptions);
      });
  };

  useEffect(() => {
    getExhibitionDetails();
    likesState();
    // getLocation();

    return () => likesState();
    // return () => getLocation();
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
      <View style={styles.Top}>
        <ImageBackground
          source={{ uri: `${exhibitionImage}` }}
          style={styles.image}
          imageStyle={{ borderRadius: 20 }}
        ></ImageBackground>
      </View>

      <View style={styles.DetailsContainer}>
        <View style={{ flex: 5 }}>
          <Text
            style={{
              color: "#000000",
              paddingBottom: 25,
              fontSize: 25,
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {exhibitionTitle}
          </Text>
          <Text
            style={{
              color: "#000000",
              paddingBottom: 15,
              fontSize: 14,
              alignSelf: "center",
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              color: "#000000",
              paddingBottom: 15,
              fontSize: 14,
              alignSelf: "center",
            }}
          >
            {address}
          </Text>
          <Text
            style={{
              color: "#000000",
              paddingBottom: 40,
              fontSize: 14,
              alignSelf: "center",
            }}
          >
            {description}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: "100%",
    width: "100%",
  },
  Top: {
    marginTop: STATUSBAR_HEIGHT,
    height: "70%",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: -10,
    marginVertical: -170,
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: "100%",
    width: "100%",
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
    width: "85%",
    borderWidth: 1,
    borderRadius: 20,
    alignSelf: "center",
    height: "48%",
    marginTop: 25,
    backgroundColor: "rgba(255,255,355,0.3)",
    borderColor: "#ffffff",
    marginVertical: "-23%",
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
