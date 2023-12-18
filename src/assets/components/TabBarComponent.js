import { useHeaderHeight } from '@react-navigation/elements';
import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
// import { View } from 'react-native-web'
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabBarComponent({ descriptors, state, navigation }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const insets = useSafeAreaInsets()
  const headerHeight = useHeaderHeight()
  // console.log({ insets });
  // const activeIndex = 0
  // console.log('props: ', { descriptors, state, navigation });
  const onPress = (path, index) => {
    const targetObject = state.routes.find(route => {
      // console.log('route: ', route);
      return route.name === path
    })
    // console.log('target: ', targetObject.key);
    navigation.emit({
      type: 'tabPress',
      target: targetObject.key
    })

    if (state.index !== index) {
      navigation.navigate(targetObject.name)
      setActiveIndex(index)
    } else {
      // console.log('no match');
    }

  }
  // console.log(activeIndex);
  return (
    <View style={[styles.container]}>
      <View style={styles.tabs}>
        <TouchableOpacity elevation={5} style={[activeIndex === 0 ? styles.activeTab : styles.inactiveTab, styles.marketTab]} onPress={() => onPress('Market', 0)}>
          <Text style={activeIndex === 0 ? styles.activeText : styles.inactiveText}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity elevation={5} style={[activeIndex === 1 ? styles.activeTab : styles.inactiveTab, styles.exhibitionTab]} onPress={() => onPress('Exhibition', 1)}>
          <Text style={activeIndex === 1 ? styles.activeText : styles.inactiveText}>Exhibition</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // borderColor:'green',
    // borderWidth: 1,
    marginTop: 0,
    paddingVertical: 10,
    // height: 0,
    // paddingTop: 40,
    // backgroundColor: 'red',
    // backgroundColor: 'transparent',
    // flexBasis: 0,
    // overflow: 'hidden'

  },
  tabs: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    // flex: 1,
    // borderColor:'green',
    // borderWidth: 1,
    height: 42,
    width: '100%',
    // top: 40,
    // paddingTop: 40,
    // backgroundColor: 'red',
    // backgroundColor: 'transparent',
    // flexBasis: 0,
    // overflow: 'hidden'
  },
  marketTab: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  exhibitionTab: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  view: {
    // marginLeft: 10,
    // marginRight: 10,
    backgroundColor: 'red',
    // overflow: 'hidden',
    // width: ,
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1
  },
  activeTab: {

    color: 'red',
    flex: 1,
    width: '100%',
    // borderColor:'black',
    // borderWidth: 1,
    // marginRight: 10,
    // marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 20,
    backgroundColor: '#181818',
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 0.15,
    shadowOffset: { height: 2, width: 0 },
    elevation: 4


  },
  activeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500'
    // lineHeight: 21
  },
  inactiveTab: {
    color: 'white',
    flex: 1,
    width: '100%',
    // borderColor:'black',
    // borderWidth: 1,
    // marginRight: 10,
    // marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowOffset: { height: 2, width: 0 },
    elevation: 4

  },
  inactiveText: {
    color: '#22180E',
    fontSize: 15,
    fontWeight: '500'

    // lineHeight: 21
  }
})
