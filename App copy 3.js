// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { firestore, auth } from "./Firebase";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// screens
import {
  FontAwesome,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { globalStyles } from "./src/assets/styles/GlobalStyles";

import UserSettingsScreen from "././src/screens/UserSettingsScreen"; // original screen
import CartScreen from "./src/screens/CartScreen";
import ExhibitionScreen from "./src/screens/ExhibitionScreen";
import ExhibitionDetailsScreen from "./src/screens/ExhibitionDetailsScreen";
import ArtistProfileScreen from "./src/screens/ArtistProfileScreen";
import MarketScreen from "./src/screens/MarketScreen";
import ArtistsScreen from "./src/screens/ArtistsScreen";
import ArtPreviewScreen from "./src/screens/ArtPreviewScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import SplashScreen from "./src/screens/SplashScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PreviewScreen from "./src/screens/PreviewScreen";
import TermsAndConditionsScreen from "./src/screens/TermsAndConditionsScreen";
import ShippingAddressScreen from "./src/screens/ShippingAddressScreen";
import DeliveryAddressScreen from "./src/screens/DeliveryAddressScreen";
import ArtWorksScreen from "./src/screens/ArtWorksScreen";

import PreviewMoreScreen from "./src/screens/PreviewMoreScreen";
import PayPalPaymentScreen from "./src/screens/PayPalPaymentScreen";
import PaymentFailureScreen from "./src/screens/PaymentFailureScreen";  //  ????????????
import PaymentSuccessScreen from "./src/screens/PaymentSuccessScreen";
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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        elevation: 0,
        marginBottom: 5,
        tabBarBackground: '#000',
        tabStyle: {
          tabBarBackground: "CEB89E",
          height: 45,
          minHeight: 0,
          backgroundColor: "#ceb89e",
          borderRadius: 20,
          margin: 10,
          marginVertical: 10,
          padding: 3,
          width: 160,
          marginLeft: 10,
        },
        renderIndicator: () => null,
        tabBarPressColor: "#fff",
        headerTransparent: true,
        tabBarActiveTintColor: "#CEB89E",
        tabBarInactiveTintColor: "#000",
        tabBarActiveBackgroundColor: '#000',
        swipeEnabled: false,
      }}
    >
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Exhibition" component={ExhibitionScreen} />
    </Tab.Navigator>
  );
};

