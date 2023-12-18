import { Dimensions, ImageBackground, Platform, StatusBar, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarComponent from "./TabBarComponent";
import MarketScreen from "../../screens/MarketScreen";
import ExhibitionScreen from "../../screens/ExhibitionScreen";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from '@react-navigation/elements';
import { useEffect } from "react";
import { Text } from "react-native";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const background = require("../../assets/images/home.png");
const TabNavigator = () => {
    const insets = useSafeAreaInsets()
    const headerHeight = useHeaderHeight()
    // console.log({ insets, headerHeight });

    // return(
    //     <View style={styles.container}>

    //     </View>
    // )
    useEffect(() => {
        console.log('on tab navigator');
    }, [])

    return (
        <ImageBackground source={background} style={[styles.container, { paddingTop: insets.top + headerHeight }]}>
            <Tab.Navigator screenOptions={{ swipeEnabled: false }} tabBar={props => <TabBarComponent {...props} />}>
                <Tab.Screen
                    name="Market"
                    component={MarketScreen}
                />
                <Tab.Screen
                    name="Exhibition"
                    component={ExhibitionScreen}
                />
            </Tab.Navigator>
        </ImageBackground>
    );
};

export default TabNavigator;
// console.log(Platform);
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 : 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;
// console.log(navBarHeight);
const styles = StyleSheet.create({
    container: {
        top: 0,
        height: Dimensions.get('screen').height,
        // top: -2000,
        width: "100%",
        // paddingTop: paddingTop, //paddingTop,
        // paddingBottom: Platform.OS === 'android' ? navBarHeight : 0,
        // paddingTop: 60,
        // borderWidth: 1,
        // borderColor: 'blue',
        // backgroundColor: 'blue',
        // marginBottom: 30,
        zIndex: 1
    },
    containers: {
        // top: -20,
        height: Dimensions.get('screen').height,
        width: "100%",
        paddingTop: paddingTop,
        paddingBottom: Platform.OS === 'android' ? navBarHeight : 0,
        // borderWidth: 1,
        // borderColor: 'red'
    }
})