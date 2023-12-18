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
import { Formik } from "formik";
import { globalStyles } from "../assets/styles/GlobalStyles";
import { firestore, auth } from "../../Firebase";
import { UserContext } from "../Context/UserContext";
// import Toast from "react-native-simple-toast";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  const register = async () => {
    if (fullName !== "" && email !== "" && password !== "") {
      toggleIndicator(true)
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          firestore
            .collection("users")
            .doc(user.uid)
            .set({
              uid: user.uid,
              fullName: fullName,
              email: user.email,
              photoURL:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU",
            })
            .then(() => {
              // navigation.navigate("Home");
              // toggleUserState(true)
              toggleUserState(true, { email: user.email, uid: user.uid } )
              toggleIndicator(false)
              // Toast.show(
              //   "You have successfully registered ",
              //   Toast.LONG,
              //   Toast.CENTER
              // );
            })
            .catch((error) => {
              toggleIndicator(false)
              // Toast.show(`${error}`, Toast.LONG, Toast.CENTER);
            });
          // console.log('User account created & signed in!');
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            // Toast.show(
            //   "That email address is already in use!",
            //   Toast.LONG,
            //   Toast.CENTER
            // );
          }
          if (error.code === "auth/invalid-email") {
            // Toast.show(
            //   "That email address is invalid!",
            //   Toast.LONG,
            //   Toast.CENTER
            // );
          } else {
            validate();
          }
          console.error(error);
        });
    }
  };
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
              <Text style={{ fontSize: 36, color: "#22180E" }}>Sign Up</Text>
              <Text style={{ color: "#FFFFFF" }}>Create your new account</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={globalStyles.SectionStyle}>
              <TextInput
                style={globalStyles.inputStyle}
                onChangeText={(fullName) => setFullName(fullName)}
                value={fullName}
                underlineColorAndroid="#f000"
                placeholder="Full Name"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="sentences"
                disabled={showIndicator}
              />
            </View>
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
            <View style={globalStyles.SectionStyle}>
              <TextInput
                style={globalStyles.inputStyle}
                onChangeText={(password) => setPassword(password)}
                value={password}
                underlineColorAndroid="#f000"
                placeholder="Password"
                placeholderTextColor="#FFFFFF"
                returnKeyType="next"
                secureTextEntry={true}
                textContentType="password"
                disabled={showIndicator}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                register() ? validate() : validate();
              }}
              style={[globalStyles.buttonStyle, showIndicator && { filter: 'grayscale(0.6)' }]}
              activeOpacity={0.5}
              disabled={showIndicator}
            >
              {showIndicator ? (
                <ActivityIndicator color='#FFF' size={30}  style={{ alignSelf: 'center' }} />
              ) : (
                <Text style={globalStyles.buttonTextStyle}>Sign Up</Text>
              )}
            </TouchableOpacity>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ color: '#FFF'}}>Already have an account?</Text>
              <Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={{ color: "#22180E" }}> Sign In</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}