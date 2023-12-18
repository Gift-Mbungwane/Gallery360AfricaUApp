import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DropdownInput } from '../inputs'
import HeroCard from '../cards/HeroCard'

const CreatorsSection = ({ artists, navigation, onSortChange }) => {
  // console.log({ artists });
  const artist = [1, 2, 3, 4, 5, 6, 7]
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Creators</Text>
        <DropdownInput onChange={onSortChange} />
      </View>
      <ScrollView
        contentContainerStyle={styles.artists}
        style={{zIndex: 1}}
        scrollEnabled
        horizontal
      >
        {
          artists.map(item => (
            <HeroCard key={item.artistUid} name={item.artistName} pic={item.photoUrl} uid={ item.artistUid } onPress={(artistUid) => navigation.navigate('ArtistProfile', { ...item })} />
          ))
        }
      </ScrollView>
    </View>
  )
}

export default CreatorsSection

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'blue',
    width: '100%',
    padding: 10
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
    zIndex: 100
  },
  header: {
    fontSize: 20,
    fontWeight: '300'
  },
  artists: {
    // flexDirection: 'row',
    gap: 10,
    zIndex:1
  }
})