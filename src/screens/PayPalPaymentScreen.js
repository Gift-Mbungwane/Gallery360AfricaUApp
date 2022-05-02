import React from "react";
import {
  ActivityIndicator,
  View,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
} from "react-native";
// import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { auth } from "../../Firebase";

const { width, height } = Dimensions.get("screen");

export default function PayPalPaymentScreen({ route, navigation }) {
  const { amount } = route.params;

  const stateChng = (navState) => {
    //  console.log(navState);
    const { url, title } = navState;
    if (title == "PayPal Sucess") {
      console.log("url", url);
      let spliturl = url.split("?");
      // console.log("spliturl",spliturl);
      let splitotherhalf = spliturl[1].split("&");
      console.log("splitotherhalf", splitotherhalf);
      let paymentId = splitotherhalf[0].replace("paymentId=", "");
      let token = splitotherhalf[1].replace("token=", "");
      let PayerID = splitotherhalf[2].replace("PayerID=", "");
      navigation.navigate("Success", {
        payId: paymentId,
        token: token,
        payerId: PayerID,
      });
      // console.log("paymentId", paymentId);
      // console.log("token", token);
      // console.log("PayerID", PayerID);
    }
  };

  return (
    <SafeAreaView>
      {/* <WebView
        startInLoadingState={true}
        onNavigationStateChange={stateChng}
        renderLoading={() => <Loading />}
        source={{
          uri: "https://gallery-360-africa.web.app",
        }}
        uid={auth.currentUser.uid}
      /> */}
    </SafeAreaView>
  );
}

const Loading = () => {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 20, alignSelf: "center", fontWeight: "bold" }}>
        Payment
      </Text>
      <Image
        source={require("../assets/images/paypal.png")}
        style={{ width: 250, height: 100, resizeMode: "contain" }}
      />
    </View>
  );
};
