import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { AntDesign, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import CommentsModal from "../assets/components/CommentsModal";
import Toast from "react-native-toast-message";

export default function ArtPreviewScreen({ route, navigation }) {
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

  const { artistUid, imageUID } = route.params;

  const getArtistDetailts = async () => {
    return await firestore
      .collection("artists")
      .doc(artistUid)
      .onSnapshot((snapShot) => {
        const photo = snapShot.data().photoUrl;
        const name = snapShot.data().artistName;
        const descriptionOfArtist = snapShot.data().description;
        setArtistDescription(descriptionOfArtist);
        setArtistName(name);
        setArtistPhoto(photo);
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
      .then((documentSnap) => {})
      .catch((error) => alert(error));
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
      .then(() => {})
      .catch((error) => alert(error));
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
        Toast.show({
          type: "success",
          text2: "Your item has been added to cart",
        });
      })
      .catch((error) => alert(error));
  };

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
        console.log(error);
      });
  };

  const onFollowing = async () => {
    const uuid = auth.currentUser.uid;
    return await firestore
      .collection("following")
      .doc(artistUid)
      .collection("userFollowing")
      .doc(uuid)
      .set({
        uuid: uuid,
        artistUid: artistUid,
        photo: photoURL,
        artistPhoto: artistPhoto,
        fullName: FullName,
        artistName: artistName,
      })
      .then(() => {
        setFollowing(true);
        Toast.show({
          type: "success",
          text2: `You're now Following ${artistName}`,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onUnFollowing = () => {
    const uuid = auth.currentUser.uid;

    return firestore
      .collection("following")
      .doc(artistUid)
      .collection("userFollowing")
      .doc(uuid)
      .delete()
      .then(() => {
        Toast.show({
          type: "error",
          text2: `You're no longer following ${artistName}`,
        });
        setFollowing(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const followState = () => {
    const uid = auth.currentUser.uid;

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

  const disableObjects = async () => {
    return await setDisplayContent(!displayContent);
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
    getArtDetails();
    likesState();
    getArtistDetailts();
    followState();

    return () => {
      unregister();
    };
    return () => getNumberOfLikes();
    return () => likesState();
    return () => getArtDetails();
    return () => getComentsNumber();
    return () => getArtistDetailts();
    return () => followState();
  }, [imageUID, artistUid]);

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <TouchableOpacity
        activeOpacity={2}
        onPress={
          disableObjects
          // navigation.navigate("Preview", {
          //   artUrl: artUrl,
          //   artistUid: artistUid,
          //   photoUrl: artistPhoto,
          //   artistName: artistName,
          // })
        }
      >
        <View style={globalStyles.tikTokContainer}>
          <Image
            source={{ uri: `${artUrl}` }}
            resizeMode="cover"
            style={globalStyles.video}
          />
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
                {following == artistUid ? (
                  <View>
                    <TouchableOpacity
                      style={{ marginVertical: 10 }}
                      title="following"
                      onPress={onUnFollowing}
                    >
                      <Entypo name="remove-user" size={30} color={"#40e0d0"} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity
                      style={{ marginVertical: 10 }}
                      title="following"
                      onPress={onFollow}
                    >
                      <Entypo name="add-user" size={30} color={"#F5F5F5"} />
                    </TouchableOpacity>
                  </View>
                )}

                <TouchableOpacity
                  style={{ marginVertical: 10 }}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.5}
                >
                  <Fontisto name="comments" size={30} color={"#FFFFFF"} />
                </TouchableOpacity>

                <View style={{ marginVertical: 10 }}>
                  <View style={{ marginVertical: 10 }}>
                    {image == imageUID ? (
                      <TouchableOpacity onPress={() => onDislikePress()}>
                        <AntDesign name="heart" size={30} color="red" />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity onPress={() => onLikePress()}>
                        <AntDesign name="heart" size={30} color="white" />
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
                  <TouchableOpacity
                    style={{ marginVertical: 10 }}
                    onPress={() => addToCart()}
                  >
                    <MaterialIcons
                      name="add-shopping-cart"
                      size={32}
                      color={"#FFFFFF"}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={globalStyles.bottomContainer}>
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
                        source={{ uri: `${artistPhoto}` }}
                        style={globalStyles.artistImg}
                      />
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
                      <Image
                        source={{ uri: `${artistPhoto}` }}
                        style={globalStyles.artistImg}
                      />
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
    </View>
  );
}

const styles = StyleSheet.create({});
