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
import React, { useState, useEffect, useCallback } from "react";
import { firestore, auth } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
import CommentsModal from "../assets/components/CommentsModal";
import { AntDesign, Entypo, FontAwesome, FontAwesome5, Fontisto } from "@expo/vector-icons";
import Render from "react-native-web/dist/cjs/exports/render";

// import Toast from "react-native-simple-toast";

export default function ScrollScreen({ route, navigation }) {
  // console.log({ route, navigation });
  const [isModalVisible, setModalVisible] = useState(false);
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [following, setFollowing] = useState("");
  const [image, setImage] = useState("");
  const [uuid, setUId] = useState(auth.currentUser.uid);
  const [currentUserLike, setCurrentUserLike] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [artistDescription, setArtistDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [artistPhoto, setArtistPhoto] = useState("");
  const [artType, setArtType] = useState("");
  const [price, setPrice] = useState(0);
  const [displayContent, setDisplayContent] = useState(true);
  const [artName, setArtName] = useState("");
  const [artSize, setArtSize] = useState("");
  const [description, setDescription] = useState("");
  const [artUrl, setArtUrl] = useState("");
  const [itemOnCart, setItemOnCart] = useState(false);
  const [artworks, setArtworks] = useState([{ photoURL, FullName: 'Artwork', imageUID, title: 'why' },{ photoURL, FullName: 'Second', imageUID, title: 'why' },{ photoURL, FullName: 'Third', imageUID, title: 'why' },{ photoURL, FullName: 'Fourth', imageUID, title: 'why' }])

  // console.log({ ...route.params });
  const { artistUid, imageUID } = route.params;
  // console.log('height: ', StatusBar.currentHeight);
  const [Data] = useState([{ photoURL, FullName, imageUID, title: 'why' },{ photoURL, FullName, imageUID, title: 'why' },{ photoURL, FullName, imageUID, title: 'why' }])

  const getArtistDetailts = async () => {
    return firestore
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
        } else {
          // console.log('no data found');
        }

      });
  };

  const onLikePress = () => {
    const uid = auth.currentUser.uid;
    return firestore
      .collection("Market")
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
    const uid = auth.currentUser.uid;
    return firestore
      .collection("Market")
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
    const uid = auth.currentUser.uid;
    return firestore
      .collection("Market")
      .doc(imageUID)
      .collection("likes")
      .where("uid", "==", uuid)
      .onSnapshot((snapShot) => {
        const imag = snapShot.docs
          .map((document) => document.data().imageUid)
          .map((doc) => doc);
        setImage(imag);
      });
  };

  const getNumberOfLikes = async () => {
    return await firestore
      .collection("MarKet")
      .doc(imageUID)
      .collection("likes")
      .where("artistUid", "==", artistUid)
      .onSnapshot((snapShot) => {
        const sizes = snapShot.size;
        setLike(sizes);
      });
  };

  const getArtDetails = () => {
    return firestore
      .collection("Market")
      .doc(imageUID)
      .onSnapshot((snapShot) => {
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
      });
  };

  const addToCart = async () => {
    // console.log('adding to cart');
    // return
    const uid = auth.currentUser.uid;
    return await firestore
      .collection("cartItem")
      .doc(uid)
      .collection("items")
      .doc(imageUID)
      .set({
        artUrl: artUrl,
        artType: artType,
        price: price,
        uuid: uuid,
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
    const uid = auth.currentUser.uid;
    await firestore.collection('cartItem').doc(uid).collection('items').doc(imageUID).delete().then((res) => {
      // console.log(res);
      setItemOnCart(false)
    })
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
    const uuid = auth.currentUser.uid;
    const update = {
      uuid: uuid,
      artistUid: artistUid,
      photo: photoURL,
      artistPhoto: artistPhoto,
      fullName: FullName,
      artistName: artistName,
    }
    try {
      await firestore.collection('following').doc(artistUid).collection('userFollowing').doc(uuid).set(update).then(res => {
        // console.log('res: ');
        setFollowing(true)
      })
      // console.log(status);
    } catch (error) {
      // console.log(error);
    }
  };

  const onUnFollowing = async () => {
    // setFollowing(false);
    // return
    const uuid = auth.currentUser.uid;

    return firestore
      .collection("following")
      .doc(artistUid)
      .collection("userFollowing")
      .doc(uuid)
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
    const res = await firestore.collection('following').doc(artistUid).collection('userFollowing').delete()
  }
  const followState = () => {
    const uid = auth.currentUser.uid;

    firestore
      .collection("following")
      .doc(artistUid)
      .get(snapShot1 => {
        if (snapShot1.exists) {
          snapShot1.ref
            .collection("userFollowing")
            .where("uuid", "==", uid)
            .get(snapShot => {
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
  };

  const disableObjects = async () => {
    setTimeout(() => {
      setDisplayContent(!displayContent);
    }, 250);
  };

  useEffect(() => {
    const uid = auth.currentUser.uid;
    const unregister = firestore
      .collection("users")
      .doc(uid)
      .onSnapshot((snapShot) => {
        const users = snapShot.data().photoURL;
        const uName = snapShot.data().fullName;
        setPhotoURL(users);
        setFullName(uName);
      });

    getNumberOfLikes();

    likesState();
    // getArtistDetailts();
    followState();

    return () => {
      unregister();
    };
    return () => getNumberOfLikes();
    return () => likesState();
    // return () => getArtDetails();
    return () => getComentsNumber();
    // return () => getArtistDetailts();
    return () => followState();
  }, [imageUID, artistUid]);
  useEffect(() => {
    const uid = auth.currentUser.uid
    firestore.collection('cartItem').doc(uid).collection('items').doc(imageUID).get().then((res) => {
      // console.log(res.data());
      if (res.exists) {
        // console.log(res.data());
        setItemOnCart(true)
      }
    })

    getArtistDetailts();
    getArtDetails();
  }, [])
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
        <View style={globalStyles.tikTokContainer}>
          {artUrl !== '' && <Image
            source={{ uri: `${artUrl}` }}
            resizeMode="cover"
            style={globalStyles.video}
          />}
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
                {following === true ? (
                  <View>
                    <TouchableOpacity
                      style={{ marginVertical: 0 }}
                      title="following"
                      onPress={onUnFollowing}
                    >
                      <FontAwesome name="user-times" size={30} color={"#40e0d0"} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      style={{ marginVertical: 0 }}
                      title="following"
                      onPress={onFollow}
                    >
                      <FontAwesome name="user-plus" size={30} color={"#F5F5F5"} />
                    </TouchableOpacity>
                  </View>
                )}

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
                      {artistPhoto !== '' && <Image
                        source={{ uri: `${artistPhoto}` }}
                        style={globalStyles.artistImg}
                      />}
                    </TouchableOpacity>

                    <View
                      style={{
                        marginHorizontal: 10,
                        marginVertical: 7,
                        width: "80%",
                      }}
                    >
                      <Text style={globalStyles.artistName}>{artistName}</Text>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            color: "#F5F5F5",
                          }}
                        >
                          {artType}
                        </Text>

                        <Text
                          style={{
                            color: "#F5F5F5",
                            paddingTop: 0,
                            fontWeight: "bold",
                          }}
                        >
                          {`R${price}.00`}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 11,
                          paddingTop: 3,
                          color: "#F5F5F5",
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
                      <Text style={globalStyles.artistName}>{artistName}</Text>
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
  const handleVieweableItemsChanged = useCallback(({ changed }) => {
    
    // console.log(changed);
    if(changed[0].isViewable) {
      const name = changed[0].item.FullName
      navigation.setParams({ artName: name });
    }

    return;
    setViewedItems(oldViewedItems => {
      // We can have access to the current state without adding it
      //  to the useCallback dependencies

      let newViewedItems = null;

      changed.forEach(({ index, isViewable }) => {
        if (index != null && isViewable && !oldViewedItems.includes(index)) {
          
           if (newViewedItems == null) {
             newViewedItems = [...oldViewedItems];
           }
           newViewedItems.push(index);
        }
      });

      // If the items didn't change, we return the old items so
      //  an unnecessary re-render is avoided.
      return newViewedItems == null ? oldViewedItems : newViewedItems;
    });

    // Since it has no dependencies, this function is created only once
  }, []);
  // return(
  //   <RenderScrollView photoURL={photoURL} FullName={FullName} imageUID={imageUID} style={{ borderColor: 'red', borderWidth: 1}} />
  // )

  return (
    <View style={ styles.topCont }>
      <FlatList
        style={{ borderColor: 'green', borderWidth: 1, flex: 1 }}
        data={ artworks }
        renderItem={(item) => <RenderScrollView photoURL={item.photoURL} FullName={ item.photoURL } imageUID={ item.imageUID } />}
        keyExtractor={(item,index) => index}
        snapToAlignment='start'
        horizontal={false}
        decelerationRate={0.2}
        snapToInterval={Dimensions.get('window').height}
        overScrollMode="always"
        scroll
        disableIntervalMomentum
        onViewableItemsChanged={handleVieweableItemsChanged}
        
      />
        {/* { artworks.map( (item) => <RenderScrollView onLayout={() => { console.log('loading')}} photoURL={item.photoURL} FullName={ item.photoURL } imageUID={ item.imageUID }/> ) } */}
      
      {/* </ScrollView>  */}
    {/* //   {/* <FlatList
    //     data={Data}
    //     renderItem={({ item }) => (
    //       <View
    //         style={{
    //           height: Dimensions.get('window').height,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           backgroundColor: 'red'
    //         }}>
    //         <Text style={{ fontWeight: 'bold', color: 'white' }}>{item.title}</Text>
    //       </View>
    //     )}
    //     keyExtractor={(_, index) => index.toString()}

    //     getItemLayout={(_, index) => {
    //       return { length: Dimensions.get('window').height, offset: Dimensions.get('window').height * index, index };
    //     }}
    //     initialScrollIndex={21}
    //     showsVerticalScrollIndicator={false}
    //     initialNumToRender={3}
    //     windowSize={9}
    //     snapToAlignment={'start'}
    //     snapToInterval={Dimensions.get('window').height}
    //     decelerationRate={'fast'}
    //     snapToOffsets={Data.map((x, i) => (i * Dimensions.get('window').height))}
    //   /> */} 
    </View>
  );
}
const statusBarHeight = StatusBar.currentHeight;
// console.log('height:', statusBarHeight);
// const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? statusBarHeight : 0
// const navBarHeight
const styles = StyleSheet.create({
  topCont: {borderColor: 'yellow', borderWidth: 1, flex: 1, paddingTop: StatusBar.currentHeight },
  container: {
    width: "100%", height: Dimensions.get('window').height, top: 0, overflow:'hidden',
    // paddingTop: statusBarHeight + 60,
    // top: statusBarHeight,
    // paddingTop: statusBarHeight,
    // paddingBottom: 100,
    // marginBottom: 50,
    borderColor: 'yellow', borderWidth: 1
  },
  tikTokView: {
    height: Dimensions.get('window').height
  }
});
