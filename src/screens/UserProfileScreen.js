import React, { useEffect, useState } from "react";
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
  SafeAreaView,
  ActivityIndicator,
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
import Toast from "react-native-simple-toast";

const background = require("../assets/images/home.png");

export default function UserProfileScreen({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUri, setimageUri] = useState(`${route.params.photoURL}`);
  const [submit, setSubmit] = useState(false);

  const { photoURL, fullName, uuid, cartItem } = route.params;

  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          navigation.replace("SignIn");
        })
        .catch((error) => alert(error));
    } catch (e) {
      console.log(e);
    }
  };

  const openImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

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
          console.log(
            imageUrl,
            "this is setting the image too storage before 3"
          );

          blob.close();
          setSubmit(false);
        });

      // snapshot.snapshot.ref.getDownloadURL().then((imageUrl) => {
      //   console.log(imageUrl, "this is setting the image too storage before 2");
      //   setPhoto(imageUrl);
      // });
    } else {
      setimageUri(result.uri);
    }
  };

  const updateUser = () => {
    firestore
      .collection("users")
      .doc(uuid)
      .update({
        fullName: userName,
        photoURL: imageUri,
      })
      .then(() => {
        Toast.show(
          "you have successfully update your profile",
          Toast.LONG,
          Toast.CENTER
        );
        setModalOpen(false);
      })
      .catch((error) => {
        Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  return (
    <View>
      <ImageBackground source={background} style={globalStyles.backgroundImg}>
        <View style={{ top: 120 }}>
          <Modal visible={modalOpen}>
            <View style={globalStyles.modalContainer}>
              <View style={globalStyles.closeBtnContaainer}>
                <EvilIcons
                  onPress={() => setModalOpen(false)}
                  name="close"
                  size={35}
                  color="white"
                />
              </View>
              <View style={globalStyles.editprofileImgContainer}>
                <Image
                  source={{ uri: imageUri }}
                  style={globalStyles.uploadedImage}
                />
                {!submit ? (
                  <AntDesign
                    onPress={() => openImageLibrary()}
                    style={globalStyles.imgAddIcon}
                    name="pluscircle"
                    size={35}
                    color="#E3E3E3"
                  />
                ) : (
                  <ActivityIndicator
                    style={{ alignSelf: "center", position: "absolute" }}
                    color="black"
                    size="small"
                  />
                )}
              </View>
              <TextInput
                placeholder="Edit Username"
                onChangeText={(fullName) => setUserName(fullName)}
                style={globalStyles.editUserInput}
              />
              <TouchableOpacity
                style={globalStyles.updateBtn}
                onPress={updateUser}
              >
                <Text style={globalStyles.modalText}>Update</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <View style={globalStyles.profileImgContainer}>
            {photoURL ? (
              <Image
                source={{ uri: `${photoURL}` }}
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
            <Text style={globalStyles.userNameText}>{fullName}</Text>
            <TouchableOpacity
              onPress={() => setModalOpen(true)}
              style={globalStyles.editBtn}
            >
              <Text style={globalStyles.btnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={globalStyles.optionsContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Cart", { uuid: uuid, cartItem: cartItem })
              }
              style={{
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 60,
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                borderRadius: 20,
                marginVertical: 15,
              }}
            >
              <MaterialCommunityIcons
                name="cart"
                size={24}
                color={"#0E1822"}
                style={{
                  marginHorizontal: 10,
                  overflow: "hidden",
                  color: "#0E1822",
                }}
              />
              <Text
                style={{
                  marginHorizontal: 65,
                  color: "#0E1822",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                My Cart
              </Text>
              {/* <Entypo name="chevron-small-right" size={24} style={{marginVertical:-10, marginHorizontal:"47%",  color:"#0E1822"}}/> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("TermsAndConditions")}
              style={{
                //top: 70,
                alignSelf: "center",
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                borderRadius: 20,
              }}
            >
              <Text
                style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}
              >
                Terms and Conditions
              </Text>
            </TouchableOpacity>

            <View
              style={{
                alignSelf: "center",
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                borderRadius: 20,
                marginVertical: 15,
              }}
            >
              <Text
                style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}
              >
                App Version
              </Text>
              <Text style={{ color: "gray", fontSize: 12 }}>v1.0.0</Text>
            </View>

            <TouchableOpacity
              style={{
                alignSelf: "center",
                backgroundColor: "#E3E3E3",
                width: "80%",
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
                borderRadius: 20,
              }}
              onPress={signoutUser}
            >
              <Text
                style={{ color: "#0E1822", fontSize: 16, fontWeight: "600" }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
