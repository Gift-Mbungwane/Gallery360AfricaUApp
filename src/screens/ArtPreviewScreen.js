import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
// import { AntDesign, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import CommentsModal from "../assets/components/CommentsModal";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import LoaderImage from "../assets/components/LoaderImage";
import { Alert } from "react-native";
import TransparentHeaderView from "../components/TransparentHeaderView";
import { ActionButton, ArtDetails, ArtInfoCard, ArtistArtworksCard, ArtworkImageSlider, UserActivityCard, ViewAll } from "../components";
import { Cart } from "../components/icons";

// import Toast from "react-native-simple-toast";
// line 141 (image is a string) and 146 (catch block)
export default function ArtPreviewScreen({ route, navigation }) {
  console.log({ route, navigation });
  const [isModalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState("");
  const [image, setImage] = useState("");
  const [uid, setUId] = useState(null);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [artistDescription, setArtistDescription] = useState("");
  // const [artistName, setArtistName] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [artType, setArtType] = useState("");
  const [price, setPrice] = useState(0);
  const [displayContent, setDisplayContent] = useState(true);
  const [artName, setArtName] = useState("");
  const [artSize, setArtSize] = useState("");
  const [description, setDescription] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [itemOnCart, setItemOnCart] = useState(false)
  const [defaultImg] = useState('https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.comC/O%20https://placeholder.com/')
  const [artHeight, setArtHeight] = useState(400);
  const [artWidth, setArtWidth] = useState(400);

  // new design details
  const [artDetails, setArtDetails] = useState({ price: null, description: null, dimensions: null, artName: '', imgUrls: [] })
  const [artworks, setArtworks] = useState([])
  // console.log({ ...route.params });
  const { artistUid, imageUID, photoUrl, artistName } = route.params;

  // const [Data] = useState([{ photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }])
  useEffect(() => {
    console.log({ artistUid, imageUID, photoUrl });
    getArtDetails();
    getArt()
  }, [route])

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log({ user });
      if (!user) {
        console.log('No user found');
        return
      }
      setUId(user.uid)
    })
  }, [])
  useEffect(() => {
    console.log({ uid });
  }, [uid])

  const getArt = async () => {
    // console.log(`artist ID : ${artistUid}s`);
    console.log('running art getter');
    firestore
      .collection("newArtworks")
      .where("userid", "==", artistUid)
      .where("isEnabled", "==", true)
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let allArt = snapShot.docs.map((docSnap) => ({ isArt: true, ...docSnap.data() }));
          // console.log('all art: ', allArt);
          // if (allArt.length > 0) {
          //   setArt([...allArt, { isArt: false, ImageUid: null }]);
          // }
          setArtworks(allArt)
        }


      });
  };
  useEffect(() => {
    try {
      (async () => {
        await Image.getSize(artUrl, (width, height) => {
          // console.log({ width, height });
          const screenWidth = Dimensions.get('window').width;
          // const screenHeight = Dimensions.get('window').height;
          const scaleFactor = width / screenWidth;
          const imgHeight = height / scaleFactor;
          const imgWidth = width / scaleFactor;
          setArtHeight(imgHeight)
          setArtWidth(imgWidth)
        })
      })
    } catch (error) {
      setArtHeight(400);
      setArtWidth(Dimensions.get('window').width)
    }

  }, [artUrl])
  const getArtistDetailts = () => {
    firestore
      .collection("artists")
      .doc(artistUid)
      .onSnapshot((snapShot) => {
        if (snapShot.exists) {
          const photo = snapShot.data().photoUrl;
          const name = snapShot.data().artistName;
          const descriptionOfArtist = snapShot.data().description;
          setArtistDescription(descriptionOfArtist);
          setArtistName(name);
          setArtistPhoto(photo);
          console.log({ descriptionOfArtist, name, photo });
        } else {
          console.log('no data found for artist ID: ', artistUid);
        }

      });
  };

  const onLikePress = () => {
    // const uid = auth.currentUser.uid;
    firestore
      .collection("newArtworks")
      .doc(imageUID)
      .collection("likes")
      .doc(uid)
      .set({
        imageUid: imageUID,
        uid: uid,
        artistUid: artistUid,
      })
      .then((documentSnap) => { })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
    // props.sendNotification(user.notificationToken, "New Like", `${props.currentUser.name} liked your post`, { type: 0, postId, user: firebase.auth().currentUser.uid })
  };

  const onDislikePress = () => {
    // const uid = auth.currentUser.uid;
    if (!imageUID) return
    firestore
      .collection("newArtworks")
      .doc(imageUID)
      .collection("likes")
      .doc(uid)
      .delete({})
      .then(() => { })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const likesState = () => {
    try {
      // const uid = auth.currentUser.uid;
      if (!imageUID) return
      firestore
        .collection("newArtworks")
        .doc(imageUID)
        .collection("likes")
        .where("uid", "==", uid)   //change this to fetch one document, use uid to add likes
        .onSnapshot((snapShot) => {
          if (snapShot.exists) {
            const imag = snapShot.docs
              .map((document) => document.data().imageUid)
              .map((doc) => doc);

            console.log("snapuid: ", snapShot.docs.map((doc) => doc.data().imageUid));
            console.log("imag: ", imag);
            setImage(imag);

            //image is an array, needs to be a string
          }
        });
    } catch (error) {
      Alert.alert('error', error, [
        { text: 'Ok', onPress: () => console.log('okay pressed') }
      ])
    }

  };

  const getNumberOfLikes = () => {
    try {
      // add catch block to handle errors
      if (!imageUID) return
      firestore
        .collection("newArtworks")
        .doc(imageUID)
        .collection("likes")
        .where("artistUid", "==", artistUid)
        .onSnapshot((snapShot) => {
          if (!snapShot.empty) {
            const sizes = snapShot.size;
            setLike(sizes);
          }

        });
    } catch (error) {
      Alert.alert('error', error, [
        { text: 'Ok', onPress: () => console.log('okay pressed') }
      ])
    }

  };

  const getArtDetails = () => {
    if (!imageUID) return
    firestore
      .collection("newArtworks")
      .doc(imageUID)
      .onSnapshot((snapShot) => {
        if (snapShot.exists) {
          console.log({ data: snapShot.data() });
          setArtDetails({ ...snapShot.data(), images: snapShot.data().imgUrls.map(item => item.imgUrl)})
          return
          const artTypes = snapShot.data().artType;
          setArtType(artTypes);
          const prices = snapShot.data().price;
          setPrice(prices);
          const artUrls = snapShot.data().artUrl;
          setArtUrl(artUrls);
          const artSizes = snapShot.data().artSize;
          setArtSize(artSizes);
          const artNames = snapShot.data().artName;
          setArtName(artNames);
          const descriptions = snapShot.data().description;
          setDescription(descriptions);
        }
      });
  };
  useEffect(() => { 
    console.log({ artDetailsInPreview: artDetails });
  }, [artDetails])
  const addToCart = async () => {
    // console.log('adding to cart');
    // return
    // const uid = auth.currentUser.uid;
    if (!imageUID) return
    await firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .doc(imageUID)
      .set({
        artUrl: artUrl,
        artType: artType,
        price: price,
        uid: uid,
        artistUid: artistUid,
        imageUid: imageUID,
      })
      .then((snapShot) => {
        setItemOnCart(true)
        // Toast.show(
        //   "Your item has been added to cart",
        //   Toast.LONG,
        //   Toast.CENTER
        // );
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };
  const removeFromCart = async () => {
    // const uid = auth.currentUser.uid;
    try {
      if (!imageUID) return
      await firestore.collection('cartItem').doc(uid).collection('items').doc(imageUID).delete().then((res) => {
        // console.log(res);
        setItemOnCart(false)
      })
    } catch (error) {
      console.log();
    }

  }

  const onFollow = async () => {
    return await firestore
      .collection("following")
      .doc(artistUid)
      .set({
        artistUid: artistUid,
      })
      .then(() => {
        onFollowing();
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const onFollowing = async () => {
    // const uuid = auth.currentUser.uid;
    const update = {
      uid: uid,
      artistUid: artistUid,
      photo: photoURL,
      artistPhoto: artistPhoto,
      fullName: FullName,
      artistName: artistName,
    }
    try {
      const res = await firestore.collection('following').doc(artistUid).collection('userFollowing').doc(uid).set(update)
      // console.log('res: ');
      if (res) setFollowing(true)

      // console.log(status);
    } catch (error) {
      console.log(error);
    }
  };

  const onUnFollowing = async () => {
    // setFollowing(false);
    // return
    // const uuid = auth.currentUser.uid;

    return firestore
      .collection("following")
      .doc(artistUid)
      .collection("userFollowing")
      .doc(uid)
      .delete()
      .then(() => {
        try {
          Toast.show({
            type: "error",
            text2: `You're no longer following ${artistName}`,
          });
        } catch (error) {

        }

        setFollowing(false);
        // console.log('user no longer follows artist');
      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };
  const unFollowArtist = async () => {
    try {
      const res = await firestore.collection('following').doc(artistUid).collection('userFollowing').delete()
    } catch (error) {
      console.log(error);
    }

  }
  const followState = () => {
    try {
      firestore
        .collection("following")
        .doc(artistUid)
        .get().then(snapShot1 => {
          if (snapShot1.exists) {
            snapShot1.ref
              .collection("userFollowing")
              .where("uid", "==", uid)
              .get().then(snapShot => {
                snapShot.docs.map((document) => {
                  if (document.exists) {
                    // console.log('user has a following');
                    setFollowing(true)
                  } else {
                    // console.log('user has no following');
                  }
                })
              })
          }
        })
    } catch (error) {
      Alert.alert('error', error, [
        { text: 'Ok', onPress: () => console.log('okay pressed') }
      ])
    }
    // const uid = auth.currentUser.uid;
  };

  const disableObjects = async () => {
    setTimeout(() => {
      setDisplayContent(!displayContent);
    }, 250);
  };
  const updateState = async (item, imageUID) => {
    console.log({ item, imageUID });
    navigation.navigate('ArtPreview', { artistUid, imageUID: item.ImageUid, photoUrl, artistName })
  }

  useEffect(() => {
    console.log({ route });
  }, [route])

  // useEffect(() => {
  //   // const uid = auth.currentUser.uid;
  //   let isMounted = true;
  //   try {
  //     if (isMounted) {
  //       if(!imageUID) return
  //       firestore
  //         .collection("users")
  //         .doc(uid)
  //         .onSnapshot((snapShot) => {
  //           if (snapShot.exists) {
  //             const users = snapShot.data().photoURL;
  //             const uName = snapShot.data().fullName;
  //             console.log({ users, uName });
  //             setPhotoURL(users);
  //             setFullName(uName);
  //           }
  //         });

  //       getNumberOfLikes();

  //       likesState();
  //       followState();
  //     }
  //   } catch (error) {
  //     Alert.alert('error', error, [
  //       { text: 'Ok', onPress: () => console.log('okay pressed') }
  //     ])
  //   }

  //   return () => isMounted = false;
  // }, [imageUID, artistUid]);
  // useEffect(() => {
  //   let isMounted = true;
  //   if (isMounted) {
  //     // const uid = auth.currentUser.uid
  //     if(!imageUID) return
  //     firestore.collection('cartItem').doc(uid).collection('items').doc(imageUID).get().then((res) => {
  //       // console.log(res.data());4
  //       console.log(imageUID);
  //       if (res.exists) {
  //         // console.log(res.data());
  //         setItemOnCart(true)
  //       }
  //     }).catch(err => console.log(err))

  //     getArtistDetailts();
  //     getArtDetails();
  //   }
  //   return () => isMounted = false;
  // }, [])

  const RenderScrollView = ({ photoURL, FullName, imageUID, style }) => {
    // console.log(imageUID);
    return (
      <TouchableOpacity
        activeOpacity={1.5}
        onPress={
          disableObjects
          // navigation.navigate("Preview", {
          //   artUrl: artUrl,
          //   artistUid: artistUid,
          //   photoUrl: artistPhoto,
          //   artistName: artistName,
          // })
        }
        style={styles.container}
      >
        <View style={[globalStyles.tikTokContainer]}>
          {
            artUrl !== '' && (
              <>
                <Image
                  source={{ uri: `${artUrl}` }}
                  resizeMode="cover"
                  style={{ position: 'absolute', top: 0, height: 1000, width: 1000, zIndex: -1 }}
                  blurRadius={150}
                />
                <Image
                  source={{ uri: `${artUrl}` }}
                  resizeMode="cover"
                  style={{ position: 'absolute', top: (Dimensions.get('window').height - artHeight) / 2, height: artHeight, width: artWidth, zIndex: 0 }}
                />
              </>

            )
          }
          {displayContent ? (
            <View style={globalStyles.uiContainer}>
              {isModalVisible && (
                <CommentsModal
                  photoURL={photoURL}
                  fullName={FullName}
                  ImageUid={imageUID}
                  isVisible={isModalVisible}
                  onClose={() => setModalVisible(false)}
                />
              )}
              <View style={globalStyles.rightContainer}>
                <TouchableOpacity
                  style={{ marginVertical: 0 }}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.5}
                >
                  <FontAwesome name="commenting" size={30} color={"#FFFFFF"} />
                </TouchableOpacity>

                <View style={{ marginVertical: 0 }}>
                  <View style={{ marginVertical: 0 }}>
                    {image == imageUID ? (
                      <TouchableOpacity onPress={() => onDislikePress()}>
                        <FontAwesome name="heart" size={30} color="red" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => onLikePress()}>
                        <FontAwesome name="heart" size={30} color="white" />
                      </TouchableOpacity>
                    )}
                    {like > 0 ? (
                      <View>
                        <Text style={{ color: "#FFFFFF" }}>{like}</Text>
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                </View>
                <View>
                  {itemOnCart ? (
                    <TouchableOpacity
                      style={{ marginVertical: 0 }}
                      onPress={() => removeFromCart()}
                    >
                      <FontAwesome
                        name="cart-plus"
                        size={30}
                        color={"red"}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{ marginVertical: 0 }}
                      onPress={() => addToCart()}
                    >
                      <FontAwesome
                        name="cart-plus"
                        size={30}
                        color={"#FFFFFF"}
                      />
                    </TouchableOpacity>
                  )}

                </View>
              </View>

              <View style={[globalStyles.bottomContainer]}>
                <View
                  blur="51"
                  transparant={true}
                  style={globalStyles.secondBottomContainer}
                >
                  <View style={globalStyles.viewArtist}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ArtistProfile", {
                          description: artistDescription,
                          artistUid: artistUid,
                          photoUrl: artistPhoto,
                          artistName: artistName,
                          artType: artType,
                        })
                      }
                    >
                      <Image
                        source={{ uri: artistPhoto !== '' ? `${artistPhoto}` : defaultImg }}
                        style={globalStyles.artistImg}
                      />
                    </TouchableOpacity>

                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 0,
                        width: "80%",
                        // borderColor: 'red',
                        // borderWidth: 1,
                        // height: 500,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                      }}
                    >


                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                          // borderColor: 'yellow',
                          flex: 8,
                          // borderWidth: 1
                        }}
                      >
                        <Text style={globalStyles.artistName}>{artistName}</Text>
                        <Text
                          style={{
                            color: "#F5F5F5",
                          }}
                        >
                          {artType}
                        </Text>


                      </View>
                      <Text
                        style={{
                          color: "#F5F5F5",
                          paddingTop: 0,
                          fontWeight: "bold",
                          minWidth: 50,
                          // alignSelf: 'flex-end',
                          textAlign: 'right',
                          // borderColor: 'red',
                          // borderWidth: 1,
                          flex: 2
                        }}
                      >
                        {`R${price}.00`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          paddingTop: 3,
                          color: "#F5F5F5",
                          display: 'none'
                        }}
                      >
                        {artSize ? (
                          <Text>{`(${artSize})cm`}</Text>
                        ) : (
                          <View></View>
                        )}
                      </Text>
                    </View>
                  </View>

                  <View style={globalStyles.viewDescription}>
                    <Text style={{ color: "#F5F5F5" }}>{description}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View style={{ flex: 4 }}></View>
              <View style={globalStyles.bottomContainer1}>
                <View
                  blur="51"
                  transparant={true}
                  style={globalStyles.previewSecondBottomContainer}
                >
                  <View style={globalStyles.viewArtist}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ArtistProfile", {
                          description: artistDescription,
                          artistUid: artistUid,
                          photoUrl: artistPhoto,
                          artistName: artistName,
                          artType: artType,
                        })
                      }
                    >
                      {artistPhoto !== '' && <Image
                        source={{ uri: `${artistPhoto}` }}
                        style={globalStyles.artistImg}
                      />}
                    </TouchableOpacity>
                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 20,
                        width: "80%",
                      }}
                    >
                      <Text style={globalStyles.artistName}>{artistName !== '' ? artistName : 'Artist'}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    )

  }
  return (
    <TransparentHeaderView padding={0}>
      <ScrollView >
        <ArtworkImageSlider imagesArr={artDetails.images} />
        <View style={{ paddingHorizontal: 15, gap: 10 }}>
          <ArtDetails price={artDetails.price} description={artDetails.description} artName={artDetails.artName} />
          <ArtInfoCard condition={artDetails.condition} available={artDetails.isAvailable} dimensions={artDetails.dimensions} />
          <ActionButton icon={<Cart size={24} />} text={'Add to Cart'} disabled={false} onPress={() => {addToCart()}} style={{ marginBottom: 20 }} />
          <UserActivityCard artistName={artistName} following={true} likes={30} messages={30} artistPhoto={photoUrl} viewArtist={() => navigation.navigate('ArtistProfile', {artistUid, photoUrl, artistName})}/>
          <View style={{ padding: 0 }}>
            <View style={styles.moreArtHeader}>
              <Text style={styles.text}>
                More from {artistName}
              </Text>
              <ViewAll onPress={() => console.log('View More from preview screen selected')} />
            </View>
            {
              artworks && artworks.length > 0 ? (
                <View
                  style={{ width: Dimensions.get('window').width, left: -15, paddingHorizontal: 20, backgroundColor: 'blue', overflow: 'visible' }}
                >
                  <FlatList
                    horizontal
                    style={{ width: '100%', paddingHorizontal: 0, paddingVertical: 10, backgroundColor: 'red', gap: 8, overflow: 'visible' }}
                    // numColumns={2}
                    scrollEnabled
                    columnWrapperStyle={styles.columnWrapper}
                    ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    data={artworks}
                    renderItem={({ item }) => (
                      <ArtistArtworksCard
                        imageUID={item.ImageUid}
                        onPress={(imageUID) => updateState(item, imageUID)}
                        showPrice={true}
                        artistName={artistName}
                        artName={item.artName}
                        artUri={item.artUrl}
                        artistPic={photoUrl}
                        price={item.price}
                      />
                    )}
                    keyExtractor={item => item.ImageUid}
                  />
                </View>

              ) : (
                <View>
                  <Text>No more artwork</Text>
                </View>
              )
            }
          </View>
        </View>

      </ScrollView>
    </TransparentHeaderView>
  )

}


const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 : 0
// const navBarHeight
const styles = StyleSheet.create({
  container: {
    width: "100%", height: Dimensions.get('window').height, overflow: 'hidden',
    // paddingTop: statusBarHeight,
    // top: statusBarHeight
    flex: 1,
    alignSelf: 'center',
    // backgroundColor: 'red'
  },
  tikTokView: {
    height: Dimensions.get('window').height
  },
  moreArtHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // paddingHori,
    backgroundColor: 'blue'
  }

});
