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
  const getArtWork = async() => {

    // const docs = await firestore.collection('Market').orderBy('artName').get();
    // docs.forEach(item => {
    //   console.log(item.data())
    // });
    // const art = docs.map(item => item.data())
    // return art

    // console.log(artistUID);
    let query;
    query = artistUID
      ? firestore.collection('Market').where('ArtistUid', '==', artistUID).orderBy('timeStamp', 'desc')
      : firestore.collection('Market').orderBy('timeStamp', 'desc')
    //   console.log(query);
    // let query;
    // query = 1 + 1 === 2 ? firestore.collection('Market').orderBy('timeStamp', 'desc') : null
    query.where('isEnabled', '==', true).onSnapshot(snapshot => {
      if(!snapshot.empty) {
        const art = snapshot.docs.map( item => item.data());
        setArtwork(art)
      }
    })
  }
  // const artwork = useMemo(async () => await getArtWork())
  useEffect( () => {
    let isMounted = true
    if(isMounted) {
      getArtWork()
    }
   return () => isMounted = false
  }, [])
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
            uri={ item.artUrl }
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

      <ImageBackground
        source={image}
        resizeMode="stretch"
        style={styles.container}
      >

        <SafeAreaView style={{ height: viewHeight, width: viewWidth }}>
        <MasonryList
          style={{ marginTop: 0 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.ImageUid}
          ListHeaderComponent={<View />}
          contentContainerStyle={{
            paddingHorizontal: 24,
            alignSelf: "stretch",
          }}
          numColumns={2}
          data={artwork}
          renderItem={renderItem}
        />
        </SafeAreaView>

      </ImageBackground>

  );
}
const statusBarHeight = StatusBar.currentHeight;
// console.log('padding: ', Platform.OS);
const paddingOnTop = (Platform.OS === 'android' || Platform.OS === 'web') ? 60 : 0
// console.log('bar height: ', statusBarHeight);
const styles =StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: "100%",
    paddingTop: 60,
    paddingTop: paddingOnTop
    // backgroundColor: "red",
    // paddingBottom: 10
  },
  areaView: {
    height: Dimensions.get('window').height,
    flex: 1,
    
  }
})
