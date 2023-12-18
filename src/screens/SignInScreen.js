import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Formik } from "formik";
// import { LinearGradient } from "expo-linear-gradient";
// import Toast from "react-native-simple-toast";
// firebase
import { auth } from "../../Firebase";
// components
import AppLoader from "../assets/components/AppLoader";
import { UserContext } from "../Context/UserContext";
import { LinearGradient } from "react-native-svg";
import { globalStyles } from "../assets/styles/GlobalStyles";

import { SafeAreaView } from "react-native-safe-area-context";
// ikmpor {{ SafeAreaView}} from "react-native-safe-area-context";

// main
export default function SignInScreen({ navigation }) {

  // set state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn, toggleUserState } = useContext(UserContext)
  useEffect(() => {
    // console.log('on login');
    // console.log({ loading });
  }, [loading])
  // form validation
  const validate = () => {
    const reg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email == "" && password == "") {
      // Toast.show("Both fields are empty", Toast.LONG, Toast.CENTER);
      alert("Both fields are empty");
    } else if (!reg.test(email)) {
      {
        // Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
        alert("Both fields are empty");

        setLoading(false);
      }
    } else if (password == "") {
      // Toast.show("Password cannot be empty", Toast.LONG, Toast.CENTER);
      alert("Both fields are empty");
    } else {
      setLoading(false);
    }
  };

  //
  const signIn = async () => {
    setLoading(true);
    // console.log(email, password);
    if (email !== "" && password !== "") {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          // <ActivityIndicator size="large" color="green" />;
          // console.log(user);
          // Toast.show(
          //   "You have successfully loged in ",
          //   Toast.LONG,
          //   Toast.CENTER
          // );
          // toggleUserState(true, { email: user.email, uid: user.uid } )
          // if(typeof isLoggedIn === 'boolean' ) {
            // console.log(isLoggedIn);
            // if (user) navigation.navigate("Home");
          // }
          
        })
        .catch((error) => {
          // console.log(error);
          // console.log('network error');
          Alert.alert('Error', error.message, [
            { text: "Okay", onPress: () => console.log('okay pressed')}
          ])
          if (error.code === "auth/invalid-email") {
            // Toast.show("Email is not valid", Toast.LONG, Toast.CENTER);
            setLoading(false);
          } else if (error.code === "auth/user-not-found") {
            // Toast.show("No User Found", Toast.LONG, Toast.CENTER);
            setLoading(false);
          } else {
            // Toast.show(
            //   "Please check your email id or password",
            //   Toast.LONG,
            //   Toast.CENTER
            // );
            setLoading(false);
          }
        });
    }
  };

  //
  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <KeyboardAvoidingView behavior="position">
          <SafeAreaView style={{ }}>
            <ImageBackground
              source={require("../assets/images/signIn/bg.png")}
              style={{ height: Dimensions.get("window").height }}
            >
              <View style={{ flex: 4 }}>
                <View style={styles.gallery360logo}>
                  <Image
                    source={require("../assets/images/signIn/SignInLogo.png")}
                  />
                </View>
              </View>
              <View style={{ flex: 6, marginBottom: 0  }}>
                <View>
                  <View style={{ marginLeft: 33, marginBottom: 15 }}>
                    <Text style={{ fontSize: 36, color: "#22180E" }}>
                      Welcome Back !
                    </Text>
                    <Text style={{ color: "#FFFFFF" }}>
                      Login to your account
                    </Text>
                  </View>
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    underlineColorAndroid="#f000"
                    placeholder="Email"
                    placeholderTextColor="#FFFFFF"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.SectionStyle}>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    underlineColorAndroid="#f000"
                    placeholder="Password"
                    placeholderTextColor="#FFFFFF"
                    returnKeyType="next"
                    secureTextEntry={true}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    if (email === "" && password === "") {
                      setLoading(false);
                      validate();
                    } else if (email == true && password == true) {
                      signIn();
                    } else if (email !== true || password == true) {
                      setLoading(false);
                      validate();
                      signIn();
                    } else {
                      validate();
                      signIn();
                      setLoading(true);
                    }
                  }}
                  activeOpacity={0.5}
                >
                  <View
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonTextStyle}>Sign In</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 10 }} onPress={()=> navigation.navigate('ForgotPassword')}>
                  <Text style={{ color: '#22180E' }}>Forgot password </Text>
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                  <Text style={{ color: '#FFF' }}>Don't have an account?</Text>
                  <Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text style={{ color: "#22180E" }}> Sign Up</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </SafeAreaView>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageBack: {
    height: Dimensions.get("window").height,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
    borderWidth: 0,
    color: "#fff",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'center'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,

  },
  inputStyle: {
    flex: 1,
    color: "white",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#FFFFFF",
  },
  errors: {
    // fontSize: 12,
    color: "red",
    // fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 35,
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0E1822",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 50,
    alignItems: "center",
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
    justifyContent: 'center',
    // backgroundColor: 'yellow'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 13,
    fontSize: 16,
    textAlign: 'center',
    // backgroundColor: 'red',
    alignSelf: 'center'
  },
  gallery360logo: {
    height: 226,
    width: 166,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 45,
  },
});
