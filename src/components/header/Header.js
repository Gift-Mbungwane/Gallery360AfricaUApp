import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = ({ children }) => {
    const insets = useSafeAreaInsets()
    console.log({ childrenInHeader: children });
  return (
    <View style={[styles.container, { top: insets.top}]}>
      { children }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        // backgroundColor: 'green',
        width: Dimensions.get('window').width,
        height: 100,
        alignItems: 'center'
        // height:
    }
})