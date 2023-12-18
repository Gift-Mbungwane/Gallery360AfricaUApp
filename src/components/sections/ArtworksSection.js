import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { DropdownInput } from '../inputs'
import ScrollableFilterCard from '../cards/ScrollableFilterCard'
// import { FlatList } from 'react-native-web'
import ArtworkCard from '../cards/ArtworkCard'

const ArtworksSection = ({ artworks, navigateToArtwork, onSortChange, onFilterChange }) => {
    console.log({ artworks });
    console.log({ navigateToArtwork });
    // console.log({ artworksInSection: artworks });
    const arr = [1, 2, 3, 4, 5]
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Artworks</Text>
                <DropdownInput onChange={onSortChange}/>
            </View>
            <ScrollableFilterCard padding={10} onFilterChange={onFilterChange}/>
            {
                artworks && artworks.length > 0 ? (
                    <FlatList
                        scrollEnabled
                        data={artworks}
                        renderItem={({ item }) => <ArtworkCard artDetails={item} navigateToArtwork={navigateToArtwork} />}
                        keyExtractor={item => item.ImageUid}
                    />
                ) : (
                    <View style={styles.noArtworksTextCont}>
                        <Text style={styles.noArtworksText}>No artworks</Text>
                    </View>
                )
            }

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
        // borderColor: 'black',
        // borderWidth: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 34,
        lineHeight: 34,
        // backgroundColor: 'red'
    },
    noArtworksTextCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noArtworksText: {
        fontSize: 24,
        fontWeight: '600'
    }
})


// artWorks section on home landing page