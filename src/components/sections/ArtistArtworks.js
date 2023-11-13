import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScrollableFilterCard from '../cards/ScrollableFilterCard'
import ArtistArtworksCard from '../cards/ArtistArtworksCard'

const ArtistArtworks = ({ navigation, artworks, onPress, artistName, artistPic }) => {
    console.log({ artworks });
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <View>
            <View>
                <Text style={styles.headerText}>Works by</Text>
                <Text style={styles.headerText}>{artistName}</Text>
            </View>
            <ScrollableFilterCard padding={13} />
            {
                artworks && artworks.length > 0 ? (
                    <FlatList
                        // horizontal
                        style={{ padding: 10, backgroundColor: 'red', gap: 10, overflow: 'scroll' }}
                        numColumns={2}
                        scrollEnabled
                        columnWrapperStyle={styles.columnWrapper}
                        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
                        data={artworks}
                        renderItem={({ item }) => <ArtistArtworksCard imageUID={item.ImageUid} onPress={onPress} showPrice={false} artistName={artistName} artName={item.artName} artUri={item.artUrl} artistPic={artistPic} price={item.price} />}
                        keyExtractor={item => item}
                    />
                ) : (
                    <View style={{ marginTop: 120, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 15, fontWeight: '500' }}>No artwork uploaded</Text>
                    </View>
                )
            }

        </View>
    )
}

export default ArtistArtworks

const styles = StyleSheet.create({
    headerText: {
        color: '#000000',
        fontSize: 34,
        fontWeight: '500'
    },
    columnWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: 'blue',
        alignItems: 'center'
    }
})