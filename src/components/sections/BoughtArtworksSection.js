import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ArtworkCard from '../cards/ArtworkCard'
import BoughtArtworksThumbnail from '../images/BoughtArtworksThumbnail'
import BoughtArtworksCard from '../cards/BoughtArtworksCard'
import ViewAll from '../text/ViewAll'

const BoughtArtworksSection = ({ artworks }) => {
    const arr = [1, 2, 3, 4, 5]
    console.log({ artworks });
    return (
        <View>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Artworks you bought</Text>
                <ViewAll onPress={() => console.log('View more chosen')}/>
            </View>
            {
                artworks && artworks.length > 0 ? (
                    <FlatList
                        horizontal
                        ItemSeparatorComponent={() => <View style={{width: 20}} />}
                        data={artworks}
                        renderItem={({ item }) => <BoughtArtworksCard uri={item.artUrl} name={item.artName} />}
                        keyExtractor={item => item} // Needs Fixing
                    />
                ) : (
                    <View>
                        <Text>No Art bought</Text>
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
        marginBottom: 20
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