import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { DropdownInput } from '../inputs'
import ScrollableFilterCard from '../cards/ScrollableFilterCard'
// import { FlatList } from 'react-native-web'
import ArtworkCard from '../cards/ArtworkCard'

const ArtworksSection = ({ artworks, navigateToArtwork }) => {
    console.log({ artworksInSection: artworks });
    const arr = [1, 2, 3, 4, 5]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Artworks</Text>
                <DropdownInput />
            </View>
            <ScrollableFilterCard padding={10} />
            <FlatList
                scrollEnabled
                data={artworks}
                renderItem={({ item }) => <ArtworkCard artDetails={item} navigateToArtwork={navigateToArtwork}/>}
                keyExtractor={item => item.ImageUid}
            />
        </View>
    )
}

export default ArtworksSection

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'blue',
        width: '100%',
        flex: 1,
        padding: 10,
        // overflow: 'visible',
        borderColor: 'black',
        borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 34,
        lineHeight: 34,
        // backgroundColor: 'red'
    }
})


// artWorks section on home landing page