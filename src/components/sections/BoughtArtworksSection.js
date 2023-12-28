import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ArtworkCard from '../cards/ArtworkCard'
import BoughtArtworksThumbnail from '../images/BoughtArtworksThumbnail'
import BoughtArtworksCard from '../cards/BoughtArtworksCard'
import ViewAll from '../text/ViewAll'

const BoughtArtworksSection = ({ artworks, onNavigate }) => {
    const arr = [1, 2, 3, 4, 5]
    // console.log({ artworksInBought: artworks });
    if(artworks) {
        // console.log({ url: artworks[0]?.artUrl });
    }

    // return null
    return (
        <View style={{ }}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Artworks you bought</Text>
                <ViewAll onPress={() => console.log('View more chosen')}/>
            </View>
            {
                artworks && artworks.length > 0 && (
                    <FlatList
                        horizontal
                        style={{ paddingTop: 20 }}
                        ItemSeparatorComponent={() => <View style={{width: 20}} />}
                        data={artworks}
                        renderItem={({ item }) => <BoughtArtworksCard uri={item.artUrl} name={item.artName} onPress={() => onNavigate((item.imageUid).trim())}/>}
                        keyExtractor={(item, index) => {
                            // console.log({ itemInExtractor: item });
                            return item.imageUid
                            return item.imageUid
                        }} // Needs Fixing
                    />
                )
            }
            {
                !artworks || artworks.length === 0 && (
                    <View style={{ height: 70, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: '500'}}>No Art bought</Text>
                    </View>
                )
            }
        </View>
    )
}

export default BoughtArtworksSection

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // marginBottom: 20
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500'
    },
    viewAllText: {
        color: '#CEB89E',
        textTransform: 'uppercase'
    }
})