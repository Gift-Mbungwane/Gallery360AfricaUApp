import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { firestore } from "../../Firebase";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function SearchScreen({ route, navigation }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firestore
      .collection("artists")
      .where("artistName", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View style={styles.parentContainer}>
      <View style={styles.searchBarContainer}>
        <Ionicons
          style={{ left: 55, top: 10 }}
          name="search"
          size={25}
          color={"black"}
        />

        <TextInput
          onChangeText={(search) => fetchUsers(search)}
          placeholder="Search"
          style={styles.searchInput}
        />

        <TouchableOpacity>
          <Text style={styles.searchBtnText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchTitleTextContainer}>
        <Text style={styles.recentSearchText}>Recent Search</Text>
        <TouchableOpacity>
          <Text style={styles.clearAllBtnText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <SafeAreaView>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ArtistProfile", {
                    artistUid: item.artistUid,
                    artistPhoto: item.artistPhoto,
                    artistName: item.artistName,
                    artistDescription: item.artistDescription,
                  })
                }
                style={styles.listItems}
              >
                <Image
                  source={{ uri: item.artistPhoto }}
                  style={styles.artistImg}
                />
                <Text style={{ color: "black", fontSize: 17 }}>
                  {item.artistName}
                </Text>
              </TouchableOpacity>
            );
          }}
          style={{ paddingTop: 55 }}
        />
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  iconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "lightgray",
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  artistImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  listItems: {
    flexDirection: "row",
    margin: 13,
    alignItems: "center",
    width: "47%",
    justifyContent: "space-between",
  },
  searchInput: {
    width: "70%",
    height: 50,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 7,
    paddingHorizontal: 50,
    color: "black",
    backgroundColor: "#fff",
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: 70,
  },
  searchBtnText: {
    color: "#FF5353",
    top: 10,
    fontSize: 15,
  },
  recentSearchText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  clearAllBtnText: {
    color: "black",
    fontSize: 14,
    top: 2,
  },
  searchTitleTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    top: 100,
    width: "86%",
  },
});
