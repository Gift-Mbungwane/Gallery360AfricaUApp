import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
// import { View } from 'react-native-web'

export default function TabBarComponent({ descriptors, state, navigation }) {
    const [activeIndex, setActiveIndex] = useState(0)
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

        if(state.index !== index) {
            navigation.navigate(targetObject.name)
            setActiveIndex(index)
        } else {
            // console.log('no match');
        }
     
    }
    // console.log(activeIndex);
  return (
    <View style={ styles.container }>
      <View style={styles.view}>
        {
          activeIndex === 0 ? (
            <TouchableOpacity style={ styles.activeTab } onPress={ () => onPress('Market', 0) }>
            <Text style={ styles.activeText }>Market</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity style={ styles.inactiveTab } onPress={ () => onPress('Market', 0) }>
            <Text style={ styles.inactiveText }>Market</Text>
          </TouchableOpacity>
          )
        }
      </View>
      <View style={styles.view}>
        {
          activeIndex === 1 ? (
            <TouchableOpacity style={ styles.activeTab } onPress={ () => onPress('Exhibition', 1) }>
            <Text style={ styles.activeText }>Exhibition</Text>
          </TouchableOpacity>
          ) : (
            <TouchableOpacity style={ styles.inactiveTab } onPress={ () => onPress('Exhibition', 1) }>
            <Text style={ styles.inactiveText }>Exhibition</Text>
          </TouchableOpacity>
          )
        }
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // position: 'relative',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        // flex: 1,
        borderColor:'green',
        borderWidth: 1,
        height: 50,
        width: '100%',
        // top: 60,
        // backgroundColor: '#fff',
        backgroundColor: 'transparent',
        // flexBasis: 0
        
    },
    view: {
      marginLeft: 10,
      marginRight: 10,
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
            borderRadius: 20,
            backgroundColor: '#181818'


    },
    activeText: {
        color: '#FFFFFF',
        fontSize: 21,
        lineHeight: 21
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
            borderRadius: 20,
            backgroundColor: '#FFFFFF'


    },
    inactiveText: {
        color: '#22180E',
        fontSize: 21,
        lineHeight: 21
    }
})
