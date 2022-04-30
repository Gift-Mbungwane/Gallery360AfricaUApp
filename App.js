import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//
import { firestore, auth } from "./Firebase";
// icons
import {
  FontAwesome,
  MaterialCommunityIcons,
  EvilIcons,
  MaterialIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { globalStyles } from "./src/assets/styles/GlobalStyles";

//
import MarketScreen from "./src/screens/MarketScreen";
import ExhibitionScreen from "./src/screens/ExhibitionScreen";
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
import UserSettingsScreen from "././src/screens/UserSettingsScreen";
import CartScreen from "./src/screens/CartScreen";
import ArtistProfileScreen from "./src/screens/ArtistProfileScreen";
import ExhibitionDetailsScreen from "./src/screens/ExhibitionDetailsScreen";
import DeliveryAddressScreen from "./src/screens/DeliveryAddressScreen";
import PreviewMoreScreen from "./src/screens/PreviewMoreScreen";
import PayPalPaymentScreen from "./src/screens/PayPalPaymentScreen";
import ArtistsScreen from "./src/screens/ArtistsScreen";
import ArtWorksScreen from "./src/screens/ArtWorksScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  // header optipns
  const myOptions = {
    headerShown: false,
  };

  //
  return (
    <Tab.Navigator
      tabBarOptions={{
        elevation: 0,
        marginBottom: 5,
        tabStyle: {
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
      }}
      screenOptions={{
        tabBarPressColor: "#fff",
        headerTransparent: true,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#000",
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
  // toast message
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: "400",
        }}
        text2Style={{
          fontSize: 13,
          color: "green",
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 13,
          color: "red",
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    ),
  };

  // set state
  const [user, setuser] = useState("");
  const [uid, setUID] = useState("");
  const [cartItem, setCartItem] = useState(0);
  const [User, setUser] = useState(null);
  const [fullName, setFullName] = useState(null);

  const [items, SetItems] = useState(0);
  const [image, setImage] = useState("");

  useEffect(() => {
    const unregister = auth.onAuthStateChanged((userExist) => {
      if (userExist) {
        setuser(userExist);
        firestore
          .collection("users")
          .where("uid", "==", userExist.uid)
          .onSnapshot((snapShot) => {
            const users = snapShot.docs.map(
              (document) => document.data().photoURL
            );
            const uName = snapShot.docs.map(
              (document) => document.data().fullName
            );
            setUser(users);
            setFullName(uName);
          });

        return firestore
          .collection("cartItem")
          .doc(userExist.uid)
          .collection("items")
          .where("uuid", "==", userExist.uid)
          .onSnapshot((snapShot) => {
            const cartItems = snapShot.size;
            setCartItem(cartItems);
          });
      } else {
        setuser("");
      }
    });

    return () => {
      unregister();
    };
  }, []);

  const uuid = auth?.currentUser?.uid;

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
            {/* <Stack.Screen
              options={{ headerShown: false }}
              name="Splash"
              component={SplashScreen}
            /> */}
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
                      // justifyContent: "space-between",
                    }}
                  >
                    {/* <TouchableOpacity
                      style={{
                        borderWidth: 0.5,
                        borderRadius: 30,
                        width: 30,
                        height: 30,
                        borderColor: "#ceb89e",
                      }}
                      onPress={() => navigation.navigate("Search")}
                    >
                      <FontAwesome
                        name="search"
                        size={24}
                        color={"#ceb89e"}
                        style={{ alignSelf: "center" }}
                      />
                    </TouchableOpacity> */}

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
            {/* <Stack.Screen options={{headerShown: false}} name='Map' component={Map} />  */}
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
            {/* <Stack.Screen options={{headerShown: false}} name='PaymentSuccesful' component={PaymentSuccesful} /> */}
            {/* <Stack.Screen options={{headerShown: false}} name='PaymentFailure' component={PaymentFailure} /> */}
            {/* <Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='PaymentForm' component={PaymentForm} /> */}
            {/* <Stack.Screen options={{headerShown: true,  headerTransparent: true}} name='DeliveryAddress' component={DeliveryAddress} /> */}
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
            {/* <Stack.Screen options={{headerShown: true, headerTransparent: true}} name='Notifications' component={Notifications} /> */}
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
            {/* <Stack.Screen options={{headerShown: true, headerTransparent: true}} name='Artists' component={Artists} /> */}
            {/* <Stack.Screen options={{headerShown: true, headerTransparent: true}} name='ArtWorks' component={ArtWorks} /> */}
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

                // headerLeft: () => (
                //   <View style={{ marginVertical: -25, marginHorizontal: -15 }}>
                //     <TouchableOpacity
                //       style={globalStyles.topLeftIcon}
                //       onPress={() => navigation.goBack("Home")}
                //     >
                //       <Ionicons
                //         name="chevron-back"
                //         size={29}
                //         color="#22180E"
                //         style={{ alignSelf: "center", marginVertical: 5 }}
                //       />
                //     </TouchableOpacity>
                //   </View>
                // ),
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
    alignItems: "center",
    justifyContent: "center",
  },
});
