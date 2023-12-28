import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { ActivityIndicator } from 'react-native'
import { useState } from 'react'

const ExhibitionCard = ({ item, navigation }) => {
    const [showLoader, setShowLoader] = useState(true)
    return (
        <TouchableOpacity style={styles.container} onPress={() => (
            navigation.navigate("ExhibitionDetails", {
                ...item,
                exhibitionUid: item.exhibitionUid,
                artistUid: item.artistUid || item.userid,
                exhibitionTitle: item.exhibitionTitle || item.name,
                date: item.date,
                exhibitionImage: item.imgUrl,
                addresses: item.address,
                description: item.description || item.desc,
            })
        )}>
            <View style={{}}>
                <ImageBackground
                    source={{ uri: item.imgUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    onLoad={() => setShowLoader(false)}
                >
                    {
                        showLoader && <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={'black'} />
                        </View>
                    }
                    <View style={styles.floatingArtDetail}>
                        <BlurView intensity={80} style={styles.blurView}>
                            <Text style={styles.artNameTxt} numberOfLines={1}>{item.exhibitionTitle ? (item.exhibitionTitle).trim() : (item.name).trim()}</Text>
                            <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                <Text style={styles.artTypeTxt}>{item.date.fromDate.date} {item.date.fromDate.month}</Text>
                                <Text style={[styles.artTypeTxt, { width: 200 }]} numberOfLines={1}>{item.address}</Text>
                            </View>
                        </BlurView>

                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

export default ExhibitionCard

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    floatingArtDetail: {
        height: 80,
        position: "absolute",
        borderRadius: 16,
        bottom: 8,
        left: 8,
        right: 8,
        justifyContent: "center",
        overflow: 'hidden',
    },
    blurView: {
        height: 80,
        justifyContent: "center",
        backgroundColor: 'rgba(206, 184, 158, 0.5)',
        // borderColor: 'red',
        // borderWidth: 1,
        paddingVertical: 10,
        // gap: 200
        justifyContent: 'space-between'
    },
    artNameTxt: {
        fontSize: 28,
        color: "#FFF",
        paddingHorizontal: 15,
        fontWeight: '500'
        // paddingRight: 60
    },
    artTypeTxt: {
        color: "#FFF",
        fontSize: 14,
        paddingHorizontal: 15,
        bottom: 3,
    },
    loaderContainer: {
        position: "absolute",
        width: '100%',
        height: '100%',
        borderRadius: 20,
        backgroundColor: 'rgb(180, 180, 180)',
        justifyContent: 'center',
        alignItems: 'center'
    }
})