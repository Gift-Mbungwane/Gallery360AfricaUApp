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
import { Toast } from "react-native-toast-message";
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
      Toast.show({
        type: "error",
        text2: "All fields are required",
      });
    } else if (recipientName == "") {
      Toast.show({
        type: "error",
        text2: "Recipient name is requred",
      });
    } else if (mobile == "") {
      Toast.show({
        type: "error",
        text2: "Mobile number is requred",
      });
    } else if (streetName == "") {
      Toast.show({
        type: "error",
        text2: "Street name is requred",
      });
    } else if (city == "") {
      Toast.show({
        type: "error",
        text2: "City is requred",
      });
    } else if (province == "") {
      Toast.show({
        type: "error",
        text2: "Province is requred",
      });
    } else if (postalCode == "") {
      Toast.show({
        type: "error",
        text2: "Postal Code is requred",
      });
    } else {
      register();
      Toast.show({
        type: "success",
        text2: "Address successfully added",
      });
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
          .catch((error) => alert(error));
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
