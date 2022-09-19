import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from "react-native";
import React, { useContext, useState } from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { firestore, auth } from "../../Firebase";
import { UserContext } from "../Context/UserContext";
// import Toast from "react-native-simple-toast";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [showIndicator, toggleIndicator] = useState(false)
  const { toggleUserState } = useContext(UserContext)

  const validate = () => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName == "" && email == "" && password == "") {
      // Toast.show("Both fields are empty", Toast.LONG, Toast.CENTER);
    } else if (fullName == "") {
      // Toast.show("Full name cannot be empty", Toast.LONG, Toast.CENTER);
    } else if (!reg.test(email)) {
      // Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
    } else if (password == "") {
      // Toast.show("Password cannot be empty", Toast.LONG, Toast.CENTER);
    }
  };
  const resetPassword = async() => {
    toggleIndicator(true)
    await auth.sendPasswordResetEmail(email).then((res) => {
      console.log(res);
      toggleIndicator(false)
      navigation.navigate('SignIn')
    }).catch(err => { console.log(err); toggleIndicator(false) })
  }

  return (
    <>
      <KeyboardAvoidingView behavior="position">
        <ImageBackground
          source={require("../assets/images/signUp/signUp.png")}
          style={[globalStyles.imageBack]}
        >
          <View style={{ flex: 1 }}>
            <View style={globalStyles.gallery360logo}>
              <Image
                source={require("../assets/images/signUp/signUpLogo.png")}
              />
            </View>
            <View style={{ marginLeft: 33, marginTop: 10 }}>
              <Text style={{ fontSize: 36, color: "#22180E" }}>Reset password</Text>
              <Text style={{ color: "#FFFFFF" }}>Send password reset link</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={globalStyles.SectionStyle}>
              <TextInput
                style={[
                  globalStyles.inputStyle,
                  //  {borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#fff' : 'red'}
                ]}
                onChangeText={(email) => setEmail(email)}
                value={email}
                underlineColorAndroid="#f000"
                placeholder="Email"
                placeholderTextColor="#FFFFFF"
                keyboardType="email-address"
                textContentType="emailAddress"
                disabled={showIndicator}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                resetPassword()
              }}
              style={[globalStyles.buttonStyle, showIndicator && { filter: 'grayscale(0.6)' }]}
              activeOpacity={0.5}
              disabled={showIndicator}
            >
              {showIndicator ? (
                <ActivityIndicator color='#FFF' size={30}  style={{ alignSelf: 'center' }} />
              ) : (
                <Text style={globalStyles.buttonTextStyle}>Reset Password</Text>
              )}
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ color: '#FFF'}}>Remember your password?</Text>
              <Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={{ color: "#22180E", marginLeft: 5 }}>Sign In</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}