//
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
  const [showSplash, setShowSplash] = useState(true)
  // const [splashDidShow, deactivateSplash] = useState(false);
  useEffect(() => {
    // StatusBar.setHidden(true)

    // NavigationBar.setVisibilityAsync("hidden");  
    const unregister = auth.onAuthStateChanged((userExist) => {
      if (userExist) {
        // setuser(userExist);

        firestore.collection('users').doc(userExist.uid).onSnapshot( res => {
          const { fullName, photoURL } = res.data()
          setImageLink(photoURL);
          setFullName(fullName);
        }, (err) => {
          if(err.message === 'Failed to get document because the client is offline.') {
            console.log(err.message);
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
            if(err.message === 'Failed to get document because the client is offline.') {
              console.log(err.message);
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
  useEffect( () => {
    // console.log('here is the image: ', imageLink);
  }, [imageLink])
  useEffect( () => {
    if(typeof isLoggedIn === 'boolean') {
      // console.log('is logged in is a boolean: ', isLoggedIn);
    } else if(typeof isLoggedIn === 'undefined') {
      // console.log('is logged in is undefined');
      AsyncStorage.setItem('isLoggedIn', JSON.stringify(false))
    } else if(typeof isLoggedIn === 'object' || typeof isLoggedIn.then === 'function') {
      // console.log('isLoggedIn is a promise');
    }
  }, [isLoggedIn])
  const uuid = auth?.currentUser?.uid;
  // console.log(user);
  const getData = async () => {
    try {
      // await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
      const val = await AsyncStorage.getItem('isLoggedIn');
      setUserState(JSON.parse(val))
    } catch (error) {
      console.warn(error);
    }

  }
  const toggleUserState = async (bln) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', JSON.stringify(bln));
      setInitialName(bln ? 'Home' : 'SignIn');
      setUserState(bln);
    } catch (error) {
      console.warn(error);
    }
  }
  const deactivateSplash = (bln = null) => {
    if(bln) setShowSplash(!bln)
  }
  getData()

  return (
    <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, height: Dimensions.get('window').height }}>
      <Text style={{ flex: 1, borderColor: 'red', borderWidth: 5 }}>Hi</Text>
      <StatusBar hidden></StatusBar>
    </SafeAreaView>
    </SafeAreaProvider>

  )
  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashContext.Provider value={{ showSplash, deactivateSplash: deactivateSplash }}>
          <SplashScreen />
        </SplashContext.Provider>
        
      ) :
        <UserContext.Provider value={{ isLoggedIn, toggleUserState }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    color: "#000",
                  },
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

                        title: "",
                        headerLeft: () => (
                          <View>
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
                              width: 95,
                              left: 35,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                borderWidth: 0.5,
                                borderRadius: 30,
                                width: 30,
                                height: 30,
                                right: 10,
                                borderColor: "#ceb89e",
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
                                size={24}
                                color={"#ceb89e"}
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
                            >
                              <Image
                                source={{ uri: `${imageLink}` }}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 30,
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
                      options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTintColor: "#fff",
                        headerBackTitleVisible: false,
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
                              Preview Art
                            </Text>
                          </View>
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
                                size={28}
                                color={"#FFFFFF"}
                                style={{ alignSelf: "center", marginVertical: 10 }}
                              />
                            </View>
                          </TouchableOpacity>
                        ),
                      })}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerTransparent: false,
                        headerTintColor: "#fff",
                        headerTitleStyle: "#fff",

                        headerLeft: () => (
                          <View style={{ marginVertical: -20 }}>
                            <TouchableOpacity
                              style={globalStyles.topLeftIcon}
                              onPress={() => navigation.goBack("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                size={29}
                                color="#F5F5F5"
                                style={{ alignSelf: "center", marginVertical: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
                        ),
                      })}
                      name="PayPalPayment"
                      component={PayPalPaymentScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTintColor: "black",
                        headerTitleStyle: "black",
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
                      })}
                      name="ArtWorks"
                      component={ArtWorksScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitle: true,
                        headerTintColor: "#fff",
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
                      name="ExhibitionDetails"
                      component={ExhibitionDetailsScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,

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
                      options={{
                        headerShown: true,
                        headerTransparent: true,
                        title: "Settings",
                      }}
                      name="UserSettings"
                      component={UserSettingsScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                      })}
                      name="Cart"
                      component={CartScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        title: "Shipping Address",
                      })}
                      name="ShippingAddress"
                      component={ShippingAddressScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        title: "Delivery Address",
                      })}
                      name="DeliveryAddress"
                      component={DeliveryAddressScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        headerTitle: "Preview",
                      })}
                      name="Preview"
                      component={PreviewScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,

                        headerTitle: "Search",
                        headerTransparent: true,
                      })}
                      name="Search"
                      component={SearchScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerBackTitleVisible: false,
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
                        headerBackTitleVisible: false,
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
                        headerTintColor: "#FFFFFF",
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
                      name="SignIn"
                      component={SignInScreen}
                    />

                  </>
                )}
              </Stack.Navigator>

              <StatusBar style="auto" />
            </NavigationContainer>


        </UserContext.Provider>
      
      }
    </View>
  )
  return (
    <View>
      {showSplash ? (
        <Stack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        />
      ) : <>
        <UserContext.Provider value={{ isLoggedIn, toggleUserState }}>
          <SplashContext.Provider value={{ initialRouteName, deactivateSplash }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                  headerTitleAlign: "center",
                  headerTitleStyle: {
                    color: "#000",
                  },
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

                        title: "",
                        headerLeft: () => (
                          <View>
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
                              width: 95,
                              left: 35,
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                borderWidth: 0.5,
                                borderRadius: 30,
                                width: 30,
                                height: 30,
                                right: 10,
                                borderColor: "#ceb89e",
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
                                size={24}
                                color={"#ceb89e"}
                                style={{ alignSelf: "center" }}
                              />
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("UserProfile", {
                                  photoURL: User,
                                  fullName: fullName,
                                  uuid: uuid,
                                  cartItem: cartItem,
                                })
                              }
                            >
                              <Image
                                source={{ uri: `${User}` }}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 30,
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
                      options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTintColor: "#fff",
                        headerBackTitleVisible: false,
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
                              Preview Art
                            </Text>
                          </View>
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
                                size={28}
                                color={"#FFFFFF"}
                                style={{ alignSelf: "center", marginVertical: 10 }}
                              />
                            </View>
                          </TouchableOpacity>
                        ),
                      })}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerTransparent: false,
                        headerTintColor: "#fff",
                        headerTitleStyle: "#fff",

                        headerLeft: () => (
                          <View style={{ marginVertical: -20 }}>
                            <TouchableOpacity
                              style={globalStyles.topLeftIcon}
                              onPress={() => navigation.goBack("Home")}
                            >
                              <Ionicons
                                name="chevron-back"
                                size={29}
                                color="#F5F5F5"
                                style={{ alignSelf: "center", marginVertical: 5 }}
                              />
                            </TouchableOpacity>
                          </View>
                        ),
                      })}
                      name="PayPalPayment"
                      component={PayPalPaymentScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerTransparent: true,
                        headerTintColor: "black",
                        headerTitleStyle: "black",
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
                      })}
                      name="ArtWorks"
                      component={ArtWorksScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitle: true,
                        headerTintColor: "#fff",
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
                      name="ExhibitionDetails"
                      component={ExhibitionDetailsScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,

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
                      options={{
                        headerShown: true,
                        headerTransparent: true,
                        title: "Settings",
                      }}
                      name="UserSettings"
                      component={UserSettingsScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                      })}
                      name="Cart"
                      component={CartScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        title: "Shipping Address",
                      })}
                      name="ShippingAddress"
                      component={ShippingAddressScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        title: "Delivery Address",
                      })}
                      name="DeliveryAddress"
                      component={DeliveryAddressScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackTitleVisible: false,
                        headerTitle: "Preview",
                      })}
                      name="Preview"
                      component={PreviewScreen}
                    />

                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,

                        headerTitle: "Search",
                        headerTransparent: true,
                      })}
                      name="Search"
                      component={SearchScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerBackTitleVisible: false,
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
                        headerBackTitleVisible: false,
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
                        headerTintColor: "#FFFFFF",
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

                    {/* <Stack.Screen
                  options={{ headerShown: false }}
                  name="Splash"
                  component={SplashScreen}
                /> */}
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
                      name="SignIn"
                      component={SignInScreen}
                    />
                    <Stack.Screen
                      options={{ headerShown: false }}
                      name="Splash"
                      component={SplashScreen}
                    />
                  </>
                )}
              </Stack.Navigator>

              <StatusBar style="auto" />
            </NavigationContainer>
          </SplashContext.Provider>

        </UserContext.Provider>
      </>}
    </View>


  );
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#000",
          },
        }}
      >
        {user ? (
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

                title: "",
                headerLeft: () => (
                  <View>
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
                      width: 95,
                      left: 35,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 30,
                        width: 30,
                        height: 30,
                        right: 10,
                        borderColor: "#ceb89e",
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
                        size={24}
                        color={"#ceb89e"}
                        style={{ alignSelf: "center" }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("UserProfile", {
                          photoURL: User,
                          fullName: fullName,
                          uuid: uuid,
                          cartItem: cartItem,
                        })
                      }
                    >
                      <Image
                        source={{ uri: `${User}` }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 30,
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
              options={({ navigation }) => ({
                headerTransparent: true,
                headerTintColor: "#fff",
                headerBackTitleVisible: false,
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
                      Preview Art
                    </Text>
                  </View>
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
                        size={28}
                        color={"#FFFFFF"}
                        style={{ alignSelf: "center", marginVertical: 10 }}
                      />
                    </View>
                  </TouchableOpacity>
                ),
              })}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerTransparent: false,
                headerTintColor: "#fff",
                headerTitleStyle: "#fff",

                headerLeft: () => (
                  <View style={{ marginVertical: -20 }}>
                    <TouchableOpacity
                      style={globalStyles.topLeftIcon}
                      onPress={() => navigation.goBack("Home")}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={29}
                        color="#F5F5F5"
                        style={{ alignSelf: "center", marginVertical: 5 }}
                      />
                    </TouchableOpacity>
                  </View>
                ),
              })}
              name="PayPalPayment"
              component={PayPalPaymentScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerTransparent: true,
                headerTintColor: "black",
                headerTitleStyle: "black",
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
              })}
              name="ArtWorks"
              component={ArtWorksScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerTintColor: "#fff",
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
              name="ExhibitionDetails"
              component={ExhibitionDetailsScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,

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
              options={{
                headerShown: true,
                headerTransparent: true,
                title: "Settings",
              }}
              name="UserSettings"
              component={UserSettingsScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerBackTitleVisible: false,
              })}
              name="Cart"
              component={CartScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerBackTitleVisible: false,
                title: "Shipping Address",
              })}
              name="ShippingAddress"
              component={ShippingAddressScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerBackTitleVisible: false,
                title: "Delivery Address",
              })}
              name="DeliveryAddress"
              component={DeliveryAddressScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerTransparent: true,
                headerBackTitleVisible: false,
                headerTitle: "Preview",
              })}
              name="Preview"
              component={PreviewScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,

                headerTitle: "Search",
                headerTransparent: true,
              })}
              name="Search"
              component={SearchScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: true,
                headerBackTitleVisible: false,
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
                headerBackTitleVisible: false,
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
                headerTintColor: "#FFFFFF",
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
              name="Splash"
              component={SplashScreen}
            />
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
              name="SignIn"
              component={SignInScreen}
            />
          </>
        )}
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});