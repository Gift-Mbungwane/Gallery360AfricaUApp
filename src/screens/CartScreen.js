import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Platform,
  StatusBar,
  Dimensions
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { auth, firestore } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";
// import Toast from "react-native-simple-toast";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

// import * as AuthSession from "expo-auth-session/src/AuthSession";

WebBrowser.maybeCompleteAuthSession();

export default function CartScreen({ navigation, route }) {
  const { uuid } = route.params || { uuid: 'jLEqNAaAgycYdLzaVG9otkyqvY33' };
  const [cartItem, setCartItem] = useState(0);
  const [cart, setCart] = useState(null);
  const [artName, setArtName] = useState("");
  // const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [artURL, setArtURL] = useState("");
  const [keyy, setKey] = useState("");
  const [accessToken, setAccessToken] = useState();
  const [baseUri, setBaseUri] = useState("");
  const [webResult, setWebResult] = useState(null);
  const headerHeight = useHeaderHeight()
  const insets = useSafeAreaInsets()
  // const [request, response, promptAsync] = AuthSession.getDefaultReturnUrl(
  //   "/",
  //   Linking.createURL("/?")
  // );
  const getCart = () => {
    console.log(uuid);
    firestore
      .collection("cartItem")
      .doc(uuid)
      .onSnapshot((snapShot1) => {
        // console.log(snapShot1.data());
        
          console.log('I exist');
          snapShot1.ref
            .collection("items")
            .where("uuid", "==", uuid)
            .onSnapshot((snapShot) => {
              if (!snapShot.empty) {
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
                  (previousValue, currentValue) => Number(previousValue) + Number(currentValue),
                  Number(initialValue)
                );

                setTotalAmount(totalAmounts);
                setCart(carts);
                setArtName(artnames);
                setArtURL(artURLs);
                setKey(artkeyy);
              }

            });
       

      });
  };

  const deleteCart = async (keyy) => {
    const deleteItem = () => {
      // console.log('key: ', keyy);
      firestore
        .collection("cartItem")
        .doc(uuid)
        .collection("items")
        .doc(keyy)
        .delete()
        .then(() => {
          console.log('item deleted');
          // Toast.show("Your item has been deleted! ", Toast.LONG, Toast.CENTER);
        })
        .catch((error) => {
          console.log('failed to delete');
          // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
        });
    }
    Alert.alert(
      "Delete Item",
      "You are about to remove the item from the cart, continue?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => deleteItem() }
      ]
    );

  };

  const handleRedirect = (event) => {
    WebBrowser.dismissBrowser();
    const redirectData = Linking.parse(event.url);
    // console.log(redirectData, "the handled link from listeners");
  };
  const createTwoButtonAlert = () =>
    setTimeout(() => {

    }, 300)
  firestore
    .collection("cartItem")
    .doc(uuid)
    .onSnapshot((snapShot1) => {
      if (snapShot1.exists) {
        const data = snapShot1.data()
        // console.log(snapShot1.data());
        // console.log('here')
        // console.log(snapShot1.data().status);
        // console.log(uuid)
        if (data && data.status === 'failed') {
          // console.log('failed');
          firestore
            .collection("cartItem")
            .doc(uuid).update({ status: 'read', readStatus: data.status })


          Alert.alert('Alert Title', data.status, [

            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);

        } else if (data && data.status === 'authorized') {
          // console.log('authorized');
          firestore
            .collection("cartItem")
            .doc(uuid).update({ status: 'read', readStatus: data.status })
          firestore
            .collection("cartItem").doc(uuid).delete()
          Alert.alert('Alert Title', data.status, [

            { text: 'OK', onPress: () => navigation.navigate('Home') },
          ]);
        }
      }
    });

  const openBrowser = async () => {
    const uid = auth.currentUser.uid;
    // const open = WebBrowser.openBrowserAsync(
    //   "https://gallery-360-africa.web.app/Payment" +
    //     `?id=${auth.currentUser.uid}`
    // );
    let webResult = await WebBrowser.openBrowserAsync(`https://gallery-360-africa.web.app/Payment/${uid}`);
    setResult(webResult);
    return;
    // const uid = auth.currentUser.uid;
    // const open = WebBrowser.openBrowserAsync(
    //   "https://gallery-360-africa.web.app/Payment" +
    //     `?id=${auth.currentUser.uid}`
    // );

    Linking.addEventListener("url", handleRedirect);
    try {
      // const redirectUrl = Linking.getInitialURL("/");
      const uid = auth?.currentUser?.uid;

      const authurl =
        "https://gallery-360-africa.web.app/Payment" + `/?id=${uid}`; // example.com is some auth server url

      const redirectUri = [
        "https://gallery-360-africa.web.app/Success",
        "https://gallery-360-africa.web.app/Failure",
      ].map((url) => url.replace("https://gallery-360-africa.web.app/", ""));

      const result = await WebBrowser.openAuthSessionAsync(authurl, redirectUri)
        .then((results) => {
          // console.log(results.url, " now this is the url of current screen");
          Linking.removeEventListener("url", handleRedirect);
        })
        .catch((error) => alert(error));

      // const result = await WebBrowser.openAuthSessionAsync(
      //   "https://gallery-360-africa.web.app/Payment" +
      //     //`${Linking.createURL("/")}` +
      //     `/?id=${uid}`,
      //   redirectUri.map((uri) => uri)
      // );

      // console.log(result.url, " the result of the url");
      if (result.type === "cancel" || result.type === "dismiss") {
        //return { type: result.type };
        // console.log(
        //   result.type,
        //   " the result of cancelling or go back to th app "
        // );
      }

      if (result.url == "https://gallery-360-africa.web.app/Success") {
        // console.log(result.url, "this is hte return url yo need to expect");
      } else if (result.url !== "https://gallery-360-africa.web.app/Success") {
        // console.log(result.url, " this is the failed return url");
      }

      // if (result.type) {
      //   // navigation.navigate("Market");
      //   console.log(result.url, " this is the result uri");
      // }
    } catch (error) {
      // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
    }
  };

  useEffect(() => {
    // window.location.href = baseUri;
    let isMounted = true;
    if (isMounted) {
      createTwoButtonAlert()
      getCart();
    }

    return () => isMounted = false;
  }, []);

  //
  const Items = ({ name, price, imageUrl, keyy }) => {
    return (
      <View style={globalStyles.flatlistView}>
        <View style={globalStyles.cancelIcon}>
          <TouchableOpacity style={{ width: 37, height: 37, cursor: 'pointer' }} onPress={() => deleteCart(keyy)}>
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
      style={[styles.container]}
    >
      <View style={[styles.topLevelView, { paddingTop: insets.top + 60 } ]}>
        {/* <View>
          <Text>Hi</Text>
        </View> */}
        <View style={[{ paddingVertical: 10, flex: 1, }, styles.safeAreaContainer]}>
          <View style={{ flex: 6 }}>
            {cartItem > 0 ? (
              <FlatList
                style={{ marginLeft: 10, marginRight: 10 }}
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
                  height: 80,
                  backgroundColor: "lightgrey",
                  borderRadius: 20,
                  alignSelf: "center",
                  justifyContent: 'center',
                  top: 30,
                }}
              >
                <Text
                  style={{ color: "#fff", alignSelf: "center", marginVertical: 0, fontSize: 16, fontWeight: 'bold' }}
                >
                  No art has been added to cart
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginHorizontal: 20, height: 180 }}>
            {cartItem > 0 ? (
              <View
                style={{
                  borderRadius: 30,
                  width: '100%',
                  height: 180,
                  backgroundColor: "#FFFFFF",
                  alignSelf: "center",
                  justifyContent: 'space-around',
                  marginVertical: 0,
                  borderWidth: 1,
                  borderColor: "#E6E6E6",
                  // top: 55,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: 20,
                    marginVertical: 5,
                    // backgroundColor: 'red',
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      // width: 150,
                      marginVertical: 10,
                      // backgroundColor: 'blue'
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "gray", fontWeight: '700', letterSpacing: 0.3 }}>Items</Text>
                    {cartItem > 0 ? (
                      <Text style={{ fontSize: 16, color: "black", fontWeight: '900', letterSpacing: 0.3, marginTop: 15 }}>
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
                      // width: 140,
                      alignItems: 'flex-end',
                      marginVertical: 10,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "gray", fontWeight: '700', letterSpacing: 0.3 }}>Total Amount</Text>
                    {totalAmount > 0 ? (
                      <Text
                        style={{ fontSize: 24, color: "black", fontWeight: "900", letterSpacing: 0.3, marginTop: 15 }}
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
                  elevation={ 5 }
                  style={{
                    width: "90%",
                    height: 50,
                    borderRadius: 20,
                    bottom: 0,
                    backgroundColor: "#19120A",
                    alignSelf: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    shadowColor: 'black',
                    shadowRadius: 3,
                    shadowOpacity: 0.5,
                    shadowOffset: {
                      height: 2, width: 0
                    },
                    elevation: 4
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
                      style={{ fontSize: 16, color: "#FFFFFF", textAlign: "center", fontWeight: 'bold', letterSpacing: 0.3 }}
                    >
                      Proceed to Payment
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <></>
            )}

          </View>
        </View>

      </View>

    </ImageBackground>
  );
}

const image = require("../assets/images/home.png");
const statusBarHeight = StatusBar.currentHeight;
const paddingOnTop = Platform.OS === 'android' ? 60 : 60;
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // height: Dimensions.get('window').height,
    // paddingTop: paddingOnTop,
    // paddingBottom: Platform.OS === 'android' ? navBarHeight + 20 : 20,
  },
  topLevelView: {
    flex: 1,
    // height: Dimensions.get('window').height,
    // backgroundColor: 'red',
    // paddingBottom: 200,
    // borderColor: 'yellow',
    // borderWidth: 1
    // paddingTop: 57
  },
  safeAreaContainer: {
    // height: Dimensions.get('window').height - 57,
    // top: 57,
    // borderColor: 'blue',
    // borderWidth: 1,
    // display: 'flex'
  },
  safeAreaContainer: {
    // height: Dimensions.get('window').height - 57,
    // flex: 1,
    // top: 57,
    // borderColor: 'blue',
    // borderWidth: 1,
    display: 'flex'
  }
});
