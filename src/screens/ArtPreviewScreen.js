import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
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

// import Toast from "react-native-simple-toast";

export default function ArtPreviewScreen({ route, navigation }) {
  console.log({ route, navigation });
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
  const [itemOnCart, setItemOnCart] = useState(false)
  const [defaultImg] = useState('https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.comC/O%20https://placeholder.com/')
  const [artHeight, setArtHeight] = useState(2);
  const [artWidth, setArtWidth] = useState(2);
  // console.log({ ...route.params });
  const { artistUid, imageUID } = route.params;

  const [Data] = useState([{ photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }, { photoURL, FullName, imageUID, title: 'why' }])
  useEffect(async() => {
    // try {
    //   await Image.getSize(artUrl, (width, height) => {
    //     // console.log({ width, height });
    //     const screenWidth = Dimensions.get('window').width;
    //     // const screenHeight = Dimensions.get('window').height;
    //     const scaleFactor = width / screenWidth;
    //     const imgHeight = height / scaleFactor;
    //     const imgWidth = width / scaleFactor;
    //     setArtHeight(imgHeight)
    //     setArtWidth(imgWidth)
    //   })
    // } catch (error) {
      setArtHeight(400);
      setArtWidth(Dimensions.get('window').width)
    // }

  }, [artUrl])
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

  return (
    <View>
      <Text>artistName: {artistName}</Text>
      <Text>artistPhoto: {artistPhoto}</Text>\
      <Text>artistDescription: {artistDescription}</Text>
      <Text>artistUid: {artistUid}</Text>
      <Text>artType: {artType}</Text>
    </View>
  )

}
const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 : 0
// const navBarHeight
// const styles = StyleSheet.create({
//   container: {
//     width: "100%", height: Dimensions.get('window').height, overflow: 'hidden',
//     // paddingTop: statusBarHeight,
//     // top: statusBarHeight
//     flex: 1,
//     alignSelf: 'center',
//     // backgroundColor: 'red'
//   },
//   tikTokView: {
//     height: Dimensions.get('window').height
//   }
// });
