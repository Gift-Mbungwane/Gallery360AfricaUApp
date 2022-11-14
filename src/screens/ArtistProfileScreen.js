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
//
export default function ArtistProfileScreen({ route, navigation }) {
  //
  const { artistUid, photoUrl, artistName, description } = route.params;
  // console.log('params: ', route.params)
  //
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
    return await firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("isEnabled", "==", true)
      .limit(2)
      .onSnapshot((snapshot) => {
        const allArt = snapshot.docs.map((docSnap) => docSnap.data());
        // console.log('all art: ', allArt);
        setArt(allArt);
      });
  };
  const getArtistData = () => {
    console.log('data: ', artistUid)
    return firestore.collection('artists').doc(artistUid).get().then(doc => {

      if (doc.exists) {
        console.log('data exists')
        setVideoUrl(doc.data().introClip ? doc.data().introClip : 'no video')
        // setVideoUrl(doc.data().videoUrl)
      } else {
        console.log('data does not exist')
      }
      console.log(doc.data())
    }).catch(err => {
      console.log(err)
    })
  }
  useEffect(() => {
    console.log('url: ', videoUrl)
  }, [videoUrl])
  const getNumberOfImage = async () => {
    // console.log('artistUid: ', artistUid);
    return await firestore
      .collection("Market")
      .where("ArtistUid", "==", artistUid)
      .where("isEnabled", "==", true)
      .onSnapshot((snapshot) => {
        const artSizes = snapshot.size - 2;
        // console.log(artSizes, " the art size of the artist");
        setSize(artSizes);
      });
  };
  // follow artist methods
  const onFollow = async () => {
    return await firestore
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
    const uuid = auth.currentUser.uid;

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
  const onUnFollowing = async () => {
    const uuid = auth.currentUser.uid;

    try {
      await firestore
        .collection("following")
        .doc(artistUid)
        .collection("userFollowing")
        .doc(uuid)
        .delete();
      // Toast.show(
      //   `You're no longer following ${artistName}`,
      //   Toast.LONG,
      //   Toast.CENTER
      // );
    } catch (error) {
      // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  //
  const followState = () => {
    const uid = auth.currentUser.uid;
    // console.log({ uid });
    return firestore
      .collection("following")
      .doc(artistUid)
      .onSnapshot((snapShot1) => {
        snapShot1.ref
          .collection("userFollowing")
          .where("uuid", "==", uid)
          .onSnapshot((snapShot) => {
            const follows = snapShot.docs.map(
              (document) => document.data().artistUid
            );
            setFollowing(follows);
          });
      });
  };

  useEffect(() => {
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
      console.log(VideoPlayer);
      // console.log(videoViewRef.current.playAsync())
    }, 3000)

    return () => {
      console.log(Video);
      // videoViewRef.current.pauseAsync()
    }
  }, []);
  useEffect(() => {
    // console.log(art);

  }, [art])
  //
  const setVideoSize = (size) => {
    console.log(size);
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
      resizeMode="stretch"
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[ {marginTop: headerHeight, maxHeight: Dimensions.get('window').height - headerHeight, flex: 1, borderColor: 'red', borderWidth: 1 } ]}>
          <View style={[ styles.TopContainer]} >
            <View onLayout={(e) => setVideoSize(e.nativeEvent.layout.height)} style={{ marginVertical: 0, padding: 0, width: Dimensions.get('window').width, height: '100%', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', backgroundColor: '#000', marginVertical: 'auto' /* overflow: 'hidden' */ }}>
              {/* <VideoPlayer
            defaultControlsVisible={true}

            style={{ height: videoViewSize, padding: 20 }}

            videoProps={{
              style: { height: '100%', padding: 20 },
              shouldPlay: false,
              resizeMode: ResizeMode.CONTAIN,
              source: {
                uri: videoUrl,
              },
            }}
          /> */}
              {!videoUrl ? (
                <CenterMarginView>
                  <ActivityIndicator size="large" color='white' />
                </CenterMarginView>
              ) : videoUrl === 'no video' ? (
                <CenterMarginView>
                  <Text style={{ color: 'white', fontSize: 24 }}>No video found</Text>
                </CenterMarginView>
              ) : (
                <Video
                  style={{ zIndex: 10000, flex: 1 }}
                  ref={videoViewRef}
                  // style={{ height: videoViewSize, maxWidth: '100%', padding: 0, alignSelf: 'center' }}
                  // style={{ height: videoViewSize, backgroundColor: 'yellow'}}
                  shouldPlay={false}
                  useNativeControls
                  resizeMode='contain'
                  source={{
                    uri: videoUrl,
                    // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
                  }}
                />
              )}


              {/* <Video
        ref={video}
        style={{ height: 100, width: 100}}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
              {/* <Text style={{ backgroundColor: 'yellow'}}>Hi</Text> */}
            </View>
          </View>

          <View style={styles.MiddleContainer}>
            <View style={styles.listItem}>
              <View style={{ flexDirection: "row", width: "91%" }}>
                <Image source={{ uri: `${photoUrl}` }} style={styles.img2} />

                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      color: "#000000",
                      marginLeft: 10,
                      top: 6,
                      fontSize: 20,
                    }}
                  >
                    {artistName}
                  </Text>
                  <Text style={{ color: "#ceb89e", marginLeft: 10, top: 3 }}>
                    Artist
                  </Text>

                  {following == artistUid ? (
                    <View>
                      <TouchableOpacity
                        style={{
                          alignSelf: "flex-end",
                          marginVertical: -25,
                          marginHorizontal: 70,
                          bottom: 10,
                        }}
                        title="following"
                        onPress={() => onUnFollowing()}
                      >
                        <Text style={{ color: "#dc143c", fontSize: 16 }}>
                          Unfollow
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity
                        style={{
                          alignSelf: "flex-end",
                          marginVertical: -25,
                          marginHorizontal: 70,
                          bottom: 10,
                        }}
                        title="following"
                        onPress={() => onFollow()}
                      >
                        <Text style={{ color: "#deb887", fontSize: 16 }}>
                          Follow
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ width: "95%", top: 15 }}>
                <Text style={{ color: "#000000" }}>{description}</Text>
              </View>
            </View>
          </View>

          <View style={styles.BottomContainer}>
            <Text style={styles.moreText}>More Works</Text>
            {art && art.length > 0 ?
              <SafeAreaView style={{ flexDirection: "row" }}>
                <FlatList
                  scrollEnabled={false}
                  horizontal={true}
                  data={art}
                  keyExtractor={(item) => `${item.ImageUid}`}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.listItem2}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ArtPreview", {
                              artistUid: artistUid,
                              price: item.price,
                              description: item.description,
                              artUrl: item.artUrl,
                              artistPhoto: item.artistPhoto,
                              artistName: item.artistName,
                              imageUID: item.ImageUid,
                              artType: item.artType,
                              description: description,
                            })
                          }
                        >
                          <Image source={{ uri: item.artUrl }} style={styles.img} />
                          <View style={styles.priceView}>
                            <Text style={styles.price}>R {item.price}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
                {size > 0 ? (
                  <View
                    style={{ backfaceVisibility: "hidden", marginHorizontal: -35 }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ArtWorks", {
                          description: description,
                          artistUid: artistUid,
                          photoUrl: photoUrl,
                          artistName: artistName,
                        })
                      }
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        width: 120,
                        height: 150,
                        borderRadius: 15,
                        left: 10,
                        top: 20,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontSize: 18, color: "gray" }}> +{size}</Text>
                      {/* <Text style={{color:'blue', fontSize:20, fontWeight:'700'}}>See All</Text> */}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </SafeAreaView> : <View style={styles.noArtView}>
                <Text style={styles.noArtText}>No artworks are currently available from {artistName}</Text>
              </View>
            }

          </View>
        </View>
      </SafeAreaView>
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
    height: Dimensions.get('screen').height,
    width: "100%",
    // paddingTop: paddingOnTop,
    backgroundColor: "red",
  },
  topLevelView: {
    flex: 1,
    backgroundColor: 'red'
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
    paddingLeft: 15,
    paddingTop: 20,
    flexDirection: "column",
    marginBottom: 45,
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
    marginLeft: 15,
    width: "100%",
    height: 100,
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
