import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import {
  setSearchResults,
  setSearchType,
} from "../store/reducers/slice/searchResultsSlice";

const API_KEY = "f00232dfb1ce381afc3c65971e0fd1aa";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width / 2 - 20; // Subtract margins

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const { results, searchType } = useSelector((state) => state.media);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/${searchType}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
              query: searchQuery,
            },
          }
        );
        dispatch(setSearchResults(response.data.results));
      } catch (error) {
        console.error(`Error fetching ${searchType} results:`, error);
      }
    };

    if (searchQuery.trim() !== "") {
      fetchSearchResults();
    } else {
      dispatch(setSearchResults([])); // Clear search results if the search query is empty
    }
  }, [searchQuery, searchType]);

  const renderMediaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.mediaTile}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.mediaPoster}
        resizeMode="cover"
      />
      <Text style={styles.mediaTitle}>{item.title || item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, searchType === "tv" && styles.activeTab]}
            onPress={() => dispatch(setSearchType("tv"))}
          >
            <Text
              style={[
                styles.tabButtonText,
                searchType === "tv" && styles.activeTabText,
              ]}
            >
              TV Shows
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              searchType === "movie" && styles.activeTab,
            ]}
            onPress={() => dispatch(setSearchType("movie"))}
          >
            <Text
              style={[
                styles.tabButtonText,
                searchType === "movie" && styles.activeTabText,
              ]}
            >
              Movies
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderMediaItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  activeTabText: {
    color: "#fff",
  },
  mediaTile: {
    width: ITEM_WIDTH,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginRight: 10,
  },
  mediaPoster: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  mediaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HomeScreen;
