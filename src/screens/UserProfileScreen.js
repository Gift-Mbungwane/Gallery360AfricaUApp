import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ImageBackground,
  Modal,
  TextInput,
  FlatList,
  // SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StatusBar
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firestore, auth, storageRef } from "../../Firebase";
import {
  MaterialCommunityIcons,
  Entypo,
  MaterialIcons,
  Ionicons,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";
import { globalStyles } from "../assets/styles/GlobalStyles";
// import * as NavigationBar from 'expo-navigation-bar';


import { UserContext } from "../Context/UserContext";
import LoaderImage from "../assets/components/LoaderImage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';
// import Toast from "react-native-simple-toast";

const background = require("../assets/images/home.png");

export default function UserProfileScreen({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState("");
  const [userName, setUserName] = useState('');
  const [imageUri, setimageUri] = useState(`${route.params ? route.params.photoURL : 'https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-17.jpg'}`);
  const [submit, setSubmit] = useState(false);
  const [photoUri, setPhotoUri] = useState('')
  const [placeholder] = useState('https://icon-library.com/images/no-profile-picture-icon-female/no-profile-picture-icon-female-17.jpg')
  let { photoURL, fullName, uuid, cartItem } = route.params;
  const { isLoggedIn, toggleUserState } = useContext(UserContext)
  const screenHeight = Dimensions.get('screen').height;
  const viewHeight = Dimensions.get('window').height;
  const viewWidth = Dimensions.get('window').width;
  const pageHeight = Dimensions.get('window').height
  const headerHeight = useHeaderHeight()




  // console.log({ viewHeight, screenHeight });

  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);

    if (!result.cancelled) {
      setSubmit(!submit);
      //setimageUri(result.uri);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed!"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result.uri, true);
        xhr.send(null);
      });

      const ref = storageRef.child(new Date().toISOString());
      const snapshot = (await ref.put(blob)).ref
        .getDownloadURL()
        .then((imageUrl) => {
          setimageUri(imageUrl);
          // console.log(
          //   imageUrl,
          //   "this is setting the image too storage before 3"
          // );

          blob.close();
          setSubmit(false);
        });

      // snapshot.snapshot.ref.getDownloadURL().then((imageUrl) => {
      //   console.log(imageUrl, "this is setting the image too storage before 2");
      //   setPhoto(imageUrl);
      // });
    } else {
      // console.log(result.uri);
      if (result.uri) setimageUri(result.uri)
    }
  };

  const updateUser = () => {
    // console.log('uuid: ', uuid);
    firestore
      .collection("users")
      .doc(uuid)
      .update({
        fullName: userName,
        photoURL: imageUri,
      })
      .then(() => {
        // Toast.show(
        //   "you have successfully update your profile",
        //   Toast.LONG,
        //   Toast.CENTER
        // );
        setUserName(userName);
        // fullName = userName;
        setPhotoUri(imageUri)
        setModalOpen(false);

      })
      .catch((error) => {
        // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };
  useEffect(() => {
    // StatusBar.setHidden(true)
    let isMounted = true;
    if (isMounted) {
      firestore.collection('users').doc(uuid).get().then(res => {
        // console.log(res.data())
        if (res.data()) {
          setUserName(res.data().fullName);
          setPhotoUri(res.data().photoURL);
        }
      })
    }
    return () => isMounted = false
  }, [])
  useEffect(() => {
    console.log(imageUri);
  }, [imageUri])
  return (
    <ImageBackground source={background} resizeMode="cover" style={globalStyles.backgroundImg}>
      <SafeAreaView style={styles.areaView}>
        <View style={[{ marginTop: headerHeight, height: Dimensions.get('window').height - headerHeight }]}>
          <Modal visible={modalOpen} transparent>
            <View style={globalStyles.modalFullView}>
              <View style={globalStyles.modalContainer}>
                <View style={globalStyles.closeBtnContaainer}>
                  <EvilIcons
                    onPress={() => setModalOpen(false)}
                    name="close"
                    size={21}
                    color="white"
                  />
                </View>
                <View style={globalStyles.editprofileImgContainer}>

                  {submit ? (
                    <LoaderImage
                      uri={imageUri ? imageUri : photoUri}
                      style={globalStyles.uploadedImage}
                    />
                  ) : (
                    <Image
                      source={{ uri: photoUri }}
                      placeholderStyle={{ backgroundColor: 'rgb(200, 200, 200)' }}
                      PlaceholderContent={<ActivityIndicator size="large" color={"#000"} />}
                      containerStyle={globalStyles.uploadedImage}
                      style={globalStyles.uploadedImage}
                    />
                    // <LoaderImage
                    //   uri={photoUri}
                    //   style={globalStyles.uploadedImage}
                    // />
                  )}

                  <AntDesign
                    onPress={() => openImageLibrary()}
                    style={globalStyles.imgAddIcon}
                    name="pluscircle"
                    size={35}
                    color="#E3E3E3"
                  />

                </View>
                <TextInput
                  placeholder="Edit Username"
                  onChangeText={(fullName) => setUserName(fullName)}
                  style={globalStyles.editUserInput}
                  value={userName}
                />
                <TouchableOpacity
                  style={globalStyles.updateBtn}
                  onPress={updateUser}
                >
                  <Text style={globalStyles.modalText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Modal>


          <View style={styles.profileContainer}>
            <View style={globalStyles.profileImgContainer}>
              <View style={{ position: 'absolute', height: '90%', aspectRatio: 1, top: '-45%' }}>
                {photoUri ? (
                  <LoaderImage
                    uri={photoUri}
                    style={globalStyles.profileImg}
                  />
                ) : (
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTet-jk67T6SYdHW04eIMLygHzEeJKobi9zdg&usqp=CAU",
                    }}
                    style={globalStyles.profileImg}
                  />
                )}
              </View>

              <Text style={globalStyles.userNameText}>{userName}</Text>
              <TouchableOpacity
                onPress={() => setModalOpen(true)}
                style={styles.editBtn}
              >
                <Text style={globalStyles.btnText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={globalStyles.optionsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })
              }
              style={styles.options}
            >
              <MaterialCommunityIcons
                name="cart"
                size={24}
                color={"#0E1822"}
                style={{
                  marginHorizontal: 10,
                  overflow: "hidden",
                  color: "#0E1822",
                  position: 'absolute',
                  left: 10
                }}
              />
              <Text style={styles.optionsText}>
                My Cart
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("TermsAndConditions")}
              style={styles.options}
            >
              <Text style={styles.optionsText}>
                Terms and Conditions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications", { uuid })}
              style={styles.options}
            >
              <Text style={styles.optionsText}>
                Notifications
              </Text>
            </TouchableOpacity>

            <View style={styles.options}>
              <Text style={styles.optionsText}>
                App Version
              </Text>
              <Text style={{ color: "gray", fontSize: 12 }}>v1.0.0</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const screenHeight = Dimensions.get('screen').height;
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const pageHeight = Dimensions.get('window').height;
const statusBarHeight = StatusBar.currentHeight;
const styles = StyleSheet.create({
  areaView: {
    // height: viewHeight,
    // marginTop: 60,
    // paddingTop: 60,
    flex: 1,
    borderColor: 'blue',
    // borderWidth: 3
  },
  topLevelView: {
    // maxHeight: viewHeight,
    flex: 1,
    // marginTop: 0,
    borderColor: 'green',
    borderWidth: 10
  },
  profileContainer: {
    flex: 7,
    justifyContent: 'flex-end',
    // borderColor: 'blue',
    // borderWidth: 1,
    // backgroundColor: 'red'
    // height
  },
  editBtn: {
    width: 120,
    height: 50,
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
    // bottom: 70,e
    // top: 20
  },
  options: {
    alignSelf: "center",
    backgroundColor: "#E3E3E3",
    width: "80%",
    height: '20%',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    // marginVertical: 10,
    // borderColor: 'red',
    // borderWidth: 1
  },
  optionsText: {
    color: "#0E1822", fontSize: 16, fontWeight: "600"
  }
})