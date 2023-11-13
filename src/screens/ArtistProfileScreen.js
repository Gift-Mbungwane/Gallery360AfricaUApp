import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  // SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
// import Toast from "react-native-simple-toast";
//
import { auth, firestore } from "../../Firebase";
//
import { FontAwesome } from "@expo/vector-icons";
//
import { Video, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { useHeaderHeight } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../assets/styles/GlobalStyles";
import BoughtArtworksSection from "../components/sections/BoughtArtworksSection";
import TransparentHeaderView from "../components/TransparentHeaderView";
import ArtistArtworks from "../components/sections/ArtistArtworks";
import ArtistProfileHeader from "../components/sections/ArtistProfileHeader";
//
export default function ArtistProfileScreen({ route, navigation }) {
  //
  const { artistUid, photoUrl, artistName, description } = route.params;
  console.log('params: ', route.params)
  //
  const [uid, setUid] = useState(null)
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const [followingBoolean, setFollowingBoolean] = useState(false);
  const [following, setFollowing] = useState("");
  const [photoURL, setPhotoURL] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null)
  const [FullName, setFullName] = useState(null);
  const [art, setArt] = useState(null);
  const [size, setSize] = useState(0);
  const [videoViewSize, setVideoViewSize] = useState(100)
  const video = useRef(null)
  const controlRef = useRef();
  const videoViewRef = useRef(null);
  const [status, setStatus] = React.useState({});
  const headerHeight = useHeaderHeight()
  console.log({ headerHeight });
  //  video
  const onStateChange = (state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
    if (state !== "playing") {
      setPlaying(false);
    }
  };

  //

  const getArt = async () => {
    // console.log(`artist ID : ${artistUid}s`);
    console.log({ artistUid });
    // return
    console.log('running art getter');
    firestore
      .collection("newArtworks")
      .where("userid", "==", artistUid)
      .where("isEnabled", "==", true)
      .limit(3)
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let allArt = snapShot.docs.map((docSnap) => ({ isArt: true, ...docSnap.data() }));
          // console.log('all art: ', allArt);
          // if (allArt.length > 0) {
          //   setArt([...allArt, { isArt: false, ImageUid: null }]);
          // }
          setArt(allArt)
        }


      });
  };
  useEffect(() => {
    // console.log(art);
    if (art) {
      // console.log(art.length);
    }

  }, [art])

  const getArtistData = () => {
    // console.log('data: ', artistUid)
    firestore.collection('artists').doc(artistUid).get().then(doc => {

      if (doc.exists) {
        // console.log('data exists')
        setVideoUrl(doc.data().introClip ? doc.data().introClip : 'no video')
        // setVideoUrl(doc.data().videoUrl)
      } else {
        // console.log('data does not exist')
      }
      // console.log(doc.data())
    }).catch(err => {
      // console.log(err)
    })
  }
  useEffect(() => {
    // console.log('url: ', videoUrl)
  }, [videoUrl])
  const getNumberOfImage = () => {
    // console.log('artistUid: ', artistUid);
    firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("isEnabled", "==", true)
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          const artSizes = snapShot.size - 2;
          // console.log(artSizes, " the art size of the artist");
          setSize(artSizes);
        }
      });
  };
  // follow artist methods
  const onFollow = () => {
    firestore
      .collection("following")
      .doc(artistUid)
      .set({
        artistUid: artistUid,
      })
      .then(() => {
        onFollowing(artistUid);
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const onFollowing = async () => {
    auth.onAuthStateChanged((user) => {
      console.log({ user });
    })
    return
    try {
      await firestore
        .collection("following")
        .doc(artistUid)
        .collection("userFollowing")
        .doc(uuid)
        .set({
          uuid: uuid,
          artistUid: artistUid,
          photo: photoURL,
          artistPhoto: photoUrl,
          fullName: FullName,
          artistName: artistName,
        })
        .then(() => {
          // Toast.show(
          //   `You're now Following ${artistName}`,
          //   Toast.LONG,
          //   Toast.CENTER
          // );
        });
    } catch (error) {
      // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  //
  const onUnFollowing = () => {
    return
    // const uuid = auth.currentUser.uid;

    firestore
      .collection("following")
      .doc(artistUid)
      .collection("userFollowing")
      .doc(uuid)
      .delete()
      .catch(err => console.log(err));
    // Toast.show(
    //   `You're no longer following ${artistName}`,
    //   Toast.LONG,
    //   Toast.CENTER
    // );

  };

  //
  const followState = () => {
    // const uid = auth.currentUser.uid;
    // console.log({ uid });
    return
    firestore
      .collection("following")
      .doc(artistUid)
      .onSnapshot((snapShot1) => {
        if (snapShot1.exists) {
          snapShot1.ref
            .collection("userFollowing")
            .where("uuid", "==", uid)
            .onSnapshot((snapShot) => {
              if (!snapShot.empty) {
                const follows = snapShot.docs.map(
                  (document) => document.data().artistUid
                );
                setFollowing(follows);
              }
            });
        }
      });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUid(user.uid)
    })
    let isMounted = true;
    if (isMounted) {
      getArt();
      getNumberOfImage();
      followState();
      getArtistData();
      // const ref = videoViewRef.current
      // console.log('ref: ', ref.contentSizeChange);
      // return () => followState();
      // return () => getArt();
      // return () => getNumberOfImage();
      setTimeout(() => {
        // console.log(VideoPlayer);
        // console.log(videoViewRef.current.playAsync())
      }, 3000)
    }


    return () => {
      isMounted = false
      // console.log(Video);
      // videoViewRef.current.pauseAsync()
    }
  }, []);
  useEffect(() => {
    // console.log(art);

  }, [art])
  //
  const setVideoSize = (size) => {
    // console.log(size);
    setVideoViewSize(size)
  }
  const CenterMarginView = ({ children }) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {children}
      </View>
    )
  }
  return (
    <ImageBackground
      source={imageBg}
      resizeMode="cover"
      style={[styles.container]}
    >
      <TransparentHeaderView style={{ paddingHorizontal: 20 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <ArtistProfileHeader artistUid={artistUid} photoUrl={photoUrl} artistName={artistName} />
          <BoughtArtworksSection artworks={art} />
          <ArtistArtworks artworks={art} artistName={artistName} artistPic={photoUrl} onPress={(imageUID) => navigation.navigate('ArtPreview', { artistUid, imageUID: imageUID, photoUrl, artistName })} />

        </View>
      </TransparentHeaderView>

    </ImageBackground>
  );
}

const imageBg = require("../assets/images/home.png");
const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' ? 60 : 60
// console.log({ paddingOnTop });
// console.log('here is the fact');
// console.log('bar height: ', statusBarHeight);
const styles = StyleSheet.create({
  container: {
    // height: "100%",
    flex: 1,
    width: "100%",
    // paddingTop: paddingOnTop,
    // backgroundColor: "red",
  },
  topLevelView: {
    flex: 1,
    // backgroundColor: 'red'
  },
  TopContainer: {
    // top: statusBarHeight ? statusBarHeight : 0,
    // paddingTop: paddingOnTop,
    flex: 1,
    top: 0,
    padding: 0,
    flex: 2,
    // borderColor: 'blue',
    // borderWidth: 5,
  },
  MiddleContainer: {
    flex: 2,
    marginVertical: 20, top: 0,
    // backgroundColor: "blue"
  },
  BottomContainer: {
    flex: 2,
    // top: 20,

    // backgroundColor: 'red',
    paddingBottom: 20
  },
  moreText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    top: 15,
  },
  noArtView: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    // alignContent: 'center'
  },
  noArtText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: 'bold',
    width: '60%',
    // height: ,
    textAlign: "center",
    justifyContent: 'center',
    // borderColor: 'black',
    // borderWidth: 1
  },
  img: {
    height: 150,
    width: 120,
    borderRadius: 15,
  },
  listItem2: {
    // paddingLeft: 15,
    paddingTop: 20,
    flexDirection: "column",
    marginHorizontal: 5,
    marginBottom: 45,
    // borderColor: 'yellow',
    // borderWidth: 1,
    flex: 1,
    height: '100%'
  },
  price: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  priceView: {
    backgroundColor: "rgba(16, 18, 27, 0.4)",
    marginVertical: -25,
    borderRadius: 20,
    alignSelf: "center",
    height: 20,
    width: "90%",
  },
  listItem: {
    // paddingTop: 20,
    // marginLeft: 15,
    paddingHorizontal: 20,
    width: "100%",
    // height: 100,
    flex: 2,
    // borderColor: 'blue',
    // borderWidth: 1
  },
  img2: {
    height: 50,
    width: 50,
    borderRadius: 25,
    // borderColor: 'rgba(196, 196, 196, 0.51)',
    // borderWidth: 4,
    marginLeft: 3,
  },
  BackButton: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 10,
  },
  Heart: {
    alignSelf: "flex-end",
    marginHorizontal: 160,
    bottom: 15,
  },
  VideoContainer: {
    borderRadius: 20,
    width: 325,
    height: 490,
    backgroundColor: "blue",
    alignSelf: "center",
    // marginTop: -95,
  },
});
