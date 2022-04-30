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
import { Ionicons, Entypo } from "@expo/vector-icons";
import { firestore } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function CartScreen({ navigation, route }) {
  const { uuid } = route.params;

  const [cartItem, setCartItem] = useState(0);
  const [cart, setCart] = useState(null);
  const [artName, setArtName] = useState("");
  // const [price, setPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [artURL, setArtURL] = useState("");
  const [keyy, setKey] = useState("");

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
        Toast.show({
          type: "error",
          text2: "Your item has been deleted! ",
        });
      })
      .catch((error) => alert(error));
  };
  useEffect(() => {
    getCart();
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
              marginTop: 5,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DeliveryAddress", {
                  uuid: uuid,
                  amount: totalAmount,
                })
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
