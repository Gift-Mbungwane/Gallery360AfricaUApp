import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { auth, firestore } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
import Toast from "react-native-simple-toast";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
// import * as AuthSession from "expo-auth-session/src/AuthSession";

export default function CartScreen({ navigation, route }) {
  const { uuid } = route.params;

  const [cartItem, setCartItem] = useState(0);
  const [cart, setCart] = useState(null);
  const [artName, setArtName] = useState("");
  // const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [artURL, setArtURL] = useState("");
  const [keyy, setKey] = useState("");
  const [accessToken, setAccessToken] = useState();
  // const [request, response, promptAsync] = AuthSession.getDefaultReturnUrl(
  //   "/",
  //   Linking.createURL("/?")
  // );

  const getCart = () => {
    return firestore
      .collection("cartItem")
      .doc(uuid)
      .onSnapshot((snapShot1) => {
        const getData = snapShot1.ref
          .collection("items")
          .where("uuid", "==", uuid)
          .onSnapshot((snapShot) => {
            const sizes = snapShot.size;
            setCartItem(sizes);

            const carts = snapShot.docs.map((document) => document.data());
            const prices = snapShot.docs.map((document) =>
              parseFloat(document.data().price)
            );
            const artURLs = snapShot.docs.map(
              (document) => document.data().artUrl
            );
            const artnames = snapShot.docs.map(
              (document) => document.data().artType
            );
            const artkeyy = snapShot.docs.map(
              (document) => document.data().keyy
            );
            //  console.log(artURLs, "this is the one image")
            const initialValue = 0;
            const totalAmounts = prices.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              initialValue
            );

            setTotalAmount(totalAmounts);
            setCart(carts);
            setArtName(artnames);
            setArtURL(artURLs);
            setKey(artkeyy);
          });
      });
  };

  const deleteCart = async (keyy) => {
    return await firestore
      .collection("cartItem")
      .doc(uuid)
      .collection("items")
      .doc(keyy)
      .delete()
      .then(() => {
        Toast.show("Your item has been deleted! ", Toast.LONG, Toast.CENTER);
      })
      .catch((error) => {
        Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
      });
  };

  const openBrowser = async () => {
    const uid = auth.currentUser.uid;
    // const open = WebBrowser.openBrowserAsync(
    //   "https://gallery-360-africa.web.app/Payment" +
    //     `?id=${auth.currentUser.uid}`
    // );

    try {
      // const redirectUrl = Linking.getInitialURL("/");
      // const result = await WebBrowser.openAuthSessionAsync(
      //   "https://gallery-360-africa.web.app/Payment" +
      //     `/?linkingUri=${Linking.createURL("/?")}` +
      //     `?id=${auth.currentUser.uid}`,
      //   redirectUrl
      // );

      const result = WebBrowser.openAuthSessionAsync(``);

      console.log(result.url, " the result of the url");
      if (result.type === "cancel" || result.type === "dismiss") {
        return { type: result.type };
        console.log(
          result.type,
          " the result of cancelling or go back to th app "
        );
      }

      // if (result.type) {
      //   // navigation.navigate("Market");
      //   console.log(result.url, " this is the result uri");
      // }
    } catch (error) {
      Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  useEffect(() => {
    getCart();
    return () => getCart();
  }, []);

  //
  const Items = ({ name, price, imageUrl, keyy }) => {
    return (
      <View style={globalStyles.flatlistView}>
        <View style={globalStyles.cancelIcon}>
          <TouchableOpacity onPress={() => deleteCart(keyy)}>
            <Ionicons
              name="close-outline"
              size={25}
              color="#FFFFFF"
              style={globalStyles.closeIconStyle}
            />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: imageUrl }} style={globalStyles.cartImage} />
        <View style={globalStyles.priceContainer}>
          <Text style={globalStyles.artTxtName}>{name}</Text>
          <Text style={globalStyles.priceTxt}>{`R${price}.00`}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={globalStyles.container}
    >
      <View style={{ flex: 6 }}>
        <View style={globalStyles.Top}>
          {/* <View style={globalStyles.backButtonView}>
            <TouchableOpacity 
              onPress={() => navigation.goBack(null)}
              style={globalStyles.backButton}
            >
              <Entypo
                name="chevron-small-left"
                size={40}
                color={"#000"}
              />
            </TouchableOpacity>
          </View> */}

          {/* <View>
            <Text style={globalStyles.title}>Cart</Text>
          </View> */}
        </View>

        {cartItem > 0 ? (
          <FlatList
            // style={{marginVertical:"6%"}}
            data={cart}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.artUrl}`}
            renderItem={({ item }) => {
              return (
                <View>
                  <Items
                    imageUrl={item.artUrl}
                    name={item.artType}
                    price={item.price}
                    keyy={item.imageUid}
                  />
                </View>
              );
            }}
          />
        ) : (
          <View
            style={{
              width: "70%",
              height: "10%",
              backgroundColor: "lightgrey",
              borderRadius: 20,
              alignSelf: "center",
              top: 65,
            }}
          >
            <Text
              style={{ color: "#fff", alignSelf: "center", marginVertical: 15 }}
            >
              No art has been added to cart
            </Text>
          </View>
        )}
      </View>

      <View style={{ flex: 2 }}>
        <View
          style={{
            borderRadius: 30,
            width: "95%",
            height: 150,
            backgroundColor: "#FFFFFF",
            alignSelf: "center",
            marginVertical: -45,
            borderWidth: 1,
            borderColor: "lightgray",
            top: 55,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: 150,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Items</Text>
              {cartItem > 0 ? (
                <Text style={{ fontSize: 16, color: "black" }}>
                  {cartItem} Items
                </Text>
              ) : (
                <Text style={{ fontSize: 16, color: "black" }}>No Items</Text>
              )}
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: 140,
                marginVertical: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Total Amount</Text>
              {totalAmount > 0 ? (
                <Text
                  style={{ fontSize: 24, color: "black", fontWeight: "bold" }}
                >{`R${totalAmount}.00`}</Text>
              ) : (
                <Text
                  style={{ fontSize: 24, color: "black", fontWeight: "bold" }}
                >
                  R0.00
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              width: "90%",
              height: 50,
              borderRadius: 20,
              backgroundColor: "black",
              alignSelf: "center",
              justifyContent: "center",
              marginVertical: -10,
            }}
          >
            <TouchableOpacity
              onPress={
                () => openBrowser()
                // navigation.navigate("PayPalPayment", {
                //   uuid: uuid,
                //   amount: totalAmount,
                // })
              }
            >
              <Text
                style={{ fontSize: 16, color: "#FFFFFF", textAlign: "center" }}
              >
                Proceed to Payment
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const image = require("../assets/images/home.png");

const styles = StyleSheet.create({});
