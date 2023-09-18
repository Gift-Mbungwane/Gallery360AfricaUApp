import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ArtistScrollView = ({ artist, navigation, SLIDER_WIDTH }) => {
    // console.log(artist);
    const styles = StyleSheet.create({
        footer: {
            width: SLIDER_WIDTH - 30,
            justifyContent: "center",
            alignItems: "center",
            // marginVertical: 8,
            paddingLeft: 0,
            marginLeft: 15,
            marginRight: 20,
            marginVertical: 20,
            bottom: 0,
            flexDirection: "row",
            // paddingLeft: 25,
            // paddingRight: 25,
            height: 109,
            // backgroundColor: 'rgba(0, 0, 100, 0.3)',
            overflow: 'hidden',
            
        },
        artistCard: {
            marginLeft: 10,
            marginRight: 10,
            position: 'relative',
            // backgroundColor: 'red'
        },
        artistsView: {
            // paddingHorizontal: 5,
            borderRadius: 20,
            // borderWidth: 0.5,
            // borderColor: "gray",
            // margin: 5,
            overflow: 'hidden',
            justifyContent: "center",
            alignSelf: "center",
            width: 100,
            height: 109,
        },
        artistNameContainer: {
            // backgroundColor: "rgba(0,0,0,0.5)",
            // marginVertical: -10,
            borderRadius: 8,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            height: 20,
            width: "100%",
            bottom: 15,
            paddingHorizontal: 10,
        },
        artistImage: {
            width: "100%",
            height: "100%",
            borderRadius: 10,
            borderColor: "gray",
            // alignSelf: "center",
            // opacity: 0.9
        },
        ArtistName: {
            color: "#fff",
            textAlign: "left",
            fontWeight: '600',
            textShadowColor: '#000',
            textShadowOffset: {
                width: 0.5,
                height: 0.5
            },
            textShadowRadius: 2.5,
            letterSpacing: 0.9
        },
        showAll: {
            borderWidth: 1,
            borderColor: "#f5f5f5",
            borderRadius: 20,
            paddingHorizontal: 5,
            marginHorizontal: 10,
            justifyContent: "center",
            alignSelf: "center",
            width: 100,
            height: 109,
        },
    })
    return (
        <View style={styles.footer}>
            <View style={{ flex: 1, marginHorizontal: -10, overflow: 'hidden' }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    { artist?.map(item => {
                        return (
                            <View
                                style={styles.artistCard}
                                key={item.photoUrl}
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("ArtistProfile", {
                                            description: item.description,
                                            artistUid: item.artistUid,
                                            photoUrl: item.photoUrl,
                                            artistName: item.artistName,
                                            videoUrl: item.videoUrl,
                                        })
                                    }
                                >
                                    <View style={styles.artistsView}>
                                        <Image
                                            source={{ uri: item.photoUrl }}
                                            style={styles.artistImage}
                                        />
                                        <View style={{ width: 100, height: 109, position: 'absolute', bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.3)' }}></View>
                                        <View style={styles.artistNameContainer}>
                                            <Text style={styles.ArtistName}>{item.artistName}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                    <TouchableOpacity onPress={() => navigation.navigate("Artists")}>
                        <View style={styles.showAll}>
                            <Text
                                style={{ color: "gray", textAlign: "center", fontSize: 15 }}
                            >
                                Show {"\n"}All
                            </Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>

        </View>
    )
}

export default ArtistScrollView

