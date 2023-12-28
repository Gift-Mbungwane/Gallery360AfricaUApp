// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, createContext } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, Platform, StatusBar, Dimensions, ImageBackground, ImageBackgroundBase, BackHandler } from "react-native";
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
  PayPalPaymentScreen, PaymentFailureScreen, PaymentSuccessScreen, NotificationScreen, ScrollScreen, ForgotPasswordScreen, TestScreen, ArtistsScreenCopy, ArtistBiographyScreen
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
import { Header, HeroImage, SignOutButton } from "./src/components";
import UserHeaderCard from "./src/components/cards/UserHeaderCard";
import HeaderRightOptions from "./src/components/cards/HeaderRightOptions";
import { UserDetails } from "./src/Context/UserDetailsContext";


LogBox.ignoreLogs(['warning: Setting a timer for a long period of time', 'Warning: Async Storage has been extracted from react-native core']); // ignore specific logs
// LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = message => {
  try {
    if (message.indexOf('Setting a timer') <= -1) {
      _console.warn(message);
    }
  } catch (error) {
    console.log(error);
  }

};


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
  const [userState, setUserState] = useState({ "isLoggedIn": false, "user": { "email": null, "uid": null } })
  const [isLoggedInBln, setUserStateBln] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [userDetails, setUserDetails] = useState({ photoUrl: null, email: null, userId: null, fullName: null })
  // const [splashDidShow, deactivateSplash] = useState(false);

  useEffect(() => {
    // StatusBar.setBackgroundColor('transparent')
    // StatusBar.setTranslucent(true);
    // NavigationBar.setVisibilityAsync(false)

    StatusBar.setBackgroundColor('#ceb89e')
    NavigationBar.setBackgroundColorAsync('#ceb89e')
    let isMounted = true;
    if (isMounted) {
      getData()

      // console.log({ userExist });
      // setUserState(!!userExist)/

    }
    // BackHandler.addEventListener('hardwareBackPress', () => );

    return () => {
      isMounted = false
      // BackHandler.removeEventListener('hardwareBackPress')
    };
  }, []);
  useEffect(() => {
    console.log({ userDetails });
    if (userState.isLoggedIn) {
      getUserData()
    }
  }, [userState])
  const signoutUser = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          // Toast.show("You have signed out!", Toast.LONG, Toast.CENTER);
          // console.log(isLoggedIn);
          // if (typeof isLoggedIn === 'boolean') {
          // console.log(isLoggedIn);
          toggleUserState({ isLoggedIn: false, user: null })
          // }

        })
        .catch((error) => alert(error));
    } catch (e) {
      // console.log(e);
      toggleUserState({ isLoggedIn: false, user: null })
    }
  };
  useEffect(() => {
    // console.log('here is the image: ', imageLink);
  }, [imageLink])

  const uuid = auth?.currentUser?.uid;
  // console.log(user);
  const getData = async () => {
    try {
      console.log('getting user data');
      auth.onAuthStateChanged(user => {
        console.log('in auth change');
        console.log({ user });
        if (!user) {
          setUserState({ isLoggedIn: false, user: { email: null, uid: null } })
        } else {
          console.log('updating user state');
          setUserState({ isLoggedIn: true, user: { email: user.email, uid: user.uid } })
        }
      })

    } catch (error) {
      // console.warn(error);
      // if (isLoggedIn !== false) {
      //   AsyncStorage.setItem('isLoggedIn', true)
      //   setUserState(false)
      // }
    }
  }
  const getUserData = () => {
    try {
      if (userState.isLoggedIn) {
        // setuser(userExist);
        console.log('user exists');
        if (userState?.user?.uid) {
          firestore.collection('users').doc(userState.user.uid).onSnapshot(res => {
            if (res.data()) {
              const { fullName, photoURL } = res.data()
              setUserDetails({
                photoUrl: res.data().photoURL,
                fullName: res.data().fullName,
                userId: userState.user.uid,
                email: res.data().email
              })
              setImageLink(photoURL);
              setFullName(fullName);
            }

          }, (err) => {
            if (err.message === 'Failed to get document because the client is offline.') {
              // console.log(err.message);
            }
          })
        }


        firestore
          .collection("cartItem")
          .doc(userState.user.uid)
          .collection("items")
          .onSnapshot((snapShot) => {
            const cartItems = snapShot.size;
            console.log({ cartItems });
            setCartItem(cartItems);
          }, (err) => {
            if (err.message === 'Failed to get document because the client is offline.') {
              // console.log(err.message);
            }
          });
      } else {
        // setuser("");
        // toggleUserState(false)
        console.log('user doesn\'t exist');
      }
    } catch (error) {
      console.log({ errorFetchingUserData: error });
    }

  }
  useEffect(() => {
    console.log({ userState });
  }, [userState])
  const toggleUserDetails = (obj) => {
    console.log(obj);
  }
  const toggleUserState = async (bln, userObj) => {
    try {
      setInitialName(bln ? 'Home' : 'SignIn');
      const user = userObj ? userObj : { email: null, uid: null }
      setUserState({ isLoggedIn: bln, user: user })
      // toggleUserState({ isLoggedIn: bln, user })
    } catch (error) {
      // console.warn(error);
    }
  }
  const deactivateSplash = (bln = null) => {
    if (bln) setShowSplash(!bln)
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {showSplash ? (
        <SplashContext.Provider value={{ showSplash, deactivateSplash: deactivateSplash }}>
          <SplashScreen />
        </SplashContext.Provider>

      ) : (
        <UserContext.Provider value={{ isLoggedIn: userState.isLoggedIn, user: userState.user, toggleUserState }} style={styles.fullWidth}>
          {/* <ImageBackground source={background} style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}> */}

          <UserDetails.Provider value={{ ...userDetails, toggleUserDetails }}>
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
                    backgroundColor: 'transperent'
                  }
                }}
              >

                {userState.isLoggedIn ? (
                  <>
                    {/* <Stack.Screen
                    name="Market"
                    component={ExhibitionScreen}
                  /> */}
                    <Stack.Screen
                      name="Home"
                      component={TabNavigator}
                      options={({ navigation }) => ({
                        headerTitleAlign: "left",
                        headerTitleStyle: {
                          color: "#000",
                        },

                        // headerBackVisible: false,
                        headerShadowVisible: false,
                        headerStyle: {
                          height: 80,
                          // backgroundColor: 'red'
                        },
                        headerTitle: null,
                        title: null,
                        // presentation: 'transperantModal',
                        headerShown: true,
                        headerTransparent: true,
                        headerLeft: () => <UserHeaderCard
                          userDetails={userDetails}
                          navigation={navigation}
                          cartItem={cartItem}
                          onPress={() => {
                            console.log('navigation pressed');
                            console.log('nav');
                            // navigation.navigate('UserProfile', {
                            //   photoURL: userDetails.photoUrl,
                            //   fullName: userDetails.fullName,
                            //   uuid: userDetails.userId,
                            //   cartItem: cartItem,
                            // })
                          }}
                        />,
                        headerRight: () => <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                        // header: () => (
                        //   // <View>
                        //   //   <Text>Hi there</Text>
                        //   // </View>
                        //   <Header>
                        //     <UserHeaderCard userDetails={userDetails} />
                        //     <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                        //   </Header>
                        // )

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
                          <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                        )
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
                          <HomeHeaderRight navigation={navigation} cartItem={cartItem} />
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
                        headerBackVisible: false
                      })}

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
                      screenOptions={({ navigation }) => ({
                        headerStyle: {
                          height: 70
                        }
                      })}
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackVisible: false,
                        cardStyle: {
                          backgroundColor: 'red'
                        },
                        headerStyle: {
                          height: 70,
                          // backgroundColor: 'black'
                        },
                        headerLeft: (props) => (
                          <BackIcon navigation={navigation} />
                        ),
                        headerRight: () => {
                          // console.log(LogoutIcon);
                          return (<SignOutButton signOutUser={() => signoutUser()} />)

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
                          // backgroundColor: 'green'
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
                    {/* <Stack.Screen
                    options={({ navigation }) => ({
                      headerShown: false,
                      headerTransparent: true,
                      headerBackVisible: false,
                      headerBackTitleVisible: false,
                      title: null,
                      headerStyle: {
                        height: 60
                      },
                      header: () => (
                        <Header>
                          <UserHeaderCard userDetails={userDetails} />
                          <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                        </Header>
                      )
                    })}
                    name="ArtistProfile"
                    component={ArtistProfileScreen}
                  /> */}
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackVisible: false,
                        headerBackTitleVisible: false,
                        title: null,
                        headerStyle: {
                          height: 70
                        },
                        headerLeft: () => (
                          // <UserHeaderCard userDetails={userDetails} />
                          <BackIcon navigation={navigation} />
                        ),
                        //
                        headerRight: () => (
                          <HeaderRightOptions userDetails={userDetails} cartItem={cartItem} navigation={navigation} />
                        )
                      })}
                      name="ArtistProfile"
                      component={ArtistProfileScreen}
                    />
                    <Stack.Screen
                      options={({ navigation }) => ({
                        headerShown: true,
                        headerTransparent: true,
                        headerBackVisible: false,
                        headerBackTitleVisible: false,
                        title: null,
                        headerStyle: {
                          height: 70
                        },
                        headerLeft: () => (
                          // <UserHeaderCard userDetails={userDetails} />
                          <BackIcon navigation={navigation} />
                        ),
                      })}
                      name="ArtistBiography"
                      component={ArtistBiographyScreen}
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
          </UserDetails.Provider>
        </UserContext.Provider>
      )}

    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: Dimensions.get('window').width,
    backgroundColor: "#fff",
  },
  fullWidth: {
    width: Dimensions.get('window').width,
    height: '60%'
  }

});