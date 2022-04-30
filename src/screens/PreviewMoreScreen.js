import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import MasonryList from "@react-native-seoul/masonry-list";
import { firestore } from "../../Firebase";

const image = require("../assets/images/home.png");

function FurnitureCard({ item }) {
  const randomBool = useMemo(() => Math.random() < 0.5, []);

  return (
    <View key={item.id} style={{ marginTop: 12, flex: 1 }}>
      <Image
        source={{ uri: `${item.artUrl}` }}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: "stretch",
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginTop: 8,
        }}
      >
        {item.artName}
      </Text>
    </View>
  );
}

export default function PreviewMoreScreen({ route, navigation }) {
  const isDarkMode = useColorScheme() === "dark";

  const { datas } = route.params;

  const backgroundStyle = {
    // flex: 1,
    width: "100%",
  };

  const renderItem = ({ item, index }) => {
    const randomBool = useMemo(() => Math.random() < 0.5, []);
    return (
      <View key={item.ImageUid}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtPreview", {
              artistUid: item.ArtistUid,
              imageUID: item.ImageUid,
            })
          }
        >
          <Image
            source={{ uri: item.artUrl }}
            style={{
              height: randomBool ? 150 : 280,
              alignSelf: "stretch",
              borderRadius: 20,
              margin: 5,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 8,
            alignSelf: "center",
          }}
        >
          {item.artName}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ImageBackground
        source={image}
        resizeMode="stretch"
        style={globalStyles.container}
      >
        {/* {console.log(datas, "the image of the thingy")} */}
        <MasonryList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.ImageUid}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: "stretch",
          }}
          numColumns={4}
          data={datas}
          renderItem={renderItem}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}
