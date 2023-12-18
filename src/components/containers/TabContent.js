import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const TabContent = ({ children }) => {
    const insets = useSafeAreaInsets()
  return (
    <View style={{ flex: 1, paddingBottom: insets.top + 12 }}>
      <View style={{ flex: 1 }}>
        { children }
      </View>
    </View>
  )
}

export default TabContent

const styles = StyleSheet.create({})