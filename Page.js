import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Dimensions, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Page() {
    const insets = useSafeAreaInsets();
    console.log(insets);
  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={{ flex: 1, height: Dimensions.get('screen').height, borderColor: 'blue', borderWidth: 1 }}>
    <Text style={{ flex: 1, borderColor: 'red', borderWidth: 5 }}>Hi</Text>
    <StatusBar hidden translucent={true}></StatusBar>
  </SafeAreaView>
  )
}
