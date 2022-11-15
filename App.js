// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform, StatusBar, Dimensions, ImageBackground, ImageBackgroundBase } from "react-native";
import { NavigationContainer, DefaultTheme, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { firestore, auth } from "./Firebase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  FontAwesome,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { globalStyles } from "./src/assets/styles/GlobalStyles";

import {
  UserSettingsScreen, CartScreen, ExhibitionDetailsScreen, ExhibitionScreen, ArtistProfileScreen, MarketScreen, ArtPreviewScreen, ArtWorksScreen, ArtistsScreen, SignUpScreen,
  SignInScreen, OnboardingScreen, SplashScreen, UserProfileScreen, SearchScreen, PreviewMoreScreen, PreviewScreen, TermsAndConditionsScreen, ShippingAddressScreen, DeliveryAddressScreen,
  PayPalPaymentScreen, PaymentFailureScreen, PaymentSuccessScreen, NotificationScreen, ScrollScreen, ForgotPasswordScreen, TestScreen, ArtistsScreenCopy
}
  from './src/screens';
import Home from './src/screens/Home';

// import noPhoto from './assets/no-photo.png'
import noPhoto from './assets/no2.png';
//Removing timer warnings and replacing them with logs
import { LogBox } from 'react-native';
import _ from 'lodash';
import { UserContext } from "./src/Context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashContext } from "./src/Context/SplashContext";
import * as NavigationBar from 'expo-navigation-bar';
import TabBarComponent from "./src/assets/components/TabBarComponent";
import TabNavigator from "./src/assets/components/TabNavigator";
import TabHeader from "./src/assets/components/TabHeader";
import BackIcon from "./src/assets/components/BackIcon";
const background = require("./src/assets/images/home.png");
import LogoutIcon from './src/assets/images/logout.svg'
import HomeHeaderRight from "./src/assets/components/HomeHeaderRight";


LogBox.ignoreLogs(['warning: Setting a timer for a long period of time', 'Warning: Async Storage has been extracted from react-native core']); // ignore specific logs
// LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};


const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();


const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App({ navigation }) {

  // set state
  const [user, setuser] = useState(false);
  const [uid, setUID] = useState("");
  const [cartItem, setCartItem] = useState(0);
  const [User, setUser] = useState(null);
  const [imageLink, setImageLink] = useState(noPhoto)
  const [fullName, setFullName] = useState(null);
  // const [isLoggedIn, setUserState] = useState(false);
  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");
  const [initialRouteName, setInitialName] = useState('Splash')
  const [isLoggedIn, setUserState] = useState(AsyncStorage.getItem('isLoggedIn'))
  const [isLoggedInBln, setUserStateBln] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  // const [splashDidShow, deactivateSplash] = useState(false);

  useEffect(() => {
    // StatusBar.setBackgroundColor('transparent')
    // StatusBar.setTranslucent(true);
    // NavigationBar.setVisibilityAsync(false)
    StatusBar.setBackgroundColor('#ceb89e')
    NavigationBar.setBackgroundColorAsync('#ceb89e')
    const unregister = auth.onAuthStateChanged((userExist) => {
      if (userExist) {
        // setuser(userExist);

        firestore.collection('users').doc(userExist.uid).onSnapshot(res => {
          if (res.data()) {
            const { fullName, photoURL } = res.data()
            setImageLink(photoURL);
            setFullName(fullName);
          }

        }, (err) => {
          if (err.message === 'Failed to get document because the client is offline.') {
            // console.log(err.message);
          }
        })

        return firestore
          .collection("cartItem")
          .doc(userExist.uid)
          .collection("items")
          .where("uuid", "==", userExist.uid)
          .onSnapshot((snapShot) => {
            const cartItems = snapShot.size;
            setCartItem(cartItems);
          }, (err) => {
            if (err.message === 'Failed to get document because the client is offline.') {
              // console.log(err.message);
            }
          });
      } else {
        // setuser("");
      }
    });

    return () => {
      unregister();
    };
  }, []);
  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          // Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          // console.log(isLoggedIn);
          if (typeof isLoggedIn === 'boolean') {
            // console.log(isLoggedIn);
            toggleUserState(false)
          }

        })
        .catch((error) => alert(error));
    } catch (e) {
      // console.log(e);
      toggleUserState(false)
    }
  };
  useEffect(() => {
    // console.log('here is the image: ', imageLink);
  }, [imageLink])
  useEffect(() => {
    if (typeof isLoggedIn === 'boolean') {
      // console.log('isLogged in is a boolean: ', isLoggedIn);
      // setUserStateBln(isLoggedIn)
    } else if (typeof isLoggedIn === 'undefined') {
      // console.log('isLogged in is undefined');
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(false))
      // setUserStateBln(false)
    } else if (typeof isLoggedIn === 'object' || typeof isLoggedIn.then === 'function') {
      // console.log('isLoggedIn is a promise');
    }
  }, [isLoggedIn])
  const uuid = auth?.currentUser?.uid;
  // console.log(user);
  const getData = async () => {
    try {
      // await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
      const val = await AsyncStorage.getItem('isLoggedIn');
      // console.log('val of loggedIn: ', val);
      if (isLoggedIn !== JSON.parse(val)) {
        setUserState(JSON.parse(val))
      }
    } catch (error) {
      // console.warn(error);
      if (isLoggedIn !== false) {
        AsyncStorage.setItem('isLoggedIn')
        setUserState(false)
      }
    }
  }
  useEffect(() => {
    // if(showSplash) {
    //   StatusBar.setBackgroundColor('transparent')
    //   StatusBar.setTranslucent(true);
    //   NavigationBar.getVisibilityAsync(false)
    // } else {
    //   StatusBar.setBackgroundColor('#ceb89e')
    //   NavigationBar.setBackgroundColorAsync('#ceb89e')
    // }
  }, [showSplash])
  const toggleUserState = async (bln) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(bln));
      setInitialName(bln ? 'Home' : 'SignIn');
      setUserState(bln);
    } catch (error) {
      // console.warn(error);
    }
  }
  const deactivateSplash = (bln = null) => {
    if (bln) setShowSplash(!bln)
  }
  getData()
  return (
    <SafeAreaProvider style={styles.container}>
      {showSplash ? (
        <SplashContext.Provider value={{ showSplash, deactivateSplash: deactivateSplash }}>
          <SplashScreen />
        </SplashContext.Provider>

      ) : (
        <UserContext.Provider value={{ isLoggedIn, toggleUserState }} style={styles.fullWidth}>
          {/* <ImageBackground source={background} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}> */}

          <NavigationContainer
            theme={navTheme}
            screenOptions={{
              cardStyle: {
                backgroundColor: 'transperent'

              }
              
            }}
          >
            <Stack.Navigator
              initialRouteName={'Home'}
              screenOptions={{
                headerTitleAlign: "center",
                headerTitleStyle: {
                  color: "#000",
                },
                cardStyle: {
                  backgroundColor:'transperent'
                }
              }}
            >

              {isLoggedIn ? (
                <>
                  <Stack.Screen
                    name="Home"
                    component={TabNavigator}
                    options={({ navigation }) => ({
                      headerTitleAlign: "left",
                      headerTitleStyle: {
                        color: "#000",
                      },

                      headerBackVisible: false,
                      headerShadowVisible: false,

                      headerTitle: null,
                      title: null,
                      // presentation: 'transperantModal',
                      headerShown: true,
                      headerTransparent: true,
                      headerStyle: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        backgroundColor: 'transparent',
                        borderBottomWidth: 40,
                        height: 60
                      },
                      headerLeft: () => (
                        <View style={{}}>
                          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Hi {fullName}
                          </Text>
                        </View>
                      ),
                      //
                      headerRight: () => (
                        <View
                          style={{
                            flexDirection: "row",
                            width: 85,
                            justifyContent: 'space-between'
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderWidth: 0.5,
                              borderRadius: 12,
                              width: 40,
                              height: 40,
                              // right: 20,
                              borderColor: "#fff",
                              display: 'flex',
                              justifyContent: 'center',
                              alignContent: 'center'
                            }}
                            onPress={() =>
                              navigation.navigate("Cart", {
                                cartItem: cartItem,
                                uuid: uuid,
                              })
                            }
                          >
                            <FontAwesome
                              name="shopping-cart"
                              size={17}
                              color={"#fff"}
                              style={{ alignSelf: "center" }}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("UserProfile", {
                                photoURL: imageLink,
                                fullName: fullName,
                                uuid: uuid,
                                cartItem: cartItem,
                              })
                            }
                            style={{
                              // right: 10
                            }}
                          >
                            <Image
                              source={{ uri: `${imageLink}` }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 12,
                                backgroundColor: "lightgrey",
                                borderColor: "#ceb89e",
                                borderWidth: 0.5,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="ArtPreview"
                    component={ArtPreviewScreen}
                    options={({ navigation, route }) => ({
                      headerTransparent: true,
                      headerTintColor: "#fff",
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerTitle: () => (
                        <View
                          style={{
                            height: 30,
                            borderRadius: 14,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#F5F5F5",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            {route.params.artName}
                          </Text>
                        </View>
                      ),
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerRight: () => (
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Cart", {
                              cartItem: cartItem,
                              uuid: uuid,
                            })
                          }
                          style={globalStyles.cartIcon}
                        >
                          <View
                            style={[
                              Platform.OS == "android"
                                ? globalStyles.iconContainer
                                : null,
                            ]}
                          >
                            {cartItem > 0 ? (
                              <View
                                style={{
                                  position: "absolute",
                                  height: 16,
                                  width: 16,
                                  borderRadius: 17,
                                  backgroundColor: "rgba(95,197,123,0.9)",
                                  right: 2,
                                  marginVertical: 3,
                                  alignSelf: "flex-end",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  zIndex: 2000,
                                }}
                              >
                                <Text
                                  style={{
                                    color: "#F5F5F5",
                                    fontWeight: "bold",
                                    marginVertical: -10,
                                    fontSize: 12,
                                  }}
                                >
                                  {cartItem}
                                </Text>
                              </View>
                            ) : (
                              <View></View>
                            )}
                            <MaterialCommunityIcons
                              name="cart"
                              size={25}
                              color={"#FFFFFF"}
                              style={{ alignSelf: "center", marginVertical: 6 }}
                            />
                          </View>
                        </TouchableOpacity>
                      ),
                    })}
                  />

                  <Stack.Screen
                    name="ArtScroll"
                    component={ScrollScreen}
                    options={({ navigation, route }) => ({
                      headerTransparent: true,
                      headerTintColor: "#fff",
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerTitle: () => (
                        <View
                          style={{
                            height: 30,
                            borderRadius: 14,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#F5F5F5",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            {route.params.artName}
                          </Text>
                        </View>
                      ),
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerRight: () => (
                        <HomeHeaderRight navigation={ navigation } cartItem={ cartItem } />
                      ),
                    })}
                  />

                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerTransparent: false,
                      headerTintColor: "#fff",
                      headerTitleStyle: "#fff",

                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="PayPalPayment"
                    component={PayPalPaymentScreen}
                  />
                                    <Stack.Screen 
                    name="Test"
                    component={TestScreen}
                    options={({ navigation, route }) => ({
                      headerTransparent: true,
                      headerTintColor: "#fff",
                      headerBackTitleVisible: false,
                      headerBackVisible: false })}
                    
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerTransparent: true,
                      headerTintColor: "black",
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="Artists"
                    component={ArtistsScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerTransparent: true,
                      headerTintColor: "black",
                      headerTitleStyle: "black",
                      headerBackTitleVisible: false,
                      title: "Art Work",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="ArtWorks"
                    component={ArtWorksScreen}
                  />

                  <Stack.Screen
                    name="ExhibitionDetails"
                    component={ExhibitionDetailsScreen}
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitle: true,
                      headerBackVisible: false,
                      headerTintColor: "#fff",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerTitle: () => (
                        <View
                          style={{
                            height: 30,
                            borderRadius: 14,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#F5F5F5",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            Exhibition
                          </Text>
                        </View>
                      ),
                    })}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackVisible: false,
                      cardStyle: {
                        backgroundColor: 'red'
                      },
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerRight: () => {
                        // console.log(LogoutIcon);
                        return (
                          <TouchableOpacity style={{
                            height: 35,
                            width: 37,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: 5
                            // alignSelf: "center"
                          }}
                            onPress={() => {
                              signoutUser()
                            }}
                          >
                            <FontAwesome name='sign-out' size={17} color='white'></FontAwesome>
                            {/* <Image src={LogoutIcon} style={{height: 30, width: 30}}></Image> */}
                          </TouchableOpacity>
                        )

                      },
                      headerTitle: () => (
                        <View
                          style={{
                            height: 30,
                            borderRadius: 14,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#22180E",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            Profile
                          </Text>
                        </View>
                      ),
                    })}
                    name="UserProfile"
                    component={UserProfileScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      title: "Settings",
                      headerBackVisible: false,

                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="UserSettings"
                    component={UserSettingsScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      title: "Notifications",
                      headerBackVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="Notifications"
                    component={NotificationScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerStyle: {
                        height: 60,
                        backgroundColor: 'green'
                      }
                    })}
                    name="Cart"
                    component={CartScreen}
                  />

                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      title: "Shipping Address",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="ShippingAddress"
                    component={ShippingAddressScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      title: "Delivery Address",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="DeliveryAddress"
                    component={DeliveryAddressScreen}
                  />
                  <Stack.Screen
                    options={({ navigation, route }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerTitle: "Preview",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="Preview"
                    component={PreviewScreen}
                  />

                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,

                      headerTitle: "Search",
                      headerTransparent: true,
                      headerBackVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                    })}
                    name="Search"
                    component={SearchScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerTitle: () => (
                        <View>
                          <Text
                            style={{
                              color: "#22180E",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            T's And C's
                          </Text>
                        </View>
                      ),
                      headerTransparent: true,
                    })}
                    name="TermsAndConditions"
                    component={TermsAndConditionsScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackVisible: false,
                      headerBackTitleVisible: false,
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerTitle: () => (
                        <View
                          style={{
                            height: 30,
                          }}
                        >
                          <Text
                            style={{
                              color: "black",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            Artist
                          </Text>
                        </View>
                      ),
                    })}
                    name="ArtistProfile"
                    component={ArtistProfileScreen}
                  />
                  <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: true,
                      headerTransparent: true,
                      headerBackTitleVisible: false,
                      headerBackVisible: false,
                      headerTintColor: "#FFFFFF",
                      headerLeft: (props) => (
                        <BackIcon navigation={navigation} />
                      ),
                      headerTitle: () => (
                        <View>
                          <Text
                            style={{
                              color: "#F5F5F5",
                              fontWeight: "bold",
                              fontSize: 18,
                              alignSelf: "center",
                              marginVertical: 3,
                            }}
                          >
                            Preview All
                          </Text>
                        </View>
                      ),
                    })}
                    name="PreviewMore"
                    component={PreviewMoreScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Success"
                    component={PaymentSuccessScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Failure"
                    component={PaymentFailureScreen}
                  />
                </>
              ) : (
                <>


                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="Onboarding"
                    component={OnboardingScreen}
                  />

                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="SignUp"
                    component={SignUpScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                  />
                  <Stack.Screen
                    options={{ headerShown: false }}
                    name="SignIn"
                    component={SignInScreen}
                  />

                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      )}

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: "#fff",
  },
  fullWidth: {
    width: Dimensions.get('window').width,
    height: '60%'
  }

});