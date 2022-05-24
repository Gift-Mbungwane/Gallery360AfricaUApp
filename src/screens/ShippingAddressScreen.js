import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { auth, firestore } from "../../Firebase";
// import Toast from "react-native-simple-toast";
import { MaterialIcons } from "@expo/vector-icons";

export default function ShippingAddressScreen({ navigation, route }) {
  const [isFocused, setIsFocused] = useState(true);

  const { uuid } = route.params;

  const [recipientName, setRecipientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const validate = () => {
    if (
      recipientName == "" &&
      mobile == "" &&
      streetName == "" &&
      city == "" &&
      province == "" &&
      postalCode == ""
    ) {
      // Toast.show("All fields are required", Toast.LONG, Toast.CENTER);
    } else if (recipientName == "") {
      // Toast.show("Recipient name is requred", Toast.LONG, Toast.CENTER);
    } else if (mobile == "") {
      // Toast.show("Mobile number is requred", Toast.LONG, Toast.CENTER);
    } else if (streetName == "") {
      // Toast.show("Street name is requred", Toast.LONG, Toast.CENTER);
    } else if (city == "") {
      // Toast.show("City is requred", Toast.LONG, Toast.CENTER);
    } else if (province == "") {
      // Toast.show("Province is requred", Toast.LONG, Toast.CENTER);
    } else if (postalCode == "") {
      // Toast.show("Postal Code is requred", Toast.LONG, Toast.CENTER);
    } else {
      register();
      // Toast.show("Address successfully added", Toast.LONG, Toast.CENTER);
    }
  };

  const register = () => {
    const user = auth.currentUser;
    return firestore
      .collection("address")
      .add({
        uid: user.uid,
        recipientName: recipientName,
        mobile: mobile,
        streetName: streetName,
        city: city,
        province: province,
        postalCode: postalCode,
      })
      .then((address) => {
        address
          .update({
            key: address.id,
          })
          .then(() => {
            // Toast.show("Your address has been added", Toast.LONG, Toast.CENTER);
          })
          .catch((error) => {
            // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
          });
        navigation.navigate("DeliveryAddress", { uuid: uuid });
      });
  };

  return (
    <SafeAreaView>
      <View style={globalStyles.body}></View>
      <KeyboardAvoidingView>
        <TextInput
          style={globalStyles.textField}
          value={recipientName}
          onChangeText={(text) => setRecipientName(text)}
          placeholder="Recipient Name"
          placeholderTextColor="#22180E"
        />
        <TextInput
          style={globalStyles.textField}
          value={mobile}
          onChangeText={(text) => setMobile(text)}
          placeholder="Mobile Number"
          placeholderTextColor="#22180E"
          keyboardType="numeric"
        />
        <TextInput
          style={globalStyles.textField}
          value={streetName}
          onChangeText={(text) => setStreetName(text)}
          placeholder="Street Name"
          placeholderTextColor="#22180E"
        />
        <TextInput
          style={globalStyles.textField}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="City / Town"
          placeholderTextColor="#22180E"
        />
        <TextInput
          style={globalStyles.textField}
          value={province}
          onChangeText={(text) => setProvince(text)}
          placeholder="Pronvince"
          placeholderTextColor="#22180E"
        />
        <TextInput
          style={globalStyles.textField}
          value={postalCode}
          onChangeText={(text) => setPostalCode(text)}
          placeholder="Postal Code"
          placeholderTextColor="#22180E"
          keyboardType="numeric"
        />

        <TouchableOpacity
          onPress={validate}
          style={{
            backgroundColor: "black",
            width: "80%",
            height: 50,
            borderRadius: 20,
            bottom: 15,
            marginTop: 45,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              alignSelf: "center",
              fontSize: 14,
              top: 15,
            }}
          >
            Save Address
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
