import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Image } from 'react-native-elements'

const LoaderImage = ({ uri, style, mode = null, indicatorPadding = 0 }) => {
    // console.log(uri);
    return (
        <Image
            source={{ uri }}
            placeholderStyle={{ backgroundColor: 'rgb(200, 200, 200)' }}
            PlaceholderContent={
                <View style={[styles.indicatorContainer, { paddingBottom: indicatorPadding }] }>
                    <ActivityIndicator size="large" color={"#000"} />
                </View>}
            containerStyle={style}
            style={style}
            resizeMode={mode}
        />
    )
}
const styles = StyleSheet.create({
    indicatorContainer: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(180, 180, 180)'
    }
})
export default LoaderImage
