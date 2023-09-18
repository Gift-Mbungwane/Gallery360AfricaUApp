import { Dimensions, ImageBackground, Platform, StatusBar, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabBarComponent from "./TabBarComponent";
import MarketScreen from "../../screens/MarketScreen";
import ExhibitionScreen from "../../screens/ExhibitionScreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const background = require("../../assets/images/home.png");
const TabNavigator = () => {

    // return(
    //     <View style={styles.container}>

    //     </View>
    // )
    return (
        <ImageBackground source={background} style={styles.container}>
          
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
        paddingTop: 0, //paddingTop,
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