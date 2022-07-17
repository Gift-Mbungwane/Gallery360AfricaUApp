import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { auth, firestore } from "../../Firebase";

export default function DeliveryAddressScreen({ navigation, route }) {
  const { uuid, amount } = route.params;
  // const { uuid, amount } = route.params || { uuid: '0CVA2hLN0SfrpGMDBMRyBqGkGO32', amount: 5};

  const [address, setAddress] = useState(null);
  const [addressUuid, setUidAddress] = useState("");

  const getAddress = async () => {
    const uid = auth.currentUser.uid;

    return await firestore
      .collection("address")
      .where("uid", "==", uid)
      .onSnapshot((snapShot) => {
        const allAddress = snapShot.docs.map((docSnap) => docSnap.data());
        const AddressUuid = snapShot.docs.map((docSnap) => docSnap.data().uid);
        setUidAddress(AddressUuid);
        setAddress(allAddress);
      });
  };

  const Item = ({ province, city, streetName }) => {
    return (
      <View
        style={{
          width: "90%",
          height: 69,
          backgroundColor: "#EBECED",
          borderRadius: 20,
          alignSelf: "center",
          marginVertical: 5,
          justifyContent: "center",
        }}
      >
        <Text
          style={{ fontSize: 18, left: 20, color: "black", fontWeight: "bold" }}
        >
          {streetName}
        </Text>
        <Text style={{ color: "black", left: 20 }}>
          {province}, {city}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    getAddress();
    // return () => getAddress();
  }, []);
return (
    <View>
      <ImageBackground
        source={bg}
        style={{ width: "100%", height: "100%" }}
        resizeMode="stretch"
      >
        {/* <View style={{flex:1, flexDirection:'row', maxWidth:'75%', justifyContent:'space-between', top:20, paddingHorizontal:25 }}>
          <View style={{height:40, width:40, borderColor:'black', borderWidth:1, borderRadius:10, justifyContent:'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart', {uuid: uuid})}>
                <MaterialIcons
                    name="arrow-back-ios" size={25}
                    color="black"
                    style={{ alignSelf:'center', left:5 }}
                />
            </TouchableOpacity>
          </View>
               <Text style={{fontSize:20, color:'black', top:10, }}>Delivery Address</Text>
        </View> */}
        <SafeAreaView style={{ flex: 4, top: 65 }}>
          {
            //   addressUuid !== "" ||
            // addressUuid !== undefined ||
            addressUuid == uuid ? (
              <FlatList
                data={address}
                keyExtractor={(item) => `${item.key}`}
                renderItem={({ item }) => {
                  return (
                    <SafeAreaView>
                      <TouchableOpacity
                      // onPress={() =>
                      //   navigation.navigate("PayPalPayment", {
                      //     uuid: uuid,
                      //     amount: amount,
                      //   })
                      // }
                      >
                        <Item
                          province={item.province}
                          streetName={item.streetName}
                          city={item.city}
                        />
                      </TouchableOpacity>
                    </SafeAreaView>
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
                  style={{
                    color: "#F5F5F5",
                    alignSelf: "center",
                    marginVertical: 15,
                    fontSize: 18,
                  }}
                >
                  No available addresses
                </Text>
              </View>
            )
          }
        </SafeAreaView>
        <View style={{ flex: 1, alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ShippingAddress", { uuid: uuid })
            }
            style={{
              backgroundColor: "black",
              width: 320,
              height: 45,
              borderRadius: 12,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 14 }}>
              Add New Address
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const bg = require("../assets/images/home.png");
