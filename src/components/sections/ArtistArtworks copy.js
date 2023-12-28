import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ScrollableFilterCard from '../cards/ScrollableFilterCard'
import ArtistArtworksCard from '../cards/ArtistArtworksCard'

const ArtistArtworks = ({ navigation, artworks, onPress, artistName, artistPic, onFilterChange }) => {
 
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    useEffect(() => {
        console.log({ artworksInAA: artworks });
        if(artworks) {
            // const img  = artworks[0].name
            // console.log({ img });
            // console.log({ artistName });
        }
    }, [artworks])
    useEffect( () => {
        
    }, [])
    return (
        <View>
            <View>
                <Text style={styles.headerText}>Works by</Text>
                <Text style={styles.headerText}>{artistName}</Text>
            </View>
            <ScrollableFilterCard padding={13} onFilterChange={onFilterChange}/>
            {
                artworks && artworks.length > 0 ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                        {
                            artworks.map(item => {
                               return <ArtistArtworksCard
                                imageUID={item.imageUid}
                                onPress={() => onPress(item.imageUid)}
                                showPrice={false}
                                artistName={artistName}
                                artName={item.artName || item.title}
                                artUri={item.artUrl || item.imgUrls[0].imgUrl}
                                artistPic={artistPic} price={item.price} />
                            })
                        }
                    </View>
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
        // backgroundColor: 'blue',
        alignItems: 'center'
    }
})