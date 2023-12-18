import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ImageBackground, Dimensions, StyleSheet, Platform
} from "react-native";
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { globalStyles } from "../assets/styles/GlobalStyles";
import MasonryList from "@react-native-seoul/masonry-list";
import { firestore } from "../../Firebase";

import image from "../assets/images/home.png";
import LoaderImage from "../assets/components/LoaderImage";
import TransparentHeaderView from "../components/TransparentHeaderView";
import { FlatList } from "react-native";
import { ArtworkCard } from "../components";

function FurnitureCard({ item }) {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  return (
    <View key={item.id} style={{ marginTop: 12, flex: 1 }}>
      <Image
        source={{ uri: `${item.artUrl}` }}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: "stretch",
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          marginTop: 8,
        }}
      >
        {item.artName}
      </Text>
    </View>
  );
}

export default function PreviewMoreScreen({ route, navigation }) {
  const isDarkMode = useColorScheme() === "dark";

  const { artistUID } = route.params;
  const [artwork, setArtwork] = useState([]);
  const viewHeight = Dimensions.get('window').height - 60;
  const viewWidth = Dimensions.get('window').width;
  // console.log(viewHeight);
  // console.log(artwork);
  const backgroundStyle = {
    // flex: 1,
    width: "100%",
  };
  const getArtWork = async () => {
    console.log({ artistUid: route.params.artistUid });
    let query;
    const artistUid = route.params?.artistUid ?? null
    query = artistUid
      ? firestore.collection('Market').where('artistUid', '==', artistUid.trim())
      : firestore.collection('Market')
    query.where('isEnabled', '==', true).onSnapshot(async snapshot => {
      if (!snapshot.empty) {
        const art = await Promise.all(snapshot.docs.map(async (item) => {
          return {
            ...item.data(),
            artUrl: item.data().imgUrls[0].imgUrl,
            ImageUid: item.id,
            artistUid: item.data().userid ?? item.data().artistUid,
            artName: item.data().title,
            ...(await getArtistDetails(item.data().userid ?? item.data().artistUid))
          }
        }))
        console.log({ art });
        setArtwork(art)
      } else {
        console.log('no art is enabled');
      }
    })
  }
  const getArtistDetails = async (artistId) => {
    console.log({ artistId });
    return firestore.collection('Artists').doc(artistId.trim()).get().then(doc => {
      const { artistName, photoUrl } = doc.data()
      console.log('some artist details', { artistName, photoUrl });
      return { artistName, photoUrl }
    })
  }
  const navigateToArtwork = async (item) => {
    // const artistUid = item.artistUid
    // console.log({ item });
    const { artistUid, artistName, photoUrl, imageUID } = item
    console.log({ artistUid, artistName, photoUrl, imageUID });
    navigation.navigate('ArtPreview', {
      artistUid, imageUID, photoUrl, artistName
    })
  }
  // const artwork = useMemo(async () => await getArtWork())
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getArtWork()
    }
    return () => isMounted = false
  }, [])
  useEffect(() => {
    console.log({ artwork });
  }, [artwork])
  const renderItem = ({ item, index }) => {
    // const randomBool = useMemo(() => Math.random() < 0.5, []);
    const random = Math.random() * 10
    const height = random < 4 ?
      200 : random >= 4 && random < 8 ?
        240 : 280;
    // console.log(random);
    return (
      <View key={item.ImageUid}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ArtPreview", {
              artistUid: item.ArtistUid,
              imageUID: item.ImageUid,
            })
          }
        >
          <LoaderImage
            uri={item.artUrl}
            style={{
              height: height,
              alignSelf: "stretch",
              borderRadius: 20,
              margin: 10,
              marginBottom: 0,
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 5,
            alignSelf: "center",
            margin: 10,
            marginTop: 5

          }}
        >
          {item.artName}
        </Text>
      </View>
    );
  };

  return (
    <TransparentHeaderView style={{ paddingHorizontal: 10 }}>
      {
        artwork && artwork.length > 0 ? (
          <FlatList
            scrollEnabled
            data={artwork}
            renderItem={({ item }) => <ArtworkCard artDetails={item} navigateToArtwork={navigateToArtwork} />}
            keyExtractor={item => item.ImageUid}
          />
        ) : (
          <View style={styles.noArtworksTextCont}>
            <Text style={styles.noArtworksText}>No artworks</Text>
          </View>
        )
      }
    </TransparentHeaderView>

  );
}
const statusBarHeight = StatusBar.currentHeight;
// console.log('padding: ', Platform.OS);
const paddingOnTop = (Platform.OS === 'android' || Platform.OS === 'web') ? 60 : 0
// console.log('bar height: ', statusBarHeight);
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
