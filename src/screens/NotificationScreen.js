import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";
import { auth, firestore } from "../../Firebase";
import background from '../assets/images/home.png'

export default function NotificationScreen({ navigation, route }) {
  // const [data, setData] = useState([
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   },
  //   {
  //     id: 'asdfasdf',
  //     status: 'success',
  //     date: '02/11/2022',
  //     details: 'adsfsdfsdf asdf safsd f sdaf sd f f dfs afa a afsd  sa fs s   fds '
  //   }
  // ])
  const [data, setData] = useState([])
  const { uuid } = route.params
  const [uid, setUID] = useState(uuid);

  const renderItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.itemContainer}>
        <View style={styles.card}>
          <View style={styles.topView}>
            <View style={ styles.topLeftView }>
              <View style={ styles.circle }></View>
              <Text style={styles.statusText}>{item.status === 'APPROVED' ? 'Success' : 'Failed' }</Text>
            </View>
            
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <View>
            <Text style={styles.details}>
              {item.details}
            </Text>

          </View>
        </View>
      </View>

    )
  }
  useEffect( () => {
    firestore.collection('payemnt').where('uuid', '==', uuid).get().then( res => {
      if(res.docs) {
        const notifications = res.docs.map( doc => {
          return { ...doc.data(), id: doc.id }
        })
        console.log(notifications);
        setData(notifications)
      }
    })
  }, [])
  return (
    <ImageBackground source={background} style={ styles.container }>
          <SafeAreaView style={ styles.safe }>

            {
              data.length > 0 ? (
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
        
              />
              ) : (
                <View style={ styles.itemContainer }>
                  <View style={ styles.card }>
                    <Text style={ styles.statusText }>No payments made</Text>
                    <Text style={ styles.details }>Buy artwork to see payments listed here</Text>
                  </View>
                </View>
              )
            }

    </SafeAreaView>
    </ImageBackground>

  )
}

const image = require("../assets/images/home.png");

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0
const paddingTop = Platform.OS === 'android' || Platform.OS === 'web' ? 60 + statusBarHeight: 0
const navBarHeight = Dimensions.get('screen').height - Dimensions.get('window').height - StatusBar.currentHeight;
    console.log({ paddingTop });
const styles = StyleSheet.create({
  container: {
    // top: -20,
    height: Dimensions.get('screen').height,
    // top: -2000,
    width: "100%", 
    paddingTop: paddingTop,
    paddingBottom: Platform.OS === 'android' ? navBarHeight : 0,
    // borderWidth: 1,
    // borderColor: 'red',
    // backgroundColor: 'blue',
    zIndex: 1
},
safe: {},
  itemContainer: {
    flexDirection: 'row',
    // marginVertical: -10,
    // borderWidth: 1,
    // borderColor: 'red',
    // alignContent: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '80%',
    minHeight: 100,
    color: 'white',
    backgroundColor: '#E3E3E3',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10
  },
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center'
  },
  topLeftView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center'
  },
  circle: {
    borderRadius: 50,
    backgroundColor: "#C4C4C4",
    height: 20,
    width: 20,
    marginRight: 10
  },
  statusText: {
    color: '#22180E',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
    lineHeight: 20
  },
  date: {
    color: '#616161',
    lineHeight: 20
  },
  details: {
    color: "#616161"
  },
  bottomView: {

  }
});
