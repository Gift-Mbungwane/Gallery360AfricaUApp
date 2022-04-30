import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { firestore, auth } from "../../Firebase";
import { globalStyles } from "../assets/styles/GlobalStyles";

export default function PreviewScreen({ route, navigation }) {
  const { artUrl, artistUid, photoUrl, artistName, artType } = route.params;

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Image
        source={{ uri: artUrl }}
        resizeMode="cover"
        style={globalStyles.video}
      />
    </View>
  );
}